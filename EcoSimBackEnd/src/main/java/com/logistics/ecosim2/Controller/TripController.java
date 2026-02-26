package com.logistics.ecosim2.Controller;

import com.logistics.ecosim2.Service.TripService;
import com.logistics.ecosim2.dtos.RouteRequest;
import com.logistics.ecosim2.dtos.TripProfileResponse;
import com.logistics.ecosim2.Service.impl.RoutingService;
import com.logistics.ecosim2.entity.TripProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:4200") // Allows your Angular app to communicate
public class TripController {

    @Autowired
    private RoutingService routingService;
    @Autowired
    private TripService tripService;


    @PostMapping("/calculate")
    public ResponseEntity<TripProfileResponse> calculateAndSave(@RequestBody RouteRequest request) {
        TripProfileResponse response = routingService.getDetailedProfileAndSave(request);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TripProfile>> getAll() {
        return ResponseEntity.ok(tripService.getAllTrips());
    }
}