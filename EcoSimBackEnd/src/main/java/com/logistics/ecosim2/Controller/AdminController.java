package com.logistics.ecosim2.Controller;

import com.logistics.ecosim2.Service.AdminService;
import com.logistics.ecosim2.Service.SimulationService;
import com.logistics.ecosim2.Service.VehicleService;
import com.logistics.ecosim2.dtos.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")

public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private SimulationService simulationService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PatchMapping("/{id}/block")
    public ResponseEntity<UserDTO> blockUnblock(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.toggleUserBlock(id));
    }
    @GetMapping("/stats/summary")
    public ResponseEntity<Map<String, Long>> getGlobalStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalVehicles", vehicleService.getVehicleCount());
        stats.put("totalSimulations", simulationService.getSimulationCount());
        return ResponseEntity.ok(stats);
    }
}