package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.LectureDocDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface LectureDocMapper {

    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    int insertOne(LectureDocDto dto) throws Exception;

    Map<String, Object> selectOne(String seq) throws Exception;

    void updateOne(LectureDocDto dto) throws Exception;

}
