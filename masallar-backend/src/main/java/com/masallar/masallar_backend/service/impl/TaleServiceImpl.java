package com.masallar.masallar_backend.service.impl;

import com.masallar.masallar_backend.entity.Tale;
import com.masallar.masallar_backend.entity.TaleImage;
import com.masallar.masallar_backend.repository.TaleRepository;
import com.masallar.masallar_backend.repository.TaleImageRepository;
import com.masallar.masallar_backend.service.TaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaleServiceImpl implements TaleService {

    @Autowired
    private TaleRepository taleRepository;

    @Autowired
    private TaleImageRepository taleImageRepository;

    @Override
    public Tale saveTale(Tale tale) {
        return taleRepository.save(tale);
    }

    @Override
    public Optional<Tale> getTaleById(Long id) {
        return taleRepository.findById(id);
    }

    @Override
    public List<Tale> getAllTales() {
        return taleRepository.findAll();
    }

    @Override
    public List<TaleImage> getTaleImages(Long taleId) {
        return taleImageRepository.findByTaleId(taleId);
    }
}