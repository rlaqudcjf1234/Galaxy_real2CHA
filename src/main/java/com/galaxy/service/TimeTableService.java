package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.SearchDto;
import com.galaxy.dto.TimetableDto;

public interface TimeTableService {

    int selectCount(SearchDto dto)throws Exception;

    List<Map<String, Object>> tablelist(SearchDto dto)throws Exception;

    Map<String, Object> calendarDay(String seq) throws Exception;

    int statusMod(TimetableDto dto) throws Exception;
}
