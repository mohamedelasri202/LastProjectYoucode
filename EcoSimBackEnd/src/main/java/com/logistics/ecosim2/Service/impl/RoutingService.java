package com.logistics.ecosim2.Service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.logistics.ecosim2.dtos.RouteRequest;
import com.logistics.ecosim2.dtos.TripProfileResponse;
import com.logistics.ecosim2.entity.TripProfile;
import com.logistics.ecosim2.entity.Vehicle;
import com.logistics.ecosim2.repository.TripProfileRepository;
import com.logistics.ecosim2.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class RoutingService {

    @Value("${ors.api.key}")
    private String apiKey;

    @Autowired
    private TripProfileRepository tripProfileRepository;
    @Autowired
    private VehicleRepository vehicleRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String ORS_URL = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";


    public TripProfileResponse getDetailedProfileAndSave(RouteRequest request) {

        TripProfileResponse dto = this.getDetailedProfile(request);

        if (dto == null) return null;


        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + request.getVehicleId()));

        TripProfile entity = new TripProfile();

        entity.setVehicle(vehicle);

        entity.setTripName("Mission_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM_HH:mm")));
        entity.setTotalDistanceKm(dto.getDistanceKm());
        entity.setHighwayPercentage(dto.getHighwayPercentage());
        entity.setCityPercentage(dto.getCityPercentage());
        entity.setAvgHighwaySpeedKmh(dto.getAvgHighwaySpeedKmh());
        entity.setAvgCitySpeedKmh(dto.getAvgCitySpeedKmh());
        entity.setRoadInclineDegree(dto.getRoadInclineDegree());

       TripProfile savedTrip  = tripProfileRepository.save(entity);

        dto.setId(savedTrip.getId());

        dto.setVehicleId(vehicle.getId());




        return dto;
    }


    public TripProfileResponse getDetailedProfile(RouteRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("coordinates", List.of(
                List.of(request.getStartLng(), request.getStartLat()),
                List.of(request.getEndLng(), request.getEndLat())
        ));
        body.put("elevation", true);
        body.put("extra_info", List.of("waytype"));
        body.put("units", "km");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            JsonNode response = restTemplate.postForObject(ORS_URL, entity, JsonNode.class);
            if (response == null || !response.has("features")) return null;

            JsonNode feature = response.get("features").get(0);
            JsonNode properties = feature.get("properties");

            TripProfileResponse profile = new TripProfileResponse();


            double dist = properties.get("summary").get("distance").asDouble();
            profile.setDistanceKm(dist);


            JsonNode bbox = feature.get("bbox");

            double elevationGain = bbox.get(5).asDouble() - bbox.get(2).asDouble();
            profile.setElevationGain(elevationGain);


            double incline = Math.toDegrees(Math.atan(elevationGain / (dist * 1000)));
            profile.setRoadInclineDegree(Math.round(incline * 100.0) / 100.0);


            analyzeWaytypes(properties.get("extras").get("waytype"), dist, profile);


            profile.setAvgHighwaySpeedKmh(110.0);
            profile.setAvgCitySpeedKmh(40.0);

            double hTime = (dist * (profile.getHighwayPercentage()/100)) / profile.getAvgHighwaySpeedKmh();
            double cTime = (dist * (profile.getCityPercentage()/100)) / profile.getAvgCitySpeedKmh();
            profile.setEstimatedTimeMinutes((int) ((hTime + cTime) * 60));

            return profile;

        } catch (Exception e) {
            System.err.println("ORS POST Error: " + e.getMessage());
            return null;
        }
    }

    private void analyzeWaytypes(JsonNode waytypes, double totalDist, TripProfileResponse profile) {
        double highwayKm = 0;

        if (waytypes != null && waytypes.has("values")) {
            for (JsonNode segment : waytypes.get("values")) {
                int typeCode = segment.get(2).asInt();

                double segmentDist = (segment.get(1).asInt() - segment.get(0).asInt()) * (totalDist / 1000);


                if (typeCode == 1 || typeCode == 3 || typeCode == 4) {
                    highwayKm += segmentDist;
                }
            }
        }

        if (highwayKm == 0 && totalDist > 20) highwayKm = totalDist * 0.8;

        double hPercent = (highwayKm / totalDist) * 100;
        profile.setHighwayPercentage(Math.min(Math.round(hPercent), 100));
        profile.setCityPercentage(100 - profile.getHighwayPercentage());
    }
}