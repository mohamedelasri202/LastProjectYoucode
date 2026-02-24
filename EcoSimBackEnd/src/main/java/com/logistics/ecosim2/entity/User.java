package com.logistics.ecosim2.entity;


import com.logistics.ecosim2.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;





@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole role;
    private boolean enabled = true;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Vehicle> garage;
}