package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.galaxy.dto.ClassDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface ClassMapper {

    int selectCount(SearchDto dto) throws Exception;
    
    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    int updateClass(Map<String, Object> params) throws Exception;

    Map<String, Object> classRead(Map<String, Object> params) throws Exception;

    int insertClass(ClassDto classDto) throws Exception;

    int confirmClass(String  seq) throws Exception;

    int cancelClass(String seq) throws Exception;

    void callSetTimetable(String seq) throws Exception;

    List<Map<String, Object>> selectUseList() throws Exception;

    Map<String, Object> selectClassInfo(@Param("classSeq") int classSeq) throws Exception;
}
