package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.ClassDto;
import com.galaxy.dto.SearchDto;

public interface ClassService {


    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    int insertClass(ClassDto dto) throws Exception;

    Map<String, Object> getClassRead(String seq) throws Exception;
    
    void confirmClass(String seq) throws Exception;

    void cancelClass(String seq) throws Exception;

    void updateClass(Map<String, Object> params) throws Exception;

    void setTimetable(String seq) throws Exception;

    List<Map<String, Object>> selectUseList() throws Exception;

    Map<String, Object> getClassInfo(int classSeq) throws Exception;
}