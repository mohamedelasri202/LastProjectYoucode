package com.logistics.ecosim2.dtos;

import com.logistics.ecosim2.enums.EngineType;
import lombok.Data;

@Data
public class VehicleSearchCriteria {
    private String brand;
    private String model;
    private EngineType engineType;

    private int page = 0;
    private int size = 20;
}