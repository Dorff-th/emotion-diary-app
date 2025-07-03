package com.zmylong.productivity.dailylog.entity;

import com.zmylong.productivity.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "daily_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int mood;

    @Column(columnDefinition = "TEXT")
    private String habits; // JSON 문자열로 저장

    @Column(columnDefinition = "TEXT")
    private String feedback;

    private LocalDateTime createdAt;

    @Column(columnDefinition = "TEXT")
    private String reflection;  // 회고 일기/메모

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

}

