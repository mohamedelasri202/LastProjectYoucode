package com.logistics.ecosim2.dtos;

import com.logistics.ecosim2.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private UserRole role;
    private boolean enabled;
    private int vehicleCount;
}