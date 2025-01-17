package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.StudentDto;

@Mapper
public interface StudentMapper {
    
    List<Map<String, Object>> stdList(StudentDto dto) throws Exception;
}
