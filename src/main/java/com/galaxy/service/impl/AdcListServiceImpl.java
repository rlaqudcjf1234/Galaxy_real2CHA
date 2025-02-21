// src/main/java/com/galaxy/service/impl/AdcListServiceImpl.java
package com.galaxy.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.galaxy.dto.AdcListDto;
import com.galaxy.dto.AdcPostDto;
import com.galaxy.dto.AdcSearchDto;
import com.galaxy.mapper.AdcListMapper;
import com.galaxy.service.AdcListService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdcListServiceImpl implements AdcListService {

    // 생성자 주입을 위한 final 필드
    private final AdcListMapper adcListMapper;

    @Override
    public AdcListDto selectList(AdcSearchDto searchDto) throws Exception {
        // 페이징 처리를 위한 기본값 설정
        if (searchDto.getPageIndex() < 1) {
            searchDto.setPageIndex(1);
        }
        if (searchDto.getPageSize() < 1) {
            searchDto.setPageSize(10);
        }

        // 전체 게시글 수 조회
        int totalCount = adcListMapper.selectCount(searchDto);

        // 게시글 목록 조회 및 AdcItem 객체로 변환
        List<Map<String, Object>> rawList = adcListMapper.selectList(searchDto);
        List<AdcListDto.AdcItem> items = rawList.stream()
                .map(map -> {
                    AdcListDto.AdcItem item = new AdcListDto.AdcItem();
                    // null 체크를 포함한 안전한 값 설정
                    item.setSeq(map.get("SEQ") != null ? ((Number) map.get("SEQ")).longValue() : null);
                    item.setAdminSeq(map.get("ADMIN_SEQ") != null ? ((Number) map.get("ADMIN_SEQ")).longValue() : null);
                    item.setTitle((String) map.get("TITLE"));
                    item.setDivision((String) map.get("DIVISION"));
                    item.setDetail((String) map.get("DETAIL"));
                    item.setRegDt((String) map.get("REG_DT"));
                    return item;
                })
                .collect(Collectors.toList());

        // AdcListDto 객체 생성 및 반환
        return new AdcListDto(totalCount, items);
    }

    @Override
    @Transactional
    public void addPost(AdcPostDto postDto) throws Exception {
        // 입력값 검증
        validatePostData(postDto);

        // 현재 시간 설정
        LocalDateTime now = LocalDateTime.now();
        String formattedDate = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // Mapper에 전달할 데이터 준비
        Map<String, Object> params = new HashMap<>();
        params.put("adminSeq", postDto.getAdminSeq());
        params.put("title", postDto.getTitle());
        params.put("division", postDto.getDivision());
        params.put("detail", postDto.getDetail());
        params.put("regDt", formattedDate);

        // 데이터베이스에 저장
        adcListMapper.insertPost(params);
    }

    // 입력값 검증 메서드
    private void validatePostData(AdcPostDto postDto) {
        if (postDto.getTitle() == null || postDto.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("제목은 필수 입력 항목입니다.");
        }
        if (postDto.getAdminSeq() == null) {
            throw new IllegalArgumentException("작성자 정보는 필수 입력 항목입니다.");
        }

    }

    @Override
    public AdcListDto.AdcItem selectPost(Long seq) throws Exception {
        Map<String, Object> map = adcListMapper.selectPost(seq);
        AdcListDto.AdcItem item = new AdcListDto.AdcItem();

        item.setSeq(map.get("seq") != null ? ((Number) map.get("seq")).longValue() : null);
        item.setAdminSeq(map.get("adminSeq") != null ? ((Number) map.get("adminSeq")).longValue() : null);
        item.setTitle((String) map.get("title"));
        item.setDivision((String) map.get("division"));
        item.setDetail((String) map.get("detail"));
        item.setRegDt((String) map.get("regDt"));

        return item;
    }

    @Override
    public boolean deletePost(Long seq) throws Exception {
        int deletedCount = adcListMapper.deletePost(seq);
        return deletedCount > 0; // 삭제된 행이 있으면 true, 없으면 false 반환
    }
}