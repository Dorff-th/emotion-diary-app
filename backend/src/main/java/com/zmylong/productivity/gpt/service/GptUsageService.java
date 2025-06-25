package com.zmylong.productivity.gpt.service;

import com.zmylong.productivity.gpt.dto.GptDailyUsageDTO;
import com.zmylong.productivity.gpt.repository.GptCallLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GptUsageService {

    private final GptCallLogRepository gptCallLogRepository;

    public List<GptDailyUsageDTO> getUsage(LocalDate startDate, LocalDate endDate) {
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.plusDays(1).atStartOfDay().minusNanos(1);

        List<Object[]> raw = gptCallLogRepository.findUsageBetween(start, end);

        return raw.stream()
                .map(row -> new GptDailyUsageDTO(
                        ((java.sql.Date) row[0]).toLocalDate(),
                        ((Number) row[1]).longValue(),
                        ((Number) row[2]).doubleValue()
                ))
                .toList();
    }
}


