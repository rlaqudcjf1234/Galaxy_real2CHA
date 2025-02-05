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
        try {
            System.out.println("class_seq value: " + dto.getClass_seq());
            System.out.println("class_seq type: " + ((dto.getClass_seq() != null) ? Long.class.getName() : "null"));
            if (dto == null || dto.getClass_seq() == null || dto.getClass_seq() <= 0) {
                throw new ValidationException("클래스를 선택해주세요.");
            }

            BindingResult bindingResult = new BeanPropertyBindingResult(dto, "applyDto");
            applyValidator.validate(dto, bindingResult);

            if (bindingResult.hasErrors()) {
                throw new ValidationException(bindingResult.getAllErrors().get(0).getDefaultMessage());
            }

            applyMapper.insertApply(dto);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ValidationException("처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @Override
    public Map<String, Object> getApplyRead(String seq) {
        return applyMapper.selectApplyRead(seq);
    }

    public int deleteApply(Long id) {
        return applyMapper.deleteApply(id);
    }
}