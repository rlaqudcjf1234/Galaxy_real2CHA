package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.LecDocumentDto;
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

    @GetMapping("/read")
    public ResponseEntity<?> getLectureRead(
            @RequestParam(name = "seq") String seq) throws Exception {
        try {
            Map<String, Object> lecture = lectureDocumService.documentRead(seq);
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

    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody LecDocumentDto dto) throws Exception {
        try {
            int result = lectureDocumService.documentInsert(dto);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

}
