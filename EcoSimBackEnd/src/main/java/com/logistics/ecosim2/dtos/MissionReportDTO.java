package com.logistics.ecosim2.dtos;

import com.logistics.ecosim2.entity.SimulationResult;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MissionReportDTO {
    private SimulationResult simulationDetails;
    private String aiRecommendation;
}