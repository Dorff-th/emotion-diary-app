package com.zmylong.productivity.diary.statistics.controller;

import com.zmylong.productivity.diary.statistics.service.EmotionStatisticsService;
import com.zmylong.productivity.member.security.MemberDetails;
import com.zmylong.productivity.diary.statistics.dto.EmotionStatisticsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/user/statistics/emotion")
@RequiredArgsConstructor
public class EmotionStatisticsController {

    private final EmotionStatisticsService emotionStatisticsService;

    @GetMapping
    public EmotionStatisticsDTO getEmotionStatistics(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @AuthenticationPrincipal MemberDetails memberDetails

    ) {
        Long memberId = memberDetails.getId();
        return emotionStatisticsService.getEmotionStatistics(memberId, startDate, endDate);
    }
}
