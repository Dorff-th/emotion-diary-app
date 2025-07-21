package com.zmylong.productivity.diary.repository.diary;

import com.zmylong.productivity.diary.entity.DiaryEntry;
import com.zmylong.productivity.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DiaryEntryRepository extends JpaRepository<DiaryEntry, Long> {

    @EntityGraph(attributePaths = {"gptSummary"})
    Page<DiaryEntry> findByMemberId(Long memberId, Pageable pageable);

    //연월 범위로 조회
    List<DiaryEntry> findByMemberIdAndDiaryDateBetweenOrderByDiaryDateAsc(Long memberId, LocalDate startDate, LocalDate endDate);

    List<DiaryEntry> findByMemberIdAndDiaryDate(Long memberId, LocalDate date);

    List<DiaryEntry> findByMemberIdAndDiaryDateBetween(Long memberId, LocalDate startDate, LocalDate endDate);

    //Optional<DiaryEntry> findByMemberAndDiaryDate(Member member, LocalDate diaryDate);
    Optional<DiaryEntry> findTopByMemberAndDiaryDateOrderByCreatedAtDesc(Member member, LocalDate diaryDate);
}
