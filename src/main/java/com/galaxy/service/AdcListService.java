// src/main/java/com/galaxy/service/AdcListService.java
package com.galaxy.service;

import com.galaxy.dto.AdcListDto;
import com.galaxy.dto.AdcPostDto;
import com.galaxy.dto.AdcSearchDto;

public interface AdcListService {
    // 게시글 목록을 조회하는 메서드를 정의합니다.
    AdcListDto selectList(AdcSearchDto searchDto) throws Exception;

    void addPost(AdcPostDto postDto) throws Exception;

    AdcListDto.AdcItem selectPost(Long seq) throws Exception;
}
