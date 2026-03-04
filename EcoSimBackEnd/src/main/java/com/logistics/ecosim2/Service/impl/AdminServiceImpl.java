package com.logistics.ecosim2.Service.impl;

import com.logistics.ecosim2.Service.AdminService;
import com.logistics.ecosim2.dtos.UserDTO;
import com.logistics.ecosim2.entity.User;
import com.logistics.ecosim2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole(),
                        user.isEnabled(),
                        user.getGarage() != null ? user.getGarage().size() : 0
                ))
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO toggleUserBlock(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEnabled(!user.isEnabled());
        User updatedUser = userRepository.save(user);

        return new UserDTO(
                updatedUser.getId(),
                updatedUser.getUsername(),
                updatedUser.getEmail(),
                updatedUser.getRole(),
                updatedUser.isEnabled(),
                updatedUser.getGarage() != null ? updatedUser.getGarage().size() : 0
        );
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}