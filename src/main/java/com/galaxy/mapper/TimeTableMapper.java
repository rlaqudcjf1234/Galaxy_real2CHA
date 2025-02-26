package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.CalendarDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.TimetableDto;

@Mapper
public interface TimeTableMapper {

    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> tablelist(SearchDto dto) throws Exception;

    Map<String, Object> calendarDay(String seq) throws Exception;

    int statusMod(TimetableDto dto) throws Exception;
}
