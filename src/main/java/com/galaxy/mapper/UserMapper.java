package com.galaxy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.UserDto;

@Mapper
public interface UserMapper {
    
    UserDto selectUseOne(String email)throws Exception;

}
