package com.galaxy.mapper;

import com.galaxy.dto.AftercareDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

@Mapper
public interface AftercareMapper {

    // (신규) 학생SEQ로 CLASS.ADMIN_SEQ 찾기
    int selectClassAdminSeq(@Param("studentSeq") int studentSeq) throws Exception;

    // AFTERCARE 조회 (조인 결과를 DTO로)
    AftercareDto selectAftercareDto(@Param("studentSeq") int studentSeq) throws Exception;

    // AFTERCARE 생성
    int insertAftercare(Map<String, Object> param) throws Exception;

    // AFTERCARE 수정
    int updateAftercare(Map<String, Object> param) throws Exception;
}
