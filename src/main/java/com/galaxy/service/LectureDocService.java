package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.LectureDocDto;
import com.galaxy.dto.SearchDto;


public interface LectureDocService {

    int selectCount(LectureDocDto dto)throws Exception;
    
    List<Map<String, Object>> selectList(LectureDocDto dto) throws Exception;

    Map<String, Object> selectOne(String seq);

    int insertDoc(LectureDocDto dto) throws Exception;
}
