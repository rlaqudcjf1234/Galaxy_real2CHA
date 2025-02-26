package com.galaxy.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import com.galaxy.dto.SurveyDto;

@Mapper
public interface SurveyItemMapper {

    List<Map<String, Object>> selectList(SurveyDto dto) throws Exception;

}
