package com.masallar.masallar_backend.repository;

import com.masallar.masallar_backend.entity.ListeningHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ListeningHistoryRepository extends JpaRepository<ListeningHistory, Integer> {
    List<ListeningHistory> findByUserId(Integer userId);
}