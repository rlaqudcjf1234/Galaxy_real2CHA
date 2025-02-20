package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.QuestionDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface QuestionMapper {

    int selectCount(SearchDto dto)throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto)throws Exception;

    int insertOne(QuestionDto dto)throws Exception;

    Map<String, Object> selectOne(String seq)throws Exception;

    int updateOne(QuestionDto dto)throws Exception;

}
