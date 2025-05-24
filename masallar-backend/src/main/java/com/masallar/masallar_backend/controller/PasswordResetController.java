package com.masallar.masallar_backend.controller;

import com.masallar.masallar_backend.dto.ResetPasswordRequest;
import com.masallar.masallar_backend.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password-reset")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean result = passwordResetService.resetPassword(request.getEmail(), request.getNewPassword());
        if (!result) {
            return ResponseEntity.badRequest().body("Kullanıcı bulunamadı");
        }
        return ResponseEntity.ok("Şifre başarıyla güncellendi");
    }
}