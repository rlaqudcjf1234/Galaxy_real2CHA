package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.SearchDto;
import com.galaxy.dto.TimetableDto;
import com.galaxy.mapper.TimeTableMapper;
import com.galaxy.service.TimeTableService;

@Service
public class TimeTableServiceimpl implements TimeTableService {
    protected final String table_nm = "timetable";

    @Autowired
    TimeTableMapper timeTableMapper;

    public int selectCount(SearchDto dto) throws Exception {
        return timeTableMapper.selectCount(dto);
    }

    public List<Map<String, Object>> tablelist(SearchDto dto) throws Exception {
        return timeTableMapper.tablelist(dto);
    }

    public Map<String, Object> calendarDay(String seq) throws Exception {
        return timeTableMapper.calendarDay(seq);
    }

    public int statusMod(TimetableDto dto) throws Exception {
        return timeTableMapper.statusMod(dto);
    }

}
