package com.logistics.ecosim2.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "simulation_results")
@Data
public class SimulationResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Vehicle vehicle;

    @ManyToOne
    private TripProfile trip;

    private double totalFuelConsumedLiters;
    private double totalCost;
    private double co2EmissionsKg;
    private double calculatedLitersPer100km;

    private LocalDateTime simulationDate;
}