package com.logistics.ecosim2.dtos;


import lombok.Data;

@Data
public class RouteRequest {
    private double startLat;
    private double startLng;
    private double endLat;
    private double endLng;
    private Long vehicleId;


}