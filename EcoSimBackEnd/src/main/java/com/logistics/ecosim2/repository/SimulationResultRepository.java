package com.logistics.ecosim2.repository;

import com.logistics.ecosim2.entity.SimulationResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SimulationResultRepository extends JpaRepository<SimulationResult,Long> {

//    @Query("SELECT  * FROM SimulationResult sr JOIN  TripProfile tp WHERE tp.")
}
