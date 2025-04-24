package com.masallar.masallar_backend.repository;

import com.masallar.masallar_backend.entity.Tale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaleRepository extends JpaRepository<Tale, Long> {
}