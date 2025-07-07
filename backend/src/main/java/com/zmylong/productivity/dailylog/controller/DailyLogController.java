package com.zmylong.productivity.dailylog.controller;

import com.zmylong.productivity.dailylog.dto.DailyLogDto;
import com.zmylong.productivity.dailylog.entity.DailyLog;
import com.zmylong.productivity.member.entity.Member;
import com.zmylong.productivity.member.security.MemberDetails;
import com.zmylong.productivity.dailylog.service.DailyLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RestController;


import com.zmylong.productivity.dailylog.dto.DailyLogRequest;
import com.zmylong.productivity.gpt.service.OpenAIService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Vue 개발 환경용 CORS 허용
@Log4j2
@RequiredArgsConstructor
public class DailyLogController {

    private final OpenAIService openAIService;  // service로 이동
    private final DailyLogService dailyLogService;

    @PostMapping("/daily-log")
    public ResponseEntity<?> createLog(@RequestBody DailyLogRequest request, @AuthenticationPrincipal MemberDetails memberDetails) {


        Member member = memberDetails.getMember();
        DailyLog savedLog = dailyLogService.saveDailyLog(member, request);
        return ResponseEntity.ok(savedLog);
    }



    /**
     * 오늘 하루의 전체 로그 목록
     */
    @GetMapping("/daily-logs/today")
    public ResponseEntity<List<DailyLogDto>> getTodayLogs(@AuthenticationPrincipal MemberDetails memberDetails) {
        Member member = memberDetails.getMember();

        List<DailyLogDto> logs = dailyLogService.getTodayLogs(member);

        return logs.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(logs);
    }

    //사용자가 달력에서 직접 날짜를 선택하여 감정상태와 회고록 조회
    @GetMapping("/daily-logs/date")
    public ResponseEntity<List<DailyLogDto>> getLogsByDate(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                                           @AuthenticationPrincipal MemberDetails memberDetails) {

        //log.info("\n\n==Requestparams date : " + date);

        Member member = memberDetails.getMember();
        List<DailyLogDto> logs = dailyLogService.getLogsByDate(date, member);

        //logs.forEach(log -> System.out.println(log.getCreatedAt()));


        return logs.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(logs);
    }


    // 하루 전체 요약 GTP
    @GetMapping("/daily-log/summary")
    public ResponseEntity<?> getSummaryByDate(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date, @AuthenticationPrincipal MemberDetails memberDetails) {
        Member member = memberDetails.getMember();
        List<DailyLogDto> logs = dailyLogService.getLogsByDate(date, member);
        if (logs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        String summary = openAIService.summarizeDailyLogs(logs, date);
        return ResponseEntity.ok(Map.of("summary", summary));
    }

}

