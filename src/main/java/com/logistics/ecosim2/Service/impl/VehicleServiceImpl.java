package com.logistics.ecosim2.service.impl;

import com.logistics.ecosim2.dtos.VehicleDTO;
import com.logistics.ecosim2.entity.Vehicle;
import com.logistics.ecosim2.mapper.VehicleMapper;
import com.logistics.ecosim2.repository.VehicleRepository;
import com.logistics.ecosim2.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleMapper vehicleMapper;

    @Override
    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll()
                .stream()
                .map(vehicleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VehicleDTO getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
        return vehicleMapper.toDTO(vehicle);
    }

    @Override
    public VehicleDTO createVehicle(VehicleDTO vehicleDTO) {
        Vehicle vehicle = vehicleMapper.toEntity(vehicleDTO);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return vehicleMapper.toDTO(savedVehicle);
    }

    @Override
    public VehicleDTO updateVehicle(Long id, VehicleDTO vehicleDTO) {
        Vehicle existingVehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));

        // Update fields
        existingVehicle.setBrand(vehicleDTO.getBrand());
        existingVehicle.setModel(vehicleDTO.getModel());
        existingVehicle.setWeightKg(vehicleDTO.getWeightKg());
        existingVehicle.setDragCoefficient(vehicleDTO.getDragCoefficient());
        existingVehicle.setFrontalAreaSqM(vehicleDTO.getFrontalAreaSqM());
        existingVehicle.setFuelType(vehicleDTO.getFuelType());

        Vehicle updatedVehicle = vehicleRepository.save(existingVehicle);
        return vehicleMapper.toDTO(updatedVehicle);
    }

    @Override
    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete. Vehicle not found with id: " + id);
        }
        vehicleRepository.deleteById(id);
    }
}