package com.zmylong.productivity.diary.controller;


import com.fasterxml.jackson.core.JsonProcessingException;


import com.zmylong.productivity.diary.dto.response.DiaryGroupPageResponseDTO;
import com.zmylong.productivity.diary.dto.response.DiaryGroupResponseDTO;
import com.zmylong.productivity.diary.dto.request.DiarySaveRequestDTO;
import com.zmylong.productivity.diary.dto.request.GPTSummaryRequestDTO;
import com.zmylong.productivity.diary.dto.response.GPTSummaryResponseDTO;
import com.zmylong.productivity.diary.service.diary.DiaryEntryService;
import com.zmylong.productivity.diary.service.gpt.GptService;
import com.zmylong.productivity.member.security.MemberDetails;
import lombok.RequiredArgsConstructor;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class DiaryEntryController {

    private final DiaryEntryService diaryEntryService;
    private final GptService gptService;

    //메뉴 : 회고 목록
    @GetMapping("/diaries")
    public DiaryGroupPageResponseDTO getDiaryList(
            @AuthenticationPrincipal MemberDetails memberDetails,
            Pageable pageable
    ) {
        Long memberId = memberDetails.getId();
        return diaryEntryService.getDiaryListGroupedByDate(memberId, pageable);
    }


    //메뉴 : 회고 달력
    @GetMapping("/diaries/monthly")
    public List<DiaryGroupResponseDTO> getDiaryListMonthly(@AuthenticationPrincipal MemberDetails memberDetails,
                                                           @RequestParam("yearMonth") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate yearMonth) {

        Long memberId = memberDetails.getId();
        return diaryEntryService.getEntriesForMonthlyGroupedByDate(memberId, yearMonth);

    }

    //메뉴 : 회고 쓰기
    @PostMapping("/diary")
    public ResponseEntity<Void> saveDiary(
            @AuthenticationPrincipal MemberDetails memberDetails,
            @RequestBody DiarySaveRequestDTO dto
    ) throws JsonProcessingException {
        Long memberId = memberDetails.getId(); // 로그인된 사용자 ID
        diaryEntryService.saveDiary(memberId, dto);
        return ResponseEntity.ok().build();
    }

    //메뉴 : 회고 달력 > 날짜 클릭 > GPT 요약생성 Btn Click (클릭한 날짜의 GPT 회고요약이 없을때만 버튼생성)
    @PostMapping("/diary/gpt-summary")
    public ResponseEntity<GPTSummaryResponseDTO> generateSummary(
            @AuthenticationPrincipal MemberDetails memberDetails,
            @RequestBody GPTSummaryRequestDTO request
    ) {

        String summary = gptService.generateAndSaveSummary(
                memberDetails.getId(),
                request.getDate()
        );

        return ResponseEntity.ok(new GPTSummaryResponseDTO(summary));
    }

}
