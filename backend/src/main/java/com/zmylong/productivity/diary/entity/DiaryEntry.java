package com.zmylong.productivity.diary.entity;

import com.zmylong.productivity.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "diary_entry")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiaryEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //private Long memberId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private LocalDate diaryDate;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void setCreatedAtNow() {
        this.createdAt = LocalDateTime.now();
    }

    private Integer emotion;
    @Lob
    private String content;

    @Column(length = 255)
    private String feelingKo;

    @Column(length = 255)
    private String feelingEn;


    @Column(columnDefinition = "TEXT")
    private String habitTags; // 예: ["운동", "독서"]

    @Column(columnDefinition = "TEXT")
    private String feedback;    // 사용자가 입력한 회고를 GPT가 피드벡

    @OneToOne(mappedBy = "diaryEntry", fetch = FetchType.LAZY)
    private GptSummary gptSummary;      // 회고요약(하루에 1개)

}
