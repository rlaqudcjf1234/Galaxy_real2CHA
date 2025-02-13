package com.galaxy.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.galaxy.dto.ImageDto;
import com.galaxy.service.FileService;

import java.io.ByteArrayOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping(value = "/image")
public class ImageController {

    @Autowired private FileService fileService;

    @PostMapping("/add")
    public ImageDto add(@RequestParam("multipartFiles") MultipartFile[] multipartFiles)throws Exception {
        if (multipartFiles == null || multipartFiles.length == 0) {
            return null;
        }

        return fileService.saveImage(multipartFiles[0]);
    }

    @GetMapping("/read")
    public byte[] read(ImageDto dto)throws Exception {

        ByteArrayOutputStream baos = fileService.readImage(dto);

        if (baos == null) {
            return null;
        }

        return baos.toByteArray();
    }

}
