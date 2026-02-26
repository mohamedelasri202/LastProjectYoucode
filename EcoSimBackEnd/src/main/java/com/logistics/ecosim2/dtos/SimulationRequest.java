package com.logistics.ecosim2.dtos;

import lombok.Data;

@Data
public class SimulationRequest {
    private Long vehicleId;
    private Long tripProfileId;
    private double fuelPrice;
}