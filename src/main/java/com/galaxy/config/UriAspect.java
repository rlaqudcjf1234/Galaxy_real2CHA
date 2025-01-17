package com.galaxy.config;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import com.galaxy.dto.RequestDto;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class UriAspect {

    private final HttpServletRequest request;

    public UriAspect(HttpServletRequest request){
        this.request = request;
    }

    @Before("execution(* com.galaxy.controller..*Controller.*(..)) && args(dto,..)") 
    public void addUriToDto(RequestDto dto) {
        String method = request.getMethod();
        String uri = request.getRequestURI();
        
        dto.setMethod(method);
        dto.setUri(uri);
    }
}
