package com.zmylong.productivity.controller;

import com.zmylong.productivity.gpt.entity.GptCallLog;
import com.zmylong.productivity.member.entity.Member;
import com.zmylong.productivity.member.entity.Role;
import com.zmylong.productivity.gpt.repository.GptCallLogRepository;
import com.zmylong.productivity.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@AutoConfigureMockMvc
@SpringBootTest
@WithMockUser(username = "admin", roles = "ADMIN") // ADMIN 권한으로 설정
class AdminGptControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GptCallLogRepository gptCallLogRepository;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        gptCallLogRepository.deleteAll();

        Member admin = memberRepository.save(
                Member.builder()
                        .username("admin3")
                        .password("1234") // 암호화된 값
                        .role(Role.ADMIN)
                        .build()
        );

        // 테스트용 GPT 호출 로그 2건 삽입 (2025-06-20 기준)
        gptCallLogRepository.saveAll(List.of(
                GptCallLog.builder()
                        .member(admin)
                        .model("gpt-4o")
                        .promptTokens(100)
                        .completionTokens(200)
                        .totalTokens(300)
                        .cost(0.015)
                        .calledAt(LocalDateTime.of(2025, 6, 20, 10, 0))
                        .build(),

                GptCallLog.builder()
                        .member(admin)
                        .model("gpt-4o")
                        .promptTokens(50)
                        .completionTokens(150)
                        .totalTokens(200)
                        .cost(0.01)
                        .calledAt(LocalDateTime.of(2025, 6, 20, 11, 0))
                        .build()
        ));
    }


    void shouldReturnUsageStatsForGivenPeriod() throws Exception {
        mockMvc.perform(get("/api/admin/openai/usage")
                        .param("start", "2025-06-19")
                        .param("end", "2025-06-21")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].date").value("2025-06-20"))
                .andExpect(jsonPath("$[0].callCount").value(2))
                .andExpect(jsonPath("$[0].totalCost").value(0.025));
    }
}
