package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.LectureDocumService;

@RestController
@RequestMapping(value = "/document")
public class LectureDocumController {

    @Autowired
    private LectureDocumService lectureDocumService;
    
    @GetMapping("/list")
    public ListDto list(SearchDto dto) throws Exception {

        int count = lectureDocumService.selectCount(dto);
        List<Map<String, Object>> list = lectureDocumService.documentList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }
}
