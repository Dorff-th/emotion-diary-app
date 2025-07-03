package com.zmylong.productivity.gpt.repository;

import com.zmylong.productivity.gpt.entity.GptCallLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface GptCallLogRepository extends JpaRepository<GptCallLog, Long> {

    @Query(
            value = "SELECT DATE(called_at) AS date, COUNT(*) AS call_count, SUM(cost) AS total_cost " +
                    "FROM gpt_call_log " +
                    "WHERE called_at BETWEEN :start AND :end " +
                    "GROUP BY DATE(called_at) " +
                    "ORDER BY DATE(called_at)",
            nativeQuery = true
    )
    List<Object[]> findUsageBetween(@Param("start") LocalDateTime start,
                                    @Param("end") LocalDateTime end);
}


