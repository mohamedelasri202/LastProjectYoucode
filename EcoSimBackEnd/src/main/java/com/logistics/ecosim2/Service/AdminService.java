package com.logistics.ecosim2.Service;

import com.logistics.ecosim2.dtos.UserDTO;
import java.util.List;

public interface AdminService {
    List<UserDTO> getAllUsers();
    UserDTO toggleUserBlock(Long userId);
    void deleteUser(Long userId);
}