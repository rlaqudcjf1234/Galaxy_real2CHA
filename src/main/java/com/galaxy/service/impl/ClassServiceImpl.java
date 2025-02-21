package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.galaxy.dto.ClassDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.ClassMapper;
import com.galaxy.service.ClassService;

@Service
public class ClassServiceImpl implements ClassService {

    protected final String table_nm = "class";

    @Autowired
    ClassMapper classMapper;

    @Override
    public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
        return classMapper.selectList(dto);
    }

    @Override
    public int selectCount(SearchDto dto) throws Exception {
        return classMapper.selectCount(dto);
    }

    @Override
    public int insertClass(ClassDto dto) throws Exception {
        dto.setTable_nm(table_nm);
        return classMapper.insertClass(dto);
    }

    @Override
    public Map<String, Object> getClassRead(int seq) throws Exception {
        try {
            return classMapper.classRead(seq);
        } catch (Exception e) {
            throw new Exception("강의 상세 조회 중 오류가 발생했습니다.");
        }
    }

    @Override
    @Transactional
    public void confirmClass(int seq) throws Exception {
        try {
            System.out.println("Confirming class with seq: " + seq); // 로그 추가
            int result = classMapper.confirmClass(seq);
            System.out.println("Update result: " + result); // 업데이트 결과 확인
            if (result == 0) {
                throw new Exception("업데이트된 행이 없습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    @Transactional
    public void cancelClass(int seq) throws Exception {
        try {
            classMapper.cancelClass(seq);
        } catch (Exception e) {
            throw new Exception("강의 확정 취소 중 오류가 발생했습니다.");
        }
    }

    @Override
    @Transactional
    public void updateClass(Map<String, Object> params) throws Exception {
        try {
            classMapper.updateClass(params);
        } catch (Exception e) {
            throw new Exception("강의 수정 중 오류가 발생했습니다.");
        }
    }

    @Override
    public List<Map<String, Object>> selectUseList() throws Exception {
        return classMapper.selectUseList();
    }

}
