package com.logistics.ecosim2.mapper;

import com.logistics.ecosim2.dtos.VehicleDTO;
import com.logistics.ecosim2.entity.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class VehicleMapper {


    public VehicleDTO toDTO(Vehicle vehicle) {
        if (vehicle == null) return null;

        VehicleDTO dto = new VehicleDTO();
        dto.setId(vehicle.getId());
        dto.setBrand(vehicle.getBrand());
        dto.setModel(vehicle.getModel());
        dto.setWeightKg(vehicle.getWeightKg());
        dto.setDragCoefficient(vehicle.getDragCoefficient());
        dto.setFrontalAreaSqM(vehicle.getFrontalAreaSqM());
        dto.setFuelType(vehicle.getFuelType());
        return dto;
    }


    public Vehicle toEntity(VehicleDTO dto) {
        if (dto == null) return null;

        Vehicle vehicle = new Vehicle();
        vehicle.setId(dto.getId());
        vehicle.setBrand(dto.getBrand());
        vehicle.setModel(dto.getModel());
        vehicle.setWeightKg(dto.getWeightKg());
        vehicle.setDragCoefficient(dto.getDragCoefficient());
        vehicle.setFrontalAreaSqM(dto.getFrontalAreaSqM());
        vehicle.setFuelType(dto.getFuelType());
        return vehicle;
    }
}