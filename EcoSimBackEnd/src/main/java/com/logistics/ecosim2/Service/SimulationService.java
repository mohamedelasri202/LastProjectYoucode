package com.logistics.ecosim2.Service;

import com.logistics.ecosim2.dtos.SimulationRequest;
import com.logistics.ecosim2.entity.SimulationResult;

public interface SimulationService {
    SimulationResult executeSimulation(SimulationRequest request);
    long getSimulationCount();
}
