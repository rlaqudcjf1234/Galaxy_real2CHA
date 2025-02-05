package com.galaxy.service;

import java.util.Map;

import com.galaxy.dto.UserDto;

public interface UserService {

    Map<String, Object> selectOne(UserDto dto)throws Exception;

}
