package com.logistics.ecosim2.dtos;

import com.logistics.ecosim2.enums.EngineType;
import lombok.Data;

@Data
public class VehicleDTO {
    private Long id;
    private String brand;
    private String model;
    private int year;
    private EngineType engineType;
    private double officialEfficiency;
    private double tankCapacity;
}