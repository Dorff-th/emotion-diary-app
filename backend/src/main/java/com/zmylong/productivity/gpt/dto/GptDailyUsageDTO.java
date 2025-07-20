package com.zmylong.productivity.gpt.dto;

import java.time.LocalDate;

public record GptDailyUsageDTO(
        LocalDate date,
        long callCount,
        double totalCost
) {}

