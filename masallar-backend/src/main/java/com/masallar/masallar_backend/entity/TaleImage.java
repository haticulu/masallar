package com.masallar.masallar_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tale_images")
@Data
public class TaleImage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "tale_id")
    private Long taleId;
    
    @Column(name = "image_url")
    private String imageUrl;
}