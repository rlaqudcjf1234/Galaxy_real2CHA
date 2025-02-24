package com.galaxy.service.impl.model;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.galaxy.dto.UserDto;

public class User implements UserDetails{

    UserDto dto;

    public User(UserDto dto) {
        this.dto = dto;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(dto.getDivision()));
    }

    public String getSeq() {
        return dto.getSeq();
    }

    public String getEmail() {
        return dto.getEmail();
    }

    @Override
    public String getUsername() {
        return dto.getEmail();
    }

    @Override
    public String getPassword() {
        return dto.getPassword();
    }

    public String getName() {
        return dto.getName();
    }

    public String getDivision() {
        return dto.getDivision();
    }

}
