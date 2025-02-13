package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.LectureDocDto;

public interface LectureDocService {

    int selectCount(LectureDocDto dto)throws Exception;

    List<Map<String, Object>> selectList(LectureDocDto dto)throws Exception;

    int insertOne(LectureDocDto dto)throws Exception;

    Map<String, Object> selectOne(String seq)throws Exception;

    void updateOne(LectureDocDto dto)throws Exception;
}
