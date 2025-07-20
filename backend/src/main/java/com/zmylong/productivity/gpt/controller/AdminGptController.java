package com.zmylong.productivity.gpt.controller;

import com.zmylong.productivity.gpt.dto.GptDailyUsageDTO;
import com.zmylong.productivity.gpt.service.GptUsageService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin/openai")
@RequiredArgsConstructor
public class AdminGptController {


    private final GptUsageService gptUsageService;


    @GetMapping("/usage")
    public ResponseEntity<List<GptDailyUsageDTO>> getUsage(
            @RequestParam(name = "start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(name = "end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        return ResponseEntity.ok(gptUsageService.getUsage(start, end));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/dashboard")
    public ResponseEntity<?> adminDashboard() {
        return ResponseEntity.ok("관리자용 데이터입니다.");
    }
}
