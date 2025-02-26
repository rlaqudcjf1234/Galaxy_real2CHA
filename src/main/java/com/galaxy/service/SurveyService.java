package com.galaxy.service;

import java.util.List;
import java.util.Map;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SurveyDto;

public interface SurveyService {

    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    Map<String, Object> selectOne(SurveyDto dto) throws Exception;

}
