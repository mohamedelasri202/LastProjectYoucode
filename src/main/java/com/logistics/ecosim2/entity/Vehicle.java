package com.logistics.ecosim2.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "vehicles")
@Data
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;



    private double weightKg;
    private double dragCoefficient;
    private double frontalAreaSqM;
    private double rollingResistance;

    private String fuelType;
    private double fuelPricePerLitre;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;
}