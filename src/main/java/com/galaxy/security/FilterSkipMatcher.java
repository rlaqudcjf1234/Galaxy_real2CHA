package com.galaxy.security;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import jakarta.servlet.http.HttpServletRequest;

public class FilterSkipMatcher implements RequestMatcher {

    private final OrRequestMatcher orRequestMatcher;

    public FilterSkipMatcher(List<String> skipList) {
        this.orRequestMatcher = new OrRequestMatcher(
            skipList.stream()
                    .map(AntPathRequestMatcher::new)
                    .collect(Collectors.toList())
        );
    }

    @Override
    public boolean matches(HttpServletRequest request) {
        return !orRequestMatcher.matches(request);
    }
}