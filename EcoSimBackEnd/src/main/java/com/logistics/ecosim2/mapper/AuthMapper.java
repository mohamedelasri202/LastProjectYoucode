package com.logistics.ecosim2.mapper;

import com.logistics.ecosim2.dtos.UserRequestDTO;
import com.logistics.ecosim2.dtos.UserResponseDTO;
import com.logistics.ecosim2.entity.User;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

    public User toEntity(UserRequestDTO request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        return user;
    }

    public UserResponseDTO toResponse(User user, String token) {
        return UserResponseDTO.builder()
                .token(token)
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}