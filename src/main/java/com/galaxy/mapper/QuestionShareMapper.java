package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.QuestionShareDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface QuestionShareMapper {

    int selectCount(SearchDto dto)throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto)throws Exception;

    int insertOne(QuestionShareDto dto)throws Exception;
    
    int deleteOne(QuestionShareDto dto)throws Exception;

}
