package com.example.demo.utilities;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AppConfig {
    // Bean added here to not clutter the main application class
    // https://stackoverflow.com/questions/60848619/consider-defining-a-bean-of-type-org-springframework-security-crypto-bcrypt-bcr
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}