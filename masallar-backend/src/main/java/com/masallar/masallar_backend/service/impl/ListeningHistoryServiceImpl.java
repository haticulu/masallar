package com.masallar.masallar_backend.service.impl;

import com.masallar.masallar_backend.entity.ListeningHistory;
import com.masallar.masallar_backend.repository.ListeningHistoryRepository;
import com.masallar.masallar_backend.service.ListeningHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ListeningHistoryServiceImpl implements ListeningHistoryService {

    private final ListeningHistoryRepository listeningHistoryRepository;

    @Autowired
    public ListeningHistoryServiceImpl(ListeningHistoryRepository listeningHistoryRepository) {
        this.listeningHistoryRepository = listeningHistoryRepository;
    }

    @Override
    public ListeningHistory addHistory(ListeningHistory history) {
        return listeningHistoryRepository.save(history);
    }

    @Override
    public List<ListeningHistory> getHistoryByUserId(Integer userId) {
        return listeningHistoryRepository.findByUserId(userId);
    }
}