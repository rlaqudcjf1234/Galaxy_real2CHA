package com.galaxy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.AdcListDto;
import com.galaxy.dto.AdcPostDto;
import com.galaxy.dto.AdcSearchDto;
import com.galaxy.service.AdcListService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/adminCommunity")
@RequiredArgsConstructor
public class AdcListController {

    private final AdcListService adcListService;

    @GetMapping("/list")
    public AdcListDto getList(AdcSearchDto searchDto) throws Exception {
        return adcListService.selectList(searchDto);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPost(@RequestBody AdcPostDto postDto) {
        try {
            adcListService.addPost(postDto);
            return ResponseEntity.ok("게시글이 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}