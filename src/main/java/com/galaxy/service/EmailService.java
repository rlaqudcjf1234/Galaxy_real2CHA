package com.galaxy.service;

import java.io.UnsupportedEncodingException;
import com.galaxy.dto.EmailDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

public interface EmailService {

    MimeMessage createMessage(EmailDto dto) throws Exception;

    MimeMessage createMessage(String to, String subject, String msg)
            throws MessagingException, UnsupportedEncodingException;

    void sendSimpleMessage(MimeMessage message) throws Exception;
}
