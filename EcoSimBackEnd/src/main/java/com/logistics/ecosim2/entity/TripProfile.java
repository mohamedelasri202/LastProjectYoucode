package com.logistics.ecosim2.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "trip_profiles")
@Data
public class TripProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    private String tripName;
    private double totalDistanceKm;

    private double highwayPercentage;
    private double cityPercentage;

    private double avgHighwaySpeedKmh;
    private double avgCitySpeedKmh;

    private double roadInclineDegree;
}