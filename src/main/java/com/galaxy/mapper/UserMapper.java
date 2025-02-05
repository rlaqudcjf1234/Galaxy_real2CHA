package com.galaxy.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.UserDto;

@Mapper
public interface UserMapper {

    int selectUse(UserDto dto)throws Exception;

    Map<String, Object> selectOne(UserDto dto)throws Exception;

}
