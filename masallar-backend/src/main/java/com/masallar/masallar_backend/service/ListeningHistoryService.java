package com.masallar.masallar_backend.service;

import com.masallar.masallar_backend.entity.ListeningHistory;
import java.util.List;

public interface ListeningHistoryService {
    ListeningHistory addHistory(ListeningHistory history);
    List<ListeningHistory> getHistoryByUserId(Integer userId);
}