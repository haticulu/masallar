package com.masallar.masallar_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "listening_history")
@Data
public class ListeningHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "user_id")
    private Integer userId;
    
    @Column(name = "tale_id")
    private Integer taleId;
    
  
    
    private LocalDateTime listenedAt = LocalDateTime.now();
}