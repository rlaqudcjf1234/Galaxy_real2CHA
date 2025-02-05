package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.SearchDto;

@Mapper
public interface LectureDocumMapper {
      
    List<Map<String, Object>> documentList(SearchDto dto) throws Exception;

    int selectCount(SearchDto dto)throws Exception;
    
    
  
}
