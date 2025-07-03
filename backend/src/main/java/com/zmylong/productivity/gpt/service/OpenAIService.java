package com.zmylong.productivity.gpt.service;

import com.zmylong.productivity.dailylog.dto.DailyLogDto;
import com.zmylong.productivity.gpt.entity.GptSummaryLog;
import com.zmylong.productivity.gpt.repository.GptSummaryLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Log4j2
@RequiredArgsConstructor
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    private final GptSummaryLogRepository logRepository;

    public String getFeedback(int mood, List<String> habits, String reflection) {
        // 1. 사용자 입력 가공
//        String userMessage = "오늘 기분은 " + mood + "점이고, 실천한 습관은 " +
//                String.join(", ", habits) + "입니다. 위 내용을 기반으로 감정 코멘트를 2~3문장 정도 주세요.";

        // 1. 사용자 메시지 구성
        String userMessage = String.format(
                "오늘 기분은 %d점이고, 실천한 습관은 %s입니다. 회고 내용은 다음과 같습니다:\n\"%s\"\n이 내용을 기반으로 감정 기반 피드백을 따뜻하게 2~3문장 작성해주세요.",
                mood,
                String.join(", ", habits),
                reflection == null || reflection.isBlank() ? "(회고 없음)" : reflection.trim()
        );

        // 2. 메시지 구성
        Map<String, Object> request = new HashMap<>();
        request.put("model", "gpt-4o"); // 필요시 gpt-3.5-turbo 로 변경

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", "너는 감정 기반 습관 코치야. 사용자가 기분과 실천 습관을 기록하면 따뜻하고 공감가는 코멘트를 2~3문장으로 응답해."));
        messages.add(Map.of("role", "user", "content", userMessage));
        request.put("messages", messages);

        // 3. 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        // 4. 요청 전송
        ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, entity, Map.class);

        // 5. 응답 추출
        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
        return (String) message.get("content");
    }

    public String summarizeDailyLogs(List<DailyLogDto> logs, LocalDate date) {

        // 1. 캐시 존재 여부 확인
        Optional<GptSummaryLog> cached = logRepository.findBySummaryDate(date);

        if (cached.isPresent()) {
            log.info("캐시 존재가 합니다! ");
            return cached.get().getSummaryText();
        }

        StringBuilder combined = new StringBuilder();
        for (DailyLogDto log : logs) {
            combined.append(String.format("- 감정: %d점, 습관: %s\n회고: %s\n\n",
                    log.getMood(), log.getHabits(), log.getReflection()));
        }

        List<Map<String, String>> messages = List.of(
                Map.of("role", "system", "content", "너는 감정 기반 습관 코치야. 사용자의 하루 기록을 따뜻하게 요약해줘."),
                Map.of("role", "user", "content", "다음은 하루 동안의 감정/습관/회고 기록이야:\n\n" + combined.toString() +
                        "\n이걸 바탕으로 하루를 2~3문장으로 요약해줘. 위로와 응원의 말도 포함해줘.")
        );

        Map<String, Object> body = Map.of(
                "model", "gpt-4o",
                "messages", messages
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, entity, Map.class);

        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
        //return (String) ((Map) choices.get(0).get("message")).get("content");


        String summary = (String) ((Map<?, ?>) choices.get(0).get("message")).get("content");

        // 대략적인 토큰 수 추정 (텍스트 길이 / 4 기준)
        int estimatedTokens = estimateTokenCount(combined.toString() + summary);

        // 로그 DB 저장
        GptSummaryLog log = GptSummaryLog.builder()
                .summaryDate(date)
                .model("gpt-4o")
                .tokensUsed(estimatedTokens)
                .summaryText(summary)
                .createdAt(LocalDateTime.now())
                .build();

        logRepository.save(log);

        return summary;
    }

    // 토큰 수 간단 추정 (입력+출력 텍스트 길이 / 4)
    private int estimateTokenCount(String text) {
        return text.length() / 4;
    }



}
