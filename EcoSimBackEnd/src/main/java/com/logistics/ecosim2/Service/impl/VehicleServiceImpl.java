package com.logistics.ecosim2.Service.impl;

import com.logistics.ecosim2.dtos.VehicleDTO;
import com.logistics.ecosim2.dtos.VehicleSearchCriteria;
import com.logistics.ecosim2.entity.User;
import com.logistics.ecosim2.entity.Vehicle;
import com.logistics.ecosim2.exception.ResourceNotFoundException;
import com.logistics.ecosim2.mapper.VehicleMapper;
import com.logistics.ecosim2.repository.UserRepository;
import com.logistics.ecosim2.repository.VehicleRepository;
import com.logistics.ecosim2.Service.VehicleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import com.logistics.ecosim2.Service.impl.VehicleAiService;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.criteria.Predicate;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private VehicleMapper vehicleMapper;
    @Autowired
    private VehicleAiService vehicleAiService;
    @Override
    public List<VehicleDTO> getAllVehicles() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        return vehicleRepository.findByOwnerUsername(username)
                .stream()
                .map(vehicleMapper::toDTO)
                .collect(Collectors.toList());
    }


    public VehicleDTO createManualVehicle(VehicleDTO dto) {
        Vehicle vehicle = vehicleMapper.toEntity(dto);
        vehicle.setId(null);
        return saveWithCurrentOwner(vehicle);
    }



    public VehicleDTO createAiVehicle(VehicleDTO dto) {

        Vehicle vehicle = vehicleRepository.findByBrandAndModelAndYear(dto.getBrand(), dto.getModel(), dto.getYear())
                .orElseGet(() -> {

                    VehicleDTO aiSpecs = vehicleAiService.fetchFromAi(dto.getBrand(), dto.getModel(), dto.getYear());
                    Vehicle entity = vehicleMapper.toEntity(aiSpecs);
                    entity.setId(null);
                    entity.setOwner(null);
                    return vehicleRepository.saveAndFlush(entity);
                });

        return saveWithCurrentOwner(vehicle);
    }


    private VehicleDTO saveWithCurrentOwner(Vehicle vehicle) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        vehicle.setOwner(user);
        return vehicleMapper.toDTO(vehicleRepository.save(vehicle));
    }

    @Override
    public VehicleDTO getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + id));
        return vehicleMapper.toDTO(vehicle);
    }


    private Vehicle createGlobalVehicleViaAi(String brand, String model, int year) {

        VehicleDTO aiSpecs = vehicleAiService.fetchFromAi(brand, model, year);


        Vehicle newVehicle = vehicleMapper.toEntity(aiSpecs);
        newVehicle.setId(null);


        return vehicleRepository.saveAndFlush(newVehicle);
    }

    @Override
    @Transactional
    public VehicleDTO createVehicle(VehicleDTO vehicleDTO) {

        Vehicle vehicle = vehicleRepository.findByBrandAndModelAndYear(
                vehicleDTO.getBrand(),
                vehicleDTO.getModel(),
                vehicleDTO.getYear()
        ).orElseGet(() -> createGlobalVehicleViaAi(
                vehicleDTO.getBrand(),
                vehicleDTO.getModel(),
                vehicleDTO.getYear()
        ));


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User owner = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        vehicle.setOwner(owner);

        return vehicleMapper.toDTO(vehicleRepository.save(vehicle));
    }
    @Override
    public VehicleDTO updateVehicle(Long id, VehicleDTO vehicleDTO) {
        Vehicle existingVehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + id));

        existingVehicle.setBrand(vehicleDTO.getBrand());
        existingVehicle.setModel(vehicleDTO.getModel());
        existingVehicle.setYear(vehicleDTO.getYear());
        existingVehicle.setEngineType(vehicleDTO.getEngineType());
        existingVehicle.setOfficialEfficiency(vehicleDTO.getOfficialEfficiency());
        existingVehicle.setTankCapacity(vehicleDTO.getTankCapacity());

        Vehicle updatedVehicle = vehicleRepository.save(existingVehicle);
        return vehicleMapper.toDTO(updatedVehicle);
    }

    @Override
    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete. Vehicle not found with id: " + id);
        }
        vehicleRepository.deleteById(id);
    }
    @Override
    public Page<VehicleDTO> searchVehicles(VehicleSearchCriteria criteria) {

        int pageNumber = Math.max(criteria.getPage(), 0);
        int pageSize = criteria.getSize() <= 0 ? 10 : criteria.getSize();
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Specification<Vehicle> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();


            List<Predicate> textPredicates = new ArrayList<>();


            if (criteria.getBrand() != null && !criteria.getBrand().isEmpty()) {
                String brandSearch = criteria.getBrand().toLowerCase() + "%";
                textPredicates.add(cb.like(cb.lower(root.get("brand")), brandSearch));
            }

            if (criteria.getModel() != null && !criteria.getModel().isEmpty()) {
                String modelSearch = criteria.getModel().toLowerCase() + "%";
                textPredicates.add(cb.like(cb.lower(root.get("model")), modelSearch));
            }


            if (!textPredicates.isEmpty()) {
                predicates.add(cb.or(textPredicates.toArray(new Predicate[0])));
            }


            if (criteria.getEngineType() != null) {
                predicates.add(cb.equal(root.get("engineType"), criteria.getEngineType()));
            }


            return cb.and(predicates.toArray(new Predicate[0]));
        };


        return vehicleRepository.findAll(spec, pageable)
                .map(vehicle -> vehicleMapper.toDTO(vehicle));
    }

    @Override
    public long getVehicleCount() {
        return vehicleRepository.count();
    }
}