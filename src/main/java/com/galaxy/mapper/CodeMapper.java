package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CodeMapper {

    List<Map<String, Object>> selectUseCode(int code_id) throws Exception;

}