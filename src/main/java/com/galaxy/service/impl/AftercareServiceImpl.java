package com.galaxy.service.impl;

import com.galaxy.dto.AftercareDto;
import com.galaxy.mapper.AftercareMapper;
import com.galaxy.service.AftercareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AftercareServiceImpl implements AftercareService {

    @Autowired
    private AftercareMapper aftercareMapper;

    // (신규) 학생이 듣는 반(강의)의 admin_seq 찾기
    @Override
    public int findClassAdminSeq(int studentSeq) throws Exception {
        return aftercareMapper.selectClassAdminSeq(studentSeq);
    }

    @Override
    public int createAftercare(Map<String, Object> param) throws Exception {
        return aftercareMapper.insertAftercare(param);
    }

    @Override
    public int updateAftercare(Map<String, Object> param) throws Exception {
        return aftercareMapper.updateAftercare(param);
    }

    @Override
    public AftercareDto getAftercare(int studentSeq) throws Exception {
        return aftercareMapper.selectAftercareDto(studentSeq);
    }

}
