package com.zmylong.productivity.diary.controller;

import com.zmylong.productivity.diary.dto.request.GptFeedbackRequest;
import com.zmylong.productivity.diary.dto.response.GptFeedbackResponse;
import com.zmylong.productivity.diary.dto.request.GptFeelingRequest;
import com.zmylong.productivity.diary.dto.response.GptFeelingResponse;
import com.zmylong.productivity.diary.service.gpt.GptService;
import com.zmylong.productivity.member.security.MemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user/gpt")
@RequiredArgsConstructor
public class GptController {

    private final GptService gptService;

    //메뉴 : 회고 쓰기 > 오늘의 기분한마디 (한글로) GPT 추천 버튼 Click
    @PostMapping("/feeling")
    public ResponseEntity<GptFeelingResponse> getFeelingSuggestions(@RequestBody GptFeelingRequest request) {
        List<String> suggestions = gptService.getFeelingSuggestions(request.getFeelingKo());
        return ResponseEntity.ok(new GptFeelingResponse(suggestions));
    }

    //메뉴 : 회고 쓰기 > 가장 하단 저장 Btn Click 시 실행되는 GPT 피드백 생성
    @PostMapping("/diary-feedback")
    public ResponseEntity<GptFeedbackResponse> generateFeedback(@RequestBody GptFeedbackRequest request) {
        String result = gptService.getDiaryFeedback(request.getContent(), request.getFeedbackType());
        return ResponseEntity.ok(new GptFeedbackResponse(result));
    }

    //추후 다시 개선 - UserHomePage(Summry)에서 회고요약 버튼 누르면 회고요약 기능이 실행
    @PostMapping("/summary-feedback")
    public Map<String, String> generateFeedback(@AuthenticationPrincipal MemberDetails member) {
        String feedback = gptService.generateFeedback(member.getMember());
        return Map.of("feedback", feedback);
    }



}

