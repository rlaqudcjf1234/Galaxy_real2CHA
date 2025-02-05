package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.LectureDto;
import com.galaxy.dto.SearchDto;


public interface LectureService {
    int selectCount(SearchDto dto) throws Exception;

    List<Map<String,Object>> selectNameList(SearchDto dto) throws Exception;
    
    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;
    
    int insertLecture(LectureDto dto) throws Exception;

    Map<String, Object> getLectureRead(String seq);

    Long updateLecture(LectureDto dto) throws Exception;
    
    Long deleteLecture(Long seq) throws Exception;
}
