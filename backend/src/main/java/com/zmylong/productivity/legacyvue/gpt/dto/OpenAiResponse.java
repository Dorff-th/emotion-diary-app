package com.zmylong.productivity.legacyvue.gpt.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpenAiResponse {

    private String model;             // 예: "gpt-4o"
    private String text;              // 응답 텍스트
    private Usage usage;              // 토큰 사용량 정보

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Usage {
        private int promptTokens;
        private int completionTokens;
    }
}

