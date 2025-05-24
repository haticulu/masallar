package com.masallar.masallar_backend.service;

public interface PasswordResetService {
    boolean resetPassword(String email, String newPassword);
}