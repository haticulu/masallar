package com.masallar.masallar_backend.service;

import com.masallar.masallar_backend.entity.Tale;
import com.masallar.masallar_backend.entity.TaleImage;
import java.util.List;
import java.util.Optional;

public interface TaleService {
    Tale saveTale(Tale tale);
    Optional<Tale> getTaleById(Long id);
    List<Tale> getAllTales();
    List<TaleImage> getTaleImages(Long taleId);
}