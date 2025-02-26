package com.galaxy.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SurveyDto;

@Mapper
public interface SurveyMapper {

    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    Map<String, Object> selectOne(SurveyDto dto) throws Exception;

}
