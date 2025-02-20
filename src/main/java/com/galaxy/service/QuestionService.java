package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.QuestionDto;
import com.galaxy.dto.SearchDto;

public interface QuestionService {

    int selectCount(SearchDto dto)throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto)throws Exception;

    void insertOne(QuestionDto dto)throws Exception;

    Map<String, Object> selectOne(String seq)throws Exception;

    void updateOne(QuestionDto dto)throws Exception;

}
