package com.zmylong.productivity.diary.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "gpt_summary")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GptSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;

    private LocalDate diaryDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_entry_id", nullable = true, unique = true)
    private DiaryEntry diaryEntry; // nullable

    @Column(columnDefinition = "TEXT")
    private String summary;
}
