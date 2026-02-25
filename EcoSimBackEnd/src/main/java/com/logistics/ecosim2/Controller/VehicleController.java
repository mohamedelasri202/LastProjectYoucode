package com.logistics.ecosim2.Controller;

import com.logistics.ecosim2.dtos.VehicleDTO;
import com.logistics.ecosim2.Service.VehicleService;
import com.logistics.ecosim2.dtos.VehicleSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
//@CrossOrigin(origins = "http://localhost:4200")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;


    @GetMapping("/all")
    public ResponseEntity<List<VehicleDTO>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }


    @GetMapping("/details/{id}")
    public ResponseEntity<VehicleDTO> getVehicleById(@PathVariable Long id) {
        return ResponseEntity.ok(vehicleService.getVehicleById(id));
    }


    @PostMapping("/manual")
    public ResponseEntity<VehicleDTO> createManual(@RequestBody VehicleDTO vehicleDTO) {
        return ResponseEntity.ok(vehicleService.createManualVehicle(vehicleDTO));
    }


    @PostMapping("/ai")
    public ResponseEntity<VehicleDTO> createWithAi(@RequestBody VehicleDTO vehicleDTO) {
        return ResponseEntity.ok(vehicleService.createAiVehicle(vehicleDTO));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<VehicleDTO> updateVehicle(@PathVariable Long id, @RequestBody VehicleDTO vehicleDTO) {
        return ResponseEntity.ok(vehicleService.updateVehicle(id, vehicleDTO));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/search")
    public ResponseEntity<Page<VehicleDTO>> searchVehicles(@ModelAttribute VehicleSearchCriteria criteria) {
        return ResponseEntity.ok(vehicleService.searchVehicles(criteria));
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        return ResponseEntity.ok(vehicleService.getVehicleCount());
    }
}