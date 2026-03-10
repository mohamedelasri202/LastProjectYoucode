package com.logistics.ecosim2.repository;

import com.logistics.ecosim2.entity.TripProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TripProfileRepository extends JpaRepository<TripProfile,Long> {
}
