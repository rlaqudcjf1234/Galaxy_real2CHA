package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.LectureDocumMapper;
import com.galaxy.service.LectureDocumService;

@Service
public class LectureDocumServiceImpl implements LectureDocumService {

    protected final String table_nm = "lecture_document";

    @Autowired
    LectureDocumMapper lectureDocumMapper;

    @Override
    public int selectCount(SearchDto dto) throws Exception {
        return lectureDocumMapper.selectCount(dto);
    }

    @Override
    public List<Map<String, Object>> documentList(SearchDto dto) throws Exception {
        return lectureDocumMapper.documentList(dto);
    }
}
