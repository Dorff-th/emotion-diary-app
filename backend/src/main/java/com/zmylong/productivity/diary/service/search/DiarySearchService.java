package com.zmylong.productivity.diary.service.search;

import com.zmylong.productivity.diary.dto.request.DiarySearchRequestDTO;
import com.zmylong.productivity.diary.dto.response.DiarySearchResultDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DiarySearchService {
    Page<DiarySearchResultDTO> search(DiarySearchRequestDTO request, Pageable pageable);
}
