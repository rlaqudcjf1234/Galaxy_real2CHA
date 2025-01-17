package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.AdcSearchDto;

@Mapper
public interface AdcListMapper {
    
    // 전체 게시글 수 조회
    int selectCount(AdcSearchDto searchDto) throws Exception;
    
    // 게시글 목록 조회
    List<Map<String, Object>> selectList(AdcSearchDto searchDto) throws Exception;

    void insertPost(Map<String, Object> params) throws Exception;
    
}