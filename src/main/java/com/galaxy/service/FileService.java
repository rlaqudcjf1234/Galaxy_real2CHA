package com.galaxy.service;

import org.springframework.web.multipart.MultipartFile;

import com.galaxy.dto.FileDto;

public interface FileService {

    FileDto saveFile(MultipartFile file) throws Exception;

}
