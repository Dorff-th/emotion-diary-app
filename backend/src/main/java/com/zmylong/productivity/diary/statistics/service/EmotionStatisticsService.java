// src/main/java/com/zmylong/productivity/statistics/service/EmotionStatisticsService.java
package com.zmylong.productivity.diary.statistics.service;

import com.zmylong.productivity.diary.entity.DiaryEntry;
import com.zmylong.productivity.diary.repository.diary.DiaryEntryRepository;
import com.zmylong.productivity.diary.statistics.dto.WeeklyTrendDTO;
import com.zmylong.productivity.diary.statistics.dto.EmotionStatisticsDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmotionStatisticsService {

    private final DiaryEntryRepository diaryEntryRepository;

    public EmotionStatisticsDTO getEmotionStatistics(Long memberId, LocalDate startDate, LocalDate endDate) {
        List<DiaryEntry> entries = diaryEntryRepository.findByMemberIdAndDiaryDateBetween(memberId, startDate, endDate);

        if (entries.isEmpty()) {
            return new EmotionStatisticsDTO(0.0, Collections.emptyMap(), Collections.emptyList(), Collections.emptyMap());
        }

        // ✅ 평균 감정 점수
        double average = entries.stream()
                .mapToInt(DiaryEntry::getEmotion)
                .average()
                .orElse(0.0);

        // ✅ 감정 점수 빈도 (1~5)
        Map<Integer, Long> frequency = entries.stream()
                .collect(Collectors.groupingBy(DiaryEntry::getEmotion, Collectors.counting()));

        // ✅ 주간 감정 추이
        Map<String, Double> weeklyMap = entries.stream()
                .collect(Collectors.groupingBy(
                        entry -> getWeekLabel(entry.getDiaryDate()),
                        Collectors.averagingInt(DiaryEntry::getEmotion)
                ));

        List<WeeklyTrendDTO> weeklyTrend = weeklyMap.entrySet().stream()
                .map(e -> new WeeklyTrendDTO(e.getKey(), e.getValue()))
                .sorted(Comparator.comparing(WeeklyTrendDTO::getWeekLabel))
                .collect(Collectors.toList());

        // ✅ 요일별 평균 감정
        Map<DayOfWeek, Double> dayOfWeekAvg = entries.stream()
                .collect(Collectors.groupingBy(
                        entry -> entry.getDiaryDate().getDayOfWeek(),
                        Collectors.averagingInt(DiaryEntry::getEmotion)
                ));

        return new EmotionStatisticsDTO(average, frequency, weeklyTrend, dayOfWeekAvg);
    }

    private String getWeekLabel(LocalDate date) {
        LocalDate monday = date.with(DayOfWeek.MONDAY);
        LocalDate sunday = monday.plusDays(6);
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MM.dd");
        return fmt.format(monday) + "~" + fmt.format(sunday);
    }
}
