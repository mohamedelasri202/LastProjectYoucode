package com.logistics.ecosim2.Service.impl;

import com.logistics.ecosim2.Service.AiService; // Import your AI Interface
import com.logistics.ecosim2.Service.SimulationService;
import com.logistics.ecosim2.dtos.MissionReportDTO; // New DTO
import com.logistics.ecosim2.dtos.SimulationRequest;
import com.logistics.ecosim2.entity.SimulationResult;
import com.logistics.ecosim2.entity.TripProfile;
import com.logistics.ecosim2.entity.Vehicle;
import com.logistics.ecosim2.repository.SimulationResultRepository;
import com.logistics.ecosim2.repository.TripProfileRepository;
import com.logistics.ecosim2.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class SimulationServiceImpl implements SimulationService {

    @Autowired private VehicleRepository vehicleRepo;
    @Autowired private TripProfileRepository tripRepo;
    @Autowired private SimulationResultRepository resultRepo;


    @Autowired private AiService aiService;


    @Transactional
    public MissionReportDTO executeSimulationWithAi(SimulationRequest request) {

        SimulationResult savedResult = this.executeSimulation(request);


        String aiAdvice = aiService.getAiRecommendations(savedResult);


        return new MissionReportDTO(savedResult, aiAdvice);
    }


    @Override
    public SimulationResult executeSimulation(SimulationRequest request) {
        Vehicle vehicle = vehicleRepo.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("vehicle not found"));
        TripProfile trip = tripRepo.findById(request.getTripProfileId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        SimulationResult res = new SimulationResult();
        res.setVehicle(vehicle);
        res.setTrip(trip);
        res.setSimulationDate(LocalDateTime.now());

        double hFactor = (trip.getHighwayPercentage() / 100.0) * 0.9;
        double cFactor = (trip.getCityPercentage() / 100.0) * 1.3;
        double inclineFactor = 1.0 + (trip.getRoadInclineDegree() * 0.05);

        double finalEfficiency = vehicle.getOfficialEfficiency() * (hFactor + cFactor) * inclineFactor;
        res.setCalculatedLitersPer100km(finalEfficiency);

        double liters = (trip.getTotalDistanceKm() / 100.0) * finalEfficiency;
        res.setTotalFuelConsumedLiters(liters);
        res.setTotalCost(liters * request.getFuelPrice());
        res.setCo2EmissionsKg(liters * 2.31);

        return resultRepo.save(res);
    }

    @Override
    public long getSimulationCount() {
        return resultRepo.count();
    }
}