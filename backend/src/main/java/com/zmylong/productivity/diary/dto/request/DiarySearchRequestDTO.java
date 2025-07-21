package com.zmylong.productivity.diary.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
public class DiarySearchRequestDTO {
    private String query;
    private List<String> fields;
    private Long memberId;
    private Map<String, Integer> emotionMap;
    private Map<String, LocalDate> diaryDateMap;
}
