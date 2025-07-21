package com.zmylong.productivity.legacyvue.dailylog.repository;

import com.zmylong.productivity.legacyvue.dailylog.entity.DailyLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DailyLogRepository extends JpaRepository<DailyLog, Long> {

    //Optional<DailyLog> findTopByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    //하루에 기록된 기분점수와 습관은 1개 이상이 될수 있으므로 리스트로 받는다.
    //List<DailyLog> findAllByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime start, LocalDateTime end);
    List<DailyLog> findAllByMemberIdAndCreatedAtBetweenOrderByCreatedAtDesc(Long memberId, LocalDateTime start, LocalDateTime end);


    List<DailyLog> findByMemberIdOrderByCreatedAtDesc(Long memberId);
    Optional<DailyLog> findByIdAndMemberId(Long logId, Long memberId);
    List<DailyLog> findByMemberIdAndCreatedAt(Long memberId, LocalDateTime date);

}
