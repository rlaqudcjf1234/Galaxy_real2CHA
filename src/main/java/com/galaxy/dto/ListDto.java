package com.galaxy.dto;

import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListDto {

    private int totalCount;
    
    private Object items;

    public ListDto(int totalCount, Object items) {
        this.totalCount = totalCount;
        this.items = items;
    }
}