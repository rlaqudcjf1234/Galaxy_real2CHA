package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.QuestionShareDto;
import com.galaxy.dto.SearchDto;

public interface QuestionShareService {

    int selectCount(SearchDto dto)throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto)throws Exception;

    int insertOne(QuestionShareDto dto)throws Exception;

    int deleteOne(QuestionShareDto dto)throws Exception;

}
