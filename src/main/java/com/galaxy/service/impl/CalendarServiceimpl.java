package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.CalendarDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SeqDto;
import com.galaxy.mapper.CalendarMapper;
import com.galaxy.service.CalendarService;

@Service
public class CalendarServiceimpl implements CalendarService{

    protected final String table_nm="calendar";

    @Autowired 
    CalendarMapper calendarMapper;

    public int selectCount(SearchDto dto)throws Exception{
        return calendarMapper.selectCount(dto);
    }

    public List<Map<String, Object>> stdCalenList(SearchDto dto)throws Exception{
        return calendarMapper.stdCalenList(dto);
    }

    public List<Map<String, Object>> calendarList(SearchDto dto)throws Exception{
        return calendarMapper.calendarList(dto);
    }

    public List<Map<String, Object>> calendarread(SeqDto dto){
        return calendarMapper.calendarread(dto);
    }

    public  List<Map<String, Object>> classStudentList(String room) throws Exception{
        return calendarMapper.classStudentList(room);
    }


}
