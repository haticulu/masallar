package com.masallar.masallar_backend.service.impl;

import com.masallar.masallar_backend.entity.Favorite;
import com.masallar.masallar_backend.repository.FavoriteRepository;
import com.masallar.masallar_backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;

    @Autowired
    public FavoriteServiceImpl(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Override
    public Favorite addFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }
    
    @Override
    public void removeFavorite(Integer userId, Integer taleId) {
        favoriteRepository.deleteByUserIdAndTaleId(userId, taleId);
    }

    @Override
    public List<Favorite> getFavoritesByUserId(Integer userId) {
        return favoriteRepository.findByUserId(userId);
    }
}