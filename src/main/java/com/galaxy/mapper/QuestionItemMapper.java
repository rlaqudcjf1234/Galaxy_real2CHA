package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.QuestionItemDto;

@Mapper
public interface QuestionItemMapper {

    void insertOne(QuestionItemDto dto)throws Exception;

    List<Map<String, Object>> selectList(String seq)throws Exception;

    void deleteList(String seq)throws Exception;

}
