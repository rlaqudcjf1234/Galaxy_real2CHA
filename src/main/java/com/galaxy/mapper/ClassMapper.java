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

    Map<String, Object> classRead(int seq) throws Exception;

    int insertClass(ClassDto classDto) throws Exception;

    int confirmClass(int seq) throws Exception;

    int cancelClass(int seq) throws Exception;

    List<Map<String, Object>> selectUseList() throws Exception;

    Map<String, Object> selectClassInfo(@Param("classSeq") int classSeq) throws Exception;
}
