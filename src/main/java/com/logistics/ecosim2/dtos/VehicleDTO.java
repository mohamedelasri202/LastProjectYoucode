package com.logistics.ecosim2.dtos;

import lombok.Data;

@Data
public class VehicleDTO {
    private Long id;
    private String brand;
    private String model;
    private double weightKg;
    private double dragCoefficient;
    private double frontalAreaSqM;
    private String fuelType;
}