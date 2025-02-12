package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.LectureDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.LectureMapper;
import com.galaxy.service.LectureService;

@Service
public class LectureServicelmpl implements LectureService {

    protected final String table_nm = "lecture";

    @Autowired
    LectureMapper lectureMapper;

    @Override
    public int selectCount(SearchDto dto) throws Exception {
        return lectureMapper.selectCount(dto);
    }

    @Override
    public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
        return lectureMapper.selectList(dto);
    }

    @Override
    public List<Map<String, Object>> selectNameList(SearchDto dto) throws Exception {
        System.out
                .println("=== Service: selectNameList ===");
        System.out
                .println("Input SearchDto: " + dto.toString());

        try {
            List<Map<String, Object>> result = lectureMapper.selectNameList(dto);
            System.out
                    .println("Query result: " + result);
            return result;
        } catch (Exception e) {
            System.out
                    .println("=== Service Error ===");
            System.out
                    .println("Error message: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public int insertLecture(LectureDto dto) throws Exception {
        dto.setTable_nm(table_nm);
        return lectureMapper.insertLecture(dto);
    }

    @Override
    public Map<String, Object> getLectureRead(String seq) {
        return lectureMapper.selectLectureRead(seq);
    }

    @Override
    public Long updateLecture(LectureDto dto) throws Exception {
        return lectureMapper.updateLecture(dto);
    }

    @Override
    public Long deleteLecture(Long seq) throws Exception {
        return lectureMapper.deleteLecture(seq);
    }

    @Override
    public List<Map<String, Object>> selectLectureList() throws Exception {
        return lectureMapper.selectLectureList();
    }
}
