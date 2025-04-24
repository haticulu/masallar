package com.masallar.masallar_backend.controller;

import com.masallar.masallar_backend.entity.ListeningHistory;
import com.masallar.masallar_backend.service.ListeningHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/listening-history")
public class ListeningHistoryController {

    @Autowired
    private ListeningHistoryService listeningHistoryService;

    @PostMapping
    public ListeningHistory addHistory(@RequestBody ListeningHistory history) {
        return listeningHistoryService.addHistory(history);
    }

    @GetMapping("/user/{userId}")
    public List<ListeningHistory> getUserHistory(@PathVariable Integer userId) {
        return listeningHistoryService.getHistoryByUserId(userId);
    }
}