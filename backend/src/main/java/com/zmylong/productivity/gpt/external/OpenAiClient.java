package com.zmylong.productivity.gpt.external;

import com.fasterxml.jackson.databind.JsonNode;
import com.zmylong.productivity.gpt.dto.OpenAiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OpenAiClient {

    private final RestTemplate restTemplate;

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    public OpenAiResponse chat(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "model", "gpt-4o",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<JsonNode> response = restTemplate.exchange(
                OPENAI_URL, HttpMethod.POST, entity, JsonNode.class
        );

        JsonNode json = response.getBody();
        String reply = json.at("/choices/0/message/content").asText();
        int promptTokens = json.at("/usage/prompt_tokens").asInt();
        int completionTokens = json.at("/usage/completion_tokens").asInt();
        String model = json.get("model").asText();

        return OpenAiResponse.builder()
                .model(model)
                .text(reply)
                .usage(OpenAiResponse.Usage.builder()
                        .promptTokens(promptTokens)
                        .completionTokens(completionTokens)
                        .build())
                .build();
    }
}

