package com.galaxy.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.UserDto;
import com.galaxy.mapper.UserMapper;
import com.galaxy.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public Map<String, Object> selectOne(UserDto dto) throws Exception {
        // TODO Auto-generated method stub
        return userMapper.selectOne(dto);
    }

}