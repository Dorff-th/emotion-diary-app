package com.zmylong.productivity.legacyvue.gpt.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "gpt_summary_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GptSummaryLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate summaryDate;

    private String model;

    private Integer tokensUsed;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String summaryText;

    private LocalDateTime createdAt;
}

