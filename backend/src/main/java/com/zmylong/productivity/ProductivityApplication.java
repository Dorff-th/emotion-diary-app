package com.zmylong.productivity;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProductivityApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductivityApplication.class, args);
    }

    /*
    애플리케이션이 실행될때 member 테이블에 테스트 데이터 삽입
     */
    /*@Bean
    CommandLineRunner test(MemberService memberService) {
        return args -> {
            memberService.register("testuser", "1234");
            System.out.println("등록 완료");
        };
    }*/

}
