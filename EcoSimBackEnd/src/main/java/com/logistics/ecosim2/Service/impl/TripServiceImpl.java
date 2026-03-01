package com.logistics.ecosim2.Service.impl;

import com.logistics.ecosim2.Service.TripService;
import com.logistics.ecosim2.entity.TripProfile;
import com.logistics.ecosim2.repository.TripProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripServiceImpl implements TripService {

    @Autowired
    private TripProfileRepository tripRepository;

    @Override
    public List<TripProfile> getAllTrips() {

        return tripRepository.findAll();
    }
}