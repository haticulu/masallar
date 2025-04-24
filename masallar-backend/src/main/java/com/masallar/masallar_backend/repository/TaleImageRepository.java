package com.masallar.masallar_backend.repository;

import com.masallar.masallar_backend.entity.TaleImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaleImageRepository extends JpaRepository<TaleImage, Long> {
    List<TaleImage> findByTaleId(Long taleId);
}