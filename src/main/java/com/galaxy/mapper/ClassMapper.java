package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.ClassDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface ClassMapper {

    int selectCount(SearchDto dto) throws Exception;
    
    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    int updateClass(Map<String, Object> params) throws Exception;

    Map<String, Object> classRead(Map<String, Object> params);

    int insertClass(ClassDto classDto) throws Exception;

    int confirmClass(Long  seq);

    int cancelClass(Long seq);

    void callSetTimetable(Long seq);

    List<Map<String, Object>> selectUseList();


}
