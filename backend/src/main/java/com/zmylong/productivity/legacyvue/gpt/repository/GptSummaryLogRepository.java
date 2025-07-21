package com.zmylong.productivity.legacyvue.gpt.repository;

import com.zmylong.productivity.legacyvue.gpt.entity.GptSummaryLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface GptSummaryLogRepository extends JpaRepository<GptSummaryLog, Long> {
    Optional<GptSummaryLog> findBySummaryDate(LocalDate summaryDate);
}
