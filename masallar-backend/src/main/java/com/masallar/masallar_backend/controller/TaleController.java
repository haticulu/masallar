package com.masallar.masallar_backend.controller;

import com.masallar.masallar_backend.entity.Tale;
import com.masallar.masallar_backend.entity.TaleImage;
import com.masallar.masallar_backend.service.TaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tales")
//@CrossOrigin(origins = "http://localhost:3000")
public class TaleController {

    @Autowired
    private TaleService taleService;

    @GetMapping
    public List<Tale> getAllTales() {
        return taleService.getAllTales();
    }

    @GetMapping("/{taleId}/images")
    public List<TaleImage> getTaleImages(@PathVariable Long taleId) {
        return taleService.getTaleImages(taleId);
    }

    @PostMapping
    public Tale createTale(@RequestBody Tale tale) {
        return taleService.saveTale(tale);
    }
}