package com.logistics.ecosim2.Service.impl;

import com.logistics.ecosim2.dtos.UserRequestDTO;
import com.logistics.ecosim2.dtos.UserResponseDTO;
import com.logistics.ecosim2.entity.User;

import com.logistics.ecosim2.enums.UserRole;
import com.logistics.ecosim2.mapper.AuthMapper;
import com.logistics.ecosim2.repository.UserRepository;
import com.logistics.ecosim2.security.JwtUtils;
import com.logistics.ecosim2.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthMapper authMapper;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @Override
    public UserResponseDTO register(UserRequestDTO request) {
        User user = authMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if (user.getRole() == null) {
            user.setRole(UserRole.USER);
        }
        User savedUser = userRepository.save(user);
        return authMapper.toResponse(savedUser, null);
    }

    @Override
    public UserResponseDTO login(UserRequestDTO request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), request.getPassword())
        );

        String token = jwtUtils.generateToken(user.getUsername());
        return authMapper.toResponse(user, token);
    }

    @Override
    public UserResponseDTO me() {

        String currentUsername = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getName();

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User profile not found: " + currentUsername));


        return authMapper.toResponse(user, null);
    }
}