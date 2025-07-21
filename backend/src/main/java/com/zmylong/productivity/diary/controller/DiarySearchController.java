package com.zmylong.productivity.diary.controller;

import com.zmylong.productivity.diary.dto.request.DiarySearchRequestDTO;
import com.zmylong.productivity.diary.dto.response.DiarySearchResultDTO;
import com.zmylong.productivity.diary.service.search.DiarySearchService;
import com.zmylong.productivity.member.security.MemberDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class DiarySearchController {

    private final DiarySearchService diarySearchService;


    //상단 Header 검색 입력하고 나오는 결과 또는 검색결과 페이지에서 검색 Btn Click
    @PostMapping("/diaries/search")
    public Page<DiarySearchResultDTO> search(@AuthenticationPrincipal MemberDetails memberDetails,
                                             @RequestBody DiarySearchRequestDTO request, Pageable pageable) {

        Long memberId = memberDetails.getId();
        request.setMemberId(memberId);

        log.info(request.toString());

        return diarySearchService.search(request, pageable);
    }
}
