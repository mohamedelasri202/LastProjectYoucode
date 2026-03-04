package com.logistics.ecosim2.repository;

import com.logistics.ecosim2.entity.SimulationResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SimulationResultRepository extends JpaRepository<SimulationResult,Long> {
}
