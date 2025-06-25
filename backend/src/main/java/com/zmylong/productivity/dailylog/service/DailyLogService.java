package com.zmylong.productivity.dailylog.service;

import com.zmylong.productivity.dailylog.dto.DailyLogDto;
import com.zmylong.productivity.dailylog.dto.DailyLogRequest;
import com.zmylong.productivity.dailylog.entity.DailyLog;
import com.zmylong.productivity.gpt.service.OpenAIService;
import com.zmylong.productivity.member.entity.Member;
import com.zmylong.productivity.dailylog.repository.DailyLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyLogService {

    private final OpenAIService openAIService;
    private final DailyLogRepository dailyLogRepository;

    public DailyLog saveDailyLog(Member member, DailyLogRequest request) {
        int mood = request.getMood();
        List<String> habits = request.getHabits();
        String reflection = request.getReflection();

        // GPT 피드백 생성
        String feedback = openAIService.getFeedback(mood, habits, reflection);

        // 저장
        DailyLog log = DailyLog.builder()
                .mood(mood)
                .habits(String.join(", ", habits)) // 이후 JSON 변환도 가능
                .feedback(feedback)
                .reflection(reflection)
                .createdAt(LocalDateTime.now())
                .member(member)
                .build();

        return dailyLogRepository.save(log);

    }

    /**
     * 오늘 하루의 전체 로그 목록 (시간순 정렬)
     */
    @Transactional(readOnly = true)
    public List<DailyLogDto> getTodayLogs(Member member) {
        LocalDateTime today = LocalDateTime.now();

        List<DailyLog> logs = dailyLogRepository.findByMemberIdAndCreatedAt(member.getId(), today);

        return logs.stream()
                .map(DailyLogDto::new)
                .toList();
    }

    public List<DailyLogDto> getLogsByDate(LocalDate date, Member member) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = start.plusDays(1);

        List<DailyLog> logs = dailyLogRepository.findAllByMemberIdAndCreatedAtBetweenOrderByCreatedAtDesc(member.getId(), start, end);

        return logs.stream()
                .map(DailyLogDto::new)
                .toList();
    }

    // 사용자 전체 기록 최신순
    public List<DailyLog> getAllLogs(Member member) {
        return dailyLogRepository.findByMemberIdOrderByCreatedAtDesc(member.getId());
    }

}
