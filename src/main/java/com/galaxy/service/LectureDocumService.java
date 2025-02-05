package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.LecDocumentDto;
import com.galaxy.dto.SearchDto;


public interface LectureDocumService {

    int selectCount(SearchDto dto)throws Exception;
    
    List<Map<String, Object>> documentList(SearchDto dto) throws Exception;

    Map<String, Object> documentRead(String seq);

    int documentInsert(LecDocumentDto dto) throws Exception;
}
