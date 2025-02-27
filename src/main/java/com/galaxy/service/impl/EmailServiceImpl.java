package com.galaxy.service.impl;

import java.io.UnsupportedEncodingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.EmailDto;
import com.galaxy.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String username;

    @Override
    public MimeMessage createMessage(EmailDto dto) throws Exception {
        return createMessage(dto.getEmail(), dto.getSubject(), dto.getMsg());
    }

    @Override
    public MimeMessage createMessage(String to, String subject, String msg)
            throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, to); // to 보내는 대상
        message.setSubject(subject, "utf-8"); // 메일 제목
        message.setText(msg, "utf-8", "html"); // 내용, charset타입, subtype
        message.setFrom(new InternetAddress(username, "prac_Admin")); // 보내는 사람의 메일 주소, 보내는 사람 이름

        return message;
    }

    /*
     * 메일 발송 sendSimpleMessage의 매개변수로 들어온 to는 인증번호를 받을 메일주소 MimeMessage 객체 안에 내가 전송할 메일의 내용을 담아준다.
     * bean으로 등록해둔 javaMailSender 객체를 사용하여 이메일 send
     */
    @Override
    public void sendSimpleMessage(MimeMessage message) throws Exception {
        try {
            javaMailSender.send(message); // 메일 발송
        } catch (MailException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }
}
