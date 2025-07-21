package com.zmylong.productivity.diary.controller;

import com.zmylong.productivity.diary.dto.response.GPTSummaryResponseDTO;
import com.zmylong.productivity.diary.dto.response.SummaryResponseDTO;
import com.zmylong.productivity.diary.service.summary.SummaryService;
import com.zmylong.productivity.member.security.MemberDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Slf4j
public class SummaryController {

    private final SummaryService summaryService;

    //메뉴 : 로그인 하면 바로나오는 첫화면 (개발 의도는 오늘하루 감정 요약인데 오늘 감정 최신 1개만 나오도록 변경)
    @GetMapping("/summary/today")
    public SummaryResponseDTO getTodaySummary(@AuthenticationPrincipal MemberDetails member) {

        log.info("Controller 진입 성공");
        //return ResponseEntity.status(HttpStatus.NOT_FOUND).body("404 직접 리턴");
        return summaryService.getTodaySummary(member.getMember());
    }

    //메뉴 : 로그인 하면 바로나오는 첫화면의 오늘의 GPT 요약 조회 (gpt_summary)
    @GetMapping("/gpt-summary/today")
    public GPTSummaryResponseDTO getTodayGptSummary(@AuthenticationPrincipal MemberDetails member) {

        Long memberId = member.getId();

        return summaryService.getTodayGPTSummary(memberId);
    }
}
