package com.masallar.masallar_backend.controller;

import com.masallar.masallar_backend.entity.Favorite;
import com.masallar.masallar_backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping
    public Favorite addFavorite(@RequestBody Favorite favorite) {
        return favoriteService.addFavorite(favorite);
    }
    
    @DeleteMapping("/{userId}/{taleId}")
    public void removeFavorite(@PathVariable Integer userId, @PathVariable Integer taleId) {
        favoriteService.removeFavorite(userId, taleId);
    }

    @GetMapping("/user/{userId}")
    public List<Favorite> getFavoritesByUserId(@PathVariable Integer userId) {
        return favoriteService.getFavoritesByUserId(userId);
    }
}