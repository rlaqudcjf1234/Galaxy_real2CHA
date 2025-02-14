package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.LectureDocDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.LectureDocMapper;
import com.galaxy.service.LectureDocService;

@Service
public class LectureDocServiceImpl implements LectureDocService {

    protected final String table_nm = "lecture_document";

    @Autowired
    LectureDocMapper lectureDocMapper;

    @Override
    public int selectCount(LectureDocDto dto) throws Exception {
        return lectureDocMapper.selectCount(dto);
    }

    @Override
    public List<Map<String, Object>> selectList(LectureDocDto dto) throws Exception {
        return lectureDocMapper.selectList(dto);
    }

	@Override
	public int insertOne(LectureDocDto dto) throws Exception {
		dto.setTable_nm(table_nm);
		return lectureDocMapper.insertOne(dto);
	}

    @Override
    public Map<String, Object> selectOne(String seq) throws Exception {
        return lectureDocMapper.selectOne(seq);
    }

    @Override
    public void updateOne(LectureDocDto dto) throws Exception {
        // TODO Auto-generated method stub
        lectureDocMapper.updateOne(dto);
    }
}
