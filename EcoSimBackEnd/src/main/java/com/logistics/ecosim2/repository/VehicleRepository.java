package com.logistics.ecosim2.repository;

import com.logistics.ecosim2.entity.Vehicle;
import com.logistics.ecosim2.enums.EngineType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long>, JpaSpecificationExecutor<Vehicle> {
    List<Vehicle> findByOwnerUsername(String username);
    // Page<T> findAll(Specification<T> spec, Pageable pageable);
   Optional<Vehicle>  findByBrandAndModelAndYear(String Model , String brand , int year);

   List<Vehicle>findByEngineType(EngineType type);


}
