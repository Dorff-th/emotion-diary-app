package com.zmylong.productivity;


import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class ProductivityApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductivityApplication.class, args);
    }

    @PostConstruct
    public void init() {
        // JVM의 기본 시간대를 Asia/Seoul로 설정
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }

}
