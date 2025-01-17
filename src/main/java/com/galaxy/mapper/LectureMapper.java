package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.LectureDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface LectureMapper {

    int selectCount(SearchDto dto) throws Exception;
    
    List<Map<String,Object>> selectNameList(SearchDto dto) throws Exception;

    List<Map<String,Object>> selectAllList(SearchDto dto) throws Exception;

    int insertLecture(LectureDto dto) throws Exception;
    
    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    Map<String, Object> selectLectureDetail(String seq);
}
