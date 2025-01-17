package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;

import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.ApplyMapper;
import com.galaxy.service.ApplyService;
import com.galaxy.service.validator.ApplyValidator;

import jakarta.validation.ValidationException;

//@Transactional
@Service
public class ApplyServiceImpl implements ApplyService {

    @Autowired
    ApplyMapper applyMapper;

    @Autowired
    ApplyValidator applyValidator;

    public ApplyServiceImpl(ApplyMapper applyMapper, ApplyValidator applyValidator) {
        this.applyMapper = applyMapper;
        this.applyValidator = applyValidator;
    }

    @Override
    public int selectCount(SearchDto dto) throws Exception {
        return applyMapper.selectCount(dto);
    }

    @Override
    public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
        return applyMapper.selectList(dto);
    }

    // 신청서를 저장하는 메서드
    @Override
    public void insertApply(ApplyDto dto) throws Exception {
        // Validator는 Errors 객체를 필요로 하므로 BindingResult(Errors의 구현체)를 생성합니다
        BindingResult bindingResult = new BeanPropertyBindingResult(dto, "applyDto");

        // AbstractValidator의 validate 메서드를 호출합니다
        // 이 메서드는 내부적으로 doValidate를 호출하고 예외 처리를 담당합니다
        applyValidator.validate(dto, bindingResult);

        // 검증 결과 에러가 있다면 예외를 발생시킵니다
        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult.getAllErrors().get(0).getDefaultMessage());
        }

        // 검증을 통과했다면 데이터를 저장합니다
        applyMapper.insertApply(dto);
    }
}