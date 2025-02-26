package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.CalendarDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SeqDto;

public interface CalendarService {

    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> stdCalenList(SearchDto dto) throws Exception;

    List<Map<String, Object>> calendarList(SearchDto dto) throws Exception;

    List<Map<String, Object>> calendarread(SeqDto dto);

    List<Map<String, Object>> classStudentList(String room) throws Exception;


}
