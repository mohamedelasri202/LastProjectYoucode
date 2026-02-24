package com.logistics.ecosim2.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {
    private String token;
    private String username;
    private String email;
    private String role;
}