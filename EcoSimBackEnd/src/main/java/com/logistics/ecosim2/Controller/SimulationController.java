package com.logistics.ecosim2.Controller;

import com.logistics.ecosim2.dtos.MissionReportDTO;
import com.logistics.ecosim2.dtos.SimulationRequest;
import com.logistics.ecosim2.entity.SimulationResult;
import com.logistics.ecosim2.Service.impl.SimulationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulations")
//@CrossOrigin(origins = "http://localhost:4200")
public class SimulationController {

    @Autowired
    private SimulationServiceImpl simulationService;

    @PostMapping("/run")
    public ResponseEntity<MissionReportDTO> runFullMission(@RequestBody SimulationRequest request) {
        MissionReportDTO report = simulationService.executeSimulationWithAi(request);
        return ResponseEntity.ok(report);
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        return ResponseEntity.ok(simulationService.getSimulationCount());
    }
}