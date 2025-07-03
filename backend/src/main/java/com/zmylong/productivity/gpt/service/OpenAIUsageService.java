package com.zmylong.productivity.gpt.service;

import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Map;

@Service
@Log4j2
public class OpenAIUsageService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String USAGE_URL = "https://api.openai.com/v1/dashboard/billing/usage";

    /**
     * 날짜 범위 기준 GPT 사용 요금 조회
     */
    public double getUsageInUSD(String startDate, String endDate) {
        String url = USAGE_URL + "?start_date=" + startDate + "&end_date=" + endDate;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            Map body = response.getBody();

            if (body != null && body.containsKey("total_usage")) {
                double cents = ((Number) body.get("total_usage")).doubleValue();
                return cents / 100.0; // convert to USD
            }

        } catch (Exception e) {
            log.error("💥 GPT 요금 조회 실패: {}", e.getMessage());
        }

        return 0.0;
    }

    /**
     * 오늘 및 지난 7일간 사용량 요약 출력
     */
    public void printUsageSummary() {
        String today = LocalDate.now().toString();
        String weekAgo = LocalDate.now().minusDays(7).toString();

        double weekUsage = getUsageInUSD(weekAgo, today);
        double todayUsage = getUsageInUSD(today, today);

        log.info("📊 OpenAI 요금 요약");
        log.info("🔎 지난 7일간 요금: ${}", String.format("%.4f", weekUsage));
        log.info("📅 오늘 요금: ${}", String.format("%.4f", todayUsage));
    }
}
