package com.logistics.ecosim2.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.logistics.ecosim2.enums.EngineType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"garage", "password", "email", "role"})
    private User owner;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    private int year;

    @Enumerated(EnumType.STRING)
    @Column(name = "engine_type", nullable = false)
    private EngineType engineType;

    @Column(name = "official_efficiency", nullable = false)
    private double officialEfficiency;

    @Column(name = "tank_capacity")
    private double tankCapacity;
}