package com.zmylong.productivity.diary.service.search;

import com.zmylong.productivity.diary.dto.request.DiarySearchRequestDTO;
import com.zmylong.productivity.diary.dto.response.DiarySearchResultDTO;
import com.zmylong.productivity.diary.repository.search.DiaryEntrySearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiarySearchServiceImpl implements DiarySearchService {

    private final DiaryEntrySearchRepository diaryEntrySearchRepository;

    @Override
    public Page<DiarySearchResultDTO> search(DiarySearchRequestDTO request, Pageable pageable) {

        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "diaryDate")
        );

        String query = request.getQuery();
        List<String> fields = request.getFields();
        Long memberId = request.getMemberId();

        Map<String, Integer> emotionMap = request.getEmotionMap();
        Map<String, LocalDate> diaryDateMap = request.getDiaryDateMap();

        return diaryEntrySearchRepository.searchDiaries(query, fields, memberId, emotionMap, diaryDateMap, sortedPageable);
    }
}
