package com.logistics.ecosim2.Controller;


import com.logistics.ecosim2.Service.AuthService;
import com.logistics.ecosim2.dtos.UserRequestDTO;
import com.logistics.ecosim2.dtos.UserResponseDTO;
import com.logistics.ecosim2.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping("/user")

public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService =authService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserRequestDTO userRequestDTO){

    }
}
