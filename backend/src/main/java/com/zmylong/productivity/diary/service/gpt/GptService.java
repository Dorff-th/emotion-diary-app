package com.zmylong.productivity.diary.service.gpt;

import com.zmylong.productivity.member.entity.Member;

import java.time.LocalDate;
import java.util.List;

public interface GptService {
    List<String> getFeelingSuggestions(String feelingKo);
    String getDiaryFeedback(String content, String feedbackType);

    String generateAndSaveSummary(Long memberId, LocalDate date);

    String generateSummary(Member member);

    String generateFeedback(Member member); // 추가
}
