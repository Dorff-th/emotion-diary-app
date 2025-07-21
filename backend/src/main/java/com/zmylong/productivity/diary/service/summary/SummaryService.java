package com.zmylong.productivity.diary.service.summary;

import com.zmylong.productivity.diary.dto.response.GPTSummaryResponseDTO;
import com.zmylong.productivity.diary.dto.response.SummaryResponseDTO;
import com.zmylong.productivity.member.entity.Member;

public interface SummaryService {
    
    // 사용자의 오늘의 회고 요약인데 지금은 오늘의 회고중 최신 데이터 1개만 가져옴 (메소드 명에 혼동 주의!)
    SummaryResponseDTO getTodaySummary(Member member);

    //오늘 날짜의 GPT 회고 요약만 가져오기
    GPTSummaryResponseDTO getTodayGPTSummary(Long memberId);
}
