package com.galaxy.controller;

import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.UserDto;
import com.galaxy.service.UserService;
import com.galaxy.service.validator.UserValidator;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired private UserValidator userValidator;

    @InitBinder
    public void validatorBinder(WebDataBinder binder) {
        binder.addValidators(userValidator);
    }

    @Autowired private UserService userService;

    @PostMapping("/login")
    public void login(@Valid UserDto dto, HttpSession session)throws Exception {

        Map<String, Object> user = userService.selectOne(dto);

        session.setAttribute("user", user);

    }

}
