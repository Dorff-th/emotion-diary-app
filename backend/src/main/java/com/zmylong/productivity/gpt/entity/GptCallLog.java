package com.zmylong.productivity.gpt.entity;

import com.zmylong.productivity.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "gpt_call_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GptCallLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String model;                // e.g. gpt-4o, gpt-3.5-turbo
    private int promptTokens;           // 입력 토큰 수
    private int completionTokens;       // 출력 토큰 수
    private int totalTokens;            // 총 토큰 수

    private double cost;                // 예상 요금 (달러)

    private LocalDateTime calledAt;     // 호출 시각
}

