package com.masallar.masallar_backend.controller;

import com.masallar.masallar_backend.entity.User;
import com.masallar.masallar_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; 
import com.masallar.masallar_backend.dto.LoginRequest; 

@RestController
@RequestMapping("/api/users")

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("EMAIL_EXISTS");
        }

        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok("REGISTER_SUCCESS");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("LOGIN_FAILED");
        }
    }
}