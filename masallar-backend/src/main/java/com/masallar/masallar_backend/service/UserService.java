package com.masallar.masallar_backend.service;

import com.masallar.masallar_backend.entity.User;

public interface UserService {
    User saveUser(User user);
    User findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
   
}