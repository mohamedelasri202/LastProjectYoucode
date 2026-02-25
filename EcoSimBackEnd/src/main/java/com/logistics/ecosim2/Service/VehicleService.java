package com.logistics.ecosim2.Service;

import com.logistics.ecosim2.dtos.VehicleDTO;
import com.logistics.ecosim2.dtos.VehicleSearchCriteria;
import org.springframework.data.domain.Page;

import java.util.List;

public interface VehicleService {
    List<VehicleDTO> getAllVehicles();
    VehicleDTO getVehicleById(Long id);
    VehicleDTO createVehicle(VehicleDTO vehicleDTO);
    VehicleDTO updateVehicle(Long id, VehicleDTO vehicleDTO);
    void deleteVehicle(Long id);
    Page<VehicleDTO>searchVehicles(VehicleSearchCriteria searchCriteria);
    VehicleDTO createManualVehicle(VehicleDTO vehicleDTO);
    long getVehicleCount();
    VehicleDTO createAiVehicle(VehicleDTO vehicleDTO);
}