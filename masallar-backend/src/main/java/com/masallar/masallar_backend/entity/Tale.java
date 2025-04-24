package com.masallar.masallar_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tales")
@Data
public class Tale {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String kategori;
    private String sure;
    private String audioUrl;
    private String textUrl;
}