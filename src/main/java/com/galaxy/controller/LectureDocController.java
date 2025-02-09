package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.galaxy.dto.FileDto;
import com.galaxy.dto.LectureDocDto;
import com.galaxy.dto.ListDto;
import com.galaxy.service.FileService;
import com.galaxy.service.LectureDocService;
import com.galaxy.service.validator.LectureDocValidator;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/lectureDoc")
public class LectureDocController {

    @Autowired
    private LectureDocValidator lectureDocValidator;

    @InitBinder
    public void validatorBinder(WebDataBinder binder) {
        binder.addValidators(lectureDocValidator);
    }

    @Autowired
    private LectureDocService lectureDocService;

    @Autowired
    private FileService fileService;

    @GetMapping("/list")
    public ListDto list(@Valid LectureDocDto dto) throws Exception {

        int count = lectureDocService.selectCount(dto);
        List<Map<String, Object>> list = lectureDocService.selectList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }

    @GetMapping("/read")
    public ResponseEntity<?> getLectureRead(
            @RequestParam(name = "seq") String seq) throws Exception {
        try {
            Map<String, Object> lecture = lectureDocService.selectOne(seq);
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
    public ResponseEntity<?> insert(@Valid LectureDocDto dto) throws Exception {
        try {
            int result = lectureDocService.insertDoc(dto);
            for (MultipartFile file : dto.getFile()) {
                FileDto fileDto = fileService.saveFile(file);
                // lectureDocService.insertDoc(fileDto);
            }
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

}
