package com.zmylong.productivity.diary.service.summary;

import com.zmylong.productivity.diary.dto.response.GPTSummaryResponseDTO;
import com.zmylong.productivity.diary.dto.response.SummaryResponseDTO;
import com.zmylong.productivity.diary.entity.DiaryEntry;
import com.zmylong.productivity.diary.entity.GptSummary;
import com.zmylong.productivity.diary.repository.diary.DiaryEntryRepository;
import com.zmylong.productivity.diary.repository.gpt.GptSummaryRepository;
import com.zmylong.productivity.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class SummaryServiceImpl implements SummaryService {

    private final DiaryEntryRepository diaryEntryRepository;
    private final GptSummaryRepository gptSummaryRepository;

    // 사용자의 오늘의 회고 요약인데 지금은 오늘의 회고중 최신 데이터 1개만 가져옴
    @Override
    public SummaryResponseDTO getTodaySummary(Member member) {
        LocalDate today = LocalDate.now();

        DiaryEntry diary = diaryEntryRepository.findTopByMemberAndDiaryDateOrderByCreatedAtDesc(member, today)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "오늘의 회고가 없습니다."));

        GptSummary gpt = gptSummaryRepository.findByDiaryEntry(diary).orElse(null);

        return new SummaryResponseDTO(
                diary.getDiaryDate(),
                diary.getEmotion(),
                diary.getFeelingKo(),
                diary.getFeelingEn(),
                diary.getHabitTags(),
                diary.getContent(),
                gpt != null ? gpt.getSummary() : null,
                diary.getFeedback()
        );
    }

    @Override
    public GPTSummaryResponseDTO getTodayGPTSummary(Long memberId) {

        LocalDate today = LocalDate.now();
        GptSummary todayGptSummary = gptSummaryRepository.findByMemberIdAndDiaryDate(memberId, today)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"오늘의 GPT 요약이 없습니다."));

        return new GPTSummaryResponseDTO(todayGptSummary.getSummary());

    }
}

