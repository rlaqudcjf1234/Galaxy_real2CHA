package com.galaxy.service;

import com.galaxy.dto.AftercareDto;
import java.util.Map;

public interface AftercareService {

    // (신규) 학생SEQ로 반(강의)의 관리자 adminSeq 가져오기
    int findClassAdminSeq(int studentSeq) throws Exception;

    // AFTERCARE 생성
    int createAftercare(Map<String, Object> param) throws Exception;

    // AFTERCARE 수정
    int updateAftercare(Map<String, Object> param) throws Exception;

    // AFTERCARE 조회
    AftercareDto getAftercare(int studentSeq) throws Exception;
}
