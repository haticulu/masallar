package com.masallar.masallar_backend.service;

import com.masallar.masallar_backend.entity.Favorite;
import java.util.List;

public interface FavoriteService {
    Favorite addFavorite(Favorite favorite);
    List<Favorite> getFavoritesByUserId(Integer userId);
}