package com.zmylong.productivity.diary.repository.gpt;

import com.zmylong.productivity.diary.entity.DiaryEntry;
import com.zmylong.productivity.diary.entity.GptSummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface GptSummaryRepository extends JpaRepository<GptSummary, Long> {

    /**
     * 특정 날짜에 해당하는 하루 전체 요약을 조회한다.
     * (diary_entry_id가 null인 경우만 해당 → 하루 전체 요약임)
     */
    Optional<GptSummary> findFirstByMemberIdAndDiaryDateAndDiaryEntryIdIsNull(Long memberId, LocalDate diaryDate);

    Optional<GptSummary> findByDiaryEntry(DiaryEntry diaryEntry);

    //특정날짜 (예 오늘날짜)의 Gpt회고 요약만 조회하기
    Optional<GptSummary> findByMemberIdAndDiaryDate(Long memberId, LocalDate diaryDate);
}
