package com.galaxy.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface StudentMapper {

    // 전체 학생 수 조회 (검색 조건 적용)
    int selectCount(@Param("text") String text) throws Exception;

    // 학생 목록 조회 (검색 및 페이징 적용)
    List<Map<String, Object>> selectList(@Param("text") String text,
                                         @Param("offset") int offset,
                                         @Param("pageSize") int pageSize) throws Exception;

    // 특정 학생 상세 조회
    Map<String, Object> studentRead(@Param("seq") int seq) throws Exception;
}
