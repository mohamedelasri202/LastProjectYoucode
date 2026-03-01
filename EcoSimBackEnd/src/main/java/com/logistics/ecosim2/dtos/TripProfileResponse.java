package com.logistics.ecosim2.dtos;

import lombok.Data;

@Data
public class TripProfileResponse {
    private double distanceKm;
    private double highwayPercentage;
    private double cityPercentage;
    private double roadInclineDegree;
    private double elevationGain;
    private double avgHighwaySpeedKmh;
    private double avgCitySpeedKmh;
    private int estimatedTimeMinutes;
}