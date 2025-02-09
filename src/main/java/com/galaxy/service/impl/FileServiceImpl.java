package com.galaxy.service.impl;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.galaxy.dto.FileDto;
import com.galaxy.service.FileService;

@Service
public class FileServiceImpl implements FileService {

    @Value("${file.path}")
    private String filePath;

    @Override public FileDto saveFile(MultipartFile file)throws Exception {

        if (file.isEmpty()) {
            return null;
        }

        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(
            originalFilename.lastIndexOf(".")
        );

        String uuid = UUID
            .randomUUID()
            .toString();
        String saveFilename = uuid + extension;
        String savePath = filePath + saveFilename;

        try {
            file.transferTo(new File(savePath));
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return null;
        }

        FileDto fileDto = new FileDto(filePath, originalFilename, saveFilename);

        return fileDto;
    }

}