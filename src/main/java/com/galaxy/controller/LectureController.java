package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.LectureDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.LectureService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/lecture")
public class LectureController {

    @Autowired private LectureService lectureService;

    @GetMapping("/search")
    public LectureDto lectureDto(@Valid SearchDto dto)throws Exception {
        System
            .out
            .println("=== Search API Called ===");
        System
            .out
            .println("SearchDto: " + dto.toString()); // 받은 파라미터 확인

        try {
            System
                .out
                .println("Calling selectNameList...");
            List<Map<String, Object>> nameSearch = lectureService.selectNameList(dto);
            System
                .out
                .println("nameSearch result: " + nameSearch); // 결과 확인

            System
                .out
                .println("Calling selectAllList...");
            List<Map<String, Object>> allSearch = lectureService.selectAllList(dto);
            System
                .out
                .println("allSearch result: " + allSearch); // 결과 확인

            LectureDto lectureDto = new LectureDto();
            lectureDto.setNameSearchResults(nameSearch);
            lectureDto.setAllSearchResults(allSearch);

            return lectureDto;
        } catch (Exception e) {
            System
                .out
                .println("=== Error Occurred ===");
            System
                .out
                .println("Error message: " + e.getMessage());
            System
                .out
                .println("Error class: " + e.getClass().getName());
            e.printStackTrace();
            throw e;
        }

    }

    @GetMapping("/list")
    public ListDto list(SearchDto dto)throws Exception {

        int count = lectureService.selectCount(dto);
        List<Map<String, Object>> list = lectureService.selectList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody LectureDto dto)throws Exception {
        try {
            int result = lectureService.insertLecture(dto);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
        }
    }

    @GetMapping("/detail")
    public ResponseEntity<?> getLectureDetail(
        @RequestParam(name = "seq")String seq
    )throws Exception {
        try {
            Map<String, Object> lecture = lectureService.getLectureDetail(seq);
            if (lecture == null) {
                return ResponseEntity
                    .notFound()
                    .build();
            }
            return ResponseEntity.ok(lecture);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("강의 상세 정보 조회 중 오류가 발생했습니다.");
        }
    }
}