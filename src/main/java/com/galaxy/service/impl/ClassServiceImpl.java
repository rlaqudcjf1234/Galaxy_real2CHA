package com.galaxy.service.impl;

import java.util.HashMap;
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
        try {
            // 페이징된 목록 조회
            List<Map<String, Object>> list = classMapper.selectList(dto);

            return list;
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("강의 목록 조회 중 오류가 발생했습니다.");
        }
    }

    @Override
    public int selectCount(SearchDto dto) throws Exception {
        return classMapper.selectCount(dto);
    }

    @Override
    @Transactional
    public int insertClass(ClassDto dto) throws Exception {
        dto.setTable_nm(table_nm);
        // 1. 먼저 insert 실행
        int result = classMapper.insertClass(dto);

        // 2. insert 성공 후 생성된 seq로 시간표 설정
        if (result > 0) {
            setTimetable(dto.getSeq()); // SeqDto에서 상속받은 getSeq() 사용
        }

        return result;
    }

    @Override
    public Map<String, Object> getClassRead(String seq) throws Exception {
        try {
            Map<String, Object> params = new HashMap<>();
            params.put("seq", seq); // map에 seq 값 담기

            Map<String, Object> result = classMapper.classRead(params);

            return result;
        } catch (Exception e) {
            throw new Exception("강의 상세 조회 중 오류가 발생했습니다.");
        }
    }

    @Override
    @Transactional
    public void confirmClass(String seq) throws Exception { // int를 Long으로 변경
        try {
            System.out.println("Confirming class with seq: " + seq);
            int result = classMapper.confirmClass(seq);
            System.out.println("Update result: " + result);

            if (result == 0) {
                throw new Exception("업데이트된 행이 없습니다.");
            }

            // 확정 성공 후 시간표 설정
            setTimetable(seq);

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    @Transactional
    public void cancelClass(String seq) throws Exception { // int를 Long으로 변경
        try {
            classMapper.cancelClass(seq);

            // 취소 성공 후 시간표 설정
            setTimetable(seq);

        } catch (Exception e) {
            throw new Exception("강의 확정 취소 중 오류가 발생했습니다.");
        }
    }

    @Override
    @Transactional
    public void updateClass(Map<String, Object> params) throws Exception {
        try {
            classMapper.updateClass(params);

            // params에서 seq 값을 가져와서 Long으로 변환
            if (params.containsKey("seq")) {
                String seq = (String) params.get("seq");
                // 시간표 설정
                setTimetable(seq);
            }
        } catch (Exception e) {
            throw new Exception("강의 수정 중 오류가 발생했습니다.");
        }
    }

    @Override
    @Transactional
    public void setTimetable(String seq) throws Exception {
        try {
            System.out.println("Setting timetable for class seq: " + seq);
            classMapper.callSetTimetable(seq);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("시간표 설정 중 오류가 발생했습니다.");
        }
    } // setTimetable 메소드 닫기

    public List<Map<String, Object>> selectUseList() throws Exception {
        return classMapper.selectUseList();
    }

    @Override
    public Map<String, Object> getClassInfo(int classSeq) throws Exception {
        return classMapper.selectClassInfo(classSeq);
    }

}
