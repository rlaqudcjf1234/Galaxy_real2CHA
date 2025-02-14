package com.galaxy.service.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.galaxy.dto.LectureDocDto;
import com.galaxy.mapper.LectureDocMapper;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class LectureDocValidator extends AbstractValidator<LectureDocDto> {

    @Autowired LectureDocMapper lectureDocMapper;

    @Autowired HttpServletRequest request;

    @Override protected void doValidate(LectureDocDto dto, Errors errors) {
        try {
            String uri = request.getRequestURI();
        } catch (Exception e) {
            errors.rejectValue("connect", "접근 오류", "잘못된 접근입니다.");
        }
    }
}