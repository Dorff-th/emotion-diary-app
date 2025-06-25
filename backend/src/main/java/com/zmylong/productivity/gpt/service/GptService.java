package com.zmylong.productivity.gpt.service;

import com.zmylong.productivity.gpt.dto.OpenAiResponse;
import com.zmylong.productivity.gpt.entity.GptCallLog;
import com.zmylong.productivity.member.entity.Member;
import com.zmylong.productivity.gpt.repository.GptCallLogRepository;
import com.zmylong.productivity.member.repository.MemberRepository;
import com.zmylong.productivity.common.util.JwtTokenProvider;
import com.zmylong.productivity.gpt.external.OpenAiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class GptService {

    private final GptCallLogRepository gptCallLogRepository;
    private final JwtTokenProvider jwtTokenProvider; // 사용자 식별용
    private final MemberRepository memberRepository;
    private final OpenAiClient openAiClient;

    public String callGpt(String prompt, Member member) {
        // ✅ GPT API 호출 (예시)
        OpenAiResponse response = openAiClient.chat(prompt);

        int promptTokens = response.getUsage().getPromptTokens();
        int completionTokens = response.getUsage().getCompletionTokens();
        int totalTokens = promptTokens + completionTokens;

        // ✅ 비용 계산 (예시: GPT-4o 기준 $0.005 per 1K input/output token)
        double cost = (promptTokens * 0.005 + completionTokens * 0.015) / 1000.0;

        // ✅ 로그 저장
        GptCallLog log = GptCallLog.builder()
                .member(member)
                .model(response.getModel()) // 예: gpt-4o
                .promptTokens(promptTokens)
                .completionTokens(completionTokens)
                .totalTokens(totalTokens)
                .cost(cost)
                .calledAt(LocalDateTime.now())
                .build();

        gptCallLogRepository.save(log);

        // ✅ 응답 반환
        return response.getText();
    }
}

