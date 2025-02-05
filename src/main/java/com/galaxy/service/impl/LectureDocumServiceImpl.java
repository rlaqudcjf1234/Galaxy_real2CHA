package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.LecDocumentDto;
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

    @Override
    public Map<String, Object> documentRead(String seq) {

        return lectureDocumMapper.documentRead(seq);
    }

    @Override
    public int documentInsert(LecDocumentDto dto) throws Exception{
        dto.setTable_nm(table_nm);
        return lectureDocumMapper.documentInsert(dto);
    }
}
