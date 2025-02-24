package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.QuestionShareDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.QuestionShareMapper;
import com.galaxy.service.QuestionShareService;

@Service
public class QuestionShareServiceImpl implements QuestionShareService{

    @Autowired
    QuestionShareMapper questionShareMapper;

    @Override
    public int selectCount(SearchDto dto) throws Exception {
        return questionShareMapper.selectCount(dto);
    }

    @Override
    public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
        return questionShareMapper.selectList(dto);
    }

    @Override
    public int insertOne(QuestionShareDto dto) throws Exception {
        return questionShareMapper.insertOne(dto);
    }

    @Override
    public int deleteOne(QuestionShareDto dto) throws Exception {
        return questionShareMapper.deleteOne(dto);
    }

}
