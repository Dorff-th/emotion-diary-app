package com.zmylong.productivity.dailylog.dto;

import com.zmylong.productivity.dailylog.entity.DailyLog;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DailyLogDto {
    private Long id;
    private int mood;
    private String habits;
    private String feedback;
    private LocalDateTime createdAt;
    private String reflection;

    public DailyLogDto(DailyLog log) {
        this.id = log.getId();
        this.mood = log.getMood();
        this.habits = log.getHabits();
        this.feedback = log.getFeedback();
        this.createdAt = log.getCreatedAt();
        this.reflection = log.getReflection();
        // member는 제외
    }
}
