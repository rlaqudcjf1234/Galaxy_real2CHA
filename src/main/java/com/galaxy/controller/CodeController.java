package com.galaxy.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.CodeDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.CodeService;

@RestController
@RequestMapping(value = "/code")
public class CodeController {
    
    @Autowired
    CodeService codeService;

	@RequestMapping(value = "/use", method = RequestMethod.GET)
	public List<CodeDto> list(SearchDto dto) throws Exception {
        
        List<CodeDto> list = new ArrayList<CodeDto>();

        switch (dto.getPage()) {
            case "adminAdd":
                    list.add(new CodeDto("division", codeService.selectUse2()));
                break;
            case "adminMod":
                    list.add(new CodeDto("use_yn", codeService.selectUse1()));
                    list.add(new CodeDto("division", codeService.selectUse2()));
                break;
            default:
                break;
        }

		return list;
	}



}
