package com.galaxy.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SurveyDto;
import com.galaxy.service.SurveyService;

@RestController
@RequestMapping(value = "/survey")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @GetMapping("/list")
    public ListDto list(SearchDto dto) throws Exception {

        int count = surveyService.selectCount(dto);
        List<Map<String, Object>> list = surveyService.selectList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }

    @GetMapping("/read")
    public Map<String, Object> read(SurveyDto dto) throws Exception {
        Map<String, Object> map = surveyService.selectOne(dto);

        return map;
    }



}
