package com.logistics.ecosim2.Service;


import com.logistics.ecosim2.dtos.UserRequestDTO;
import com.logistics.ecosim2.dtos.UserResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserResponseDTO register(UserRequestDTO request);
    UserResponseDTO login(UserRequestDTO request);
    UserResponseDTO me();
}
