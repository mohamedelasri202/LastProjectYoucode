package com.logistics.ecosim2.dtos;

import com.logistics.ecosim2.enums.UserRole;
import lombok.Data;

@Data
public class UserRequestDTO {
    private String username;
    private String password;
    private String email;
    private UserRole role;
}