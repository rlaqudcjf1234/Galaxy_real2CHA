package com.galaxy.config;

import java.util.Properties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

    @Value("${spring.mail.username}")
    private String username;
    @Value("${spring.mail.password}")
    private String password;
    @Value("${spring.mail.host}")
    private String host;
    @Value("${spring.mail.port}")
    private int port;
    @Value("${spring.mail.properties.mail.debug}")
    private String debug;
    @Value("${spring.mail.properties.mail.smtp.auth}")
    private String smtp_auth;
    @Value("${spring.mail.properties.mail.smtp.ssl.enable}")
    private String smtp_ssl_enable;
    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    private String smtp_starttls_enable;
    @Value("${spring.mail.properties.mail.smtp.ssl.trust}")
    private String smtp_ssl_trust;


    @Bean
    public JavaMailSender javaMailService() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        javaMailSender.setHost(host); // smtp 서버 주소
        javaMailSender.setUsername(username); // 설정(발신) 메일 아이디
        javaMailSender.setPassword(password); // 설정(발신) 메일 패스워드
        javaMailSender.setPort(port); // smtp port
        javaMailSender.setJavaMailProperties(getMailProperties()); // 메일 인증서버 정보 가져온다.
        javaMailSender.setDefaultEncoding("UTF-8");
        return javaMailSender;
    }

    private Properties getMailProperties() {
        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", "smtp"); // 프로토콜 설정
        properties.setProperty("mail.debug", debug); // 디버그
        properties.setProperty("mail.smtp.auth", smtp_auth); // smtp 인증
        properties.setProperty("mail.smtp.ssl.enable", smtp_ssl_enable); // ssl
        properties.setProperty("mail.smtp.starttls.enable", smtp_starttls_enable); // smtp starttls
        properties.setProperty("mail.smtp.ssl.trust", smtp_ssl_trust); // ssl 인증 서버 주소
        return properties;
    }
}
