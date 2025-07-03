package com.zmylong.productivity.dailylog.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DailyLogRequest {
    private int mood;
    private List<String> habits;
    private String reflection; // ⬅ 회고 내용 추가
}
