package com.galaxy.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

@Mapper
public interface StudentMapper {
    int selectCount(@Param("text") String text,
                    @Param("select") String select,
                    @Param("classSeq") String classSeq,
                    @Param("lectureSeq") String lectureSeq,
                    @Param("round") String round) throws Exception;

    List<Map<String, Object>> selectList(@Param("text") String text,
                                         @Param("select") String select,
                                         @Param("classSeq") String classSeq,
                                         @Param("lectureSeq") String lectureSeq,
                                         @Param("round") String round,
                                         @Param("offset") int offset,
                                         @Param("pageSize") int pageSize) throws Exception;

    Map<String, Object> studentRead(@Param("seq") int seq) throws Exception;
}
