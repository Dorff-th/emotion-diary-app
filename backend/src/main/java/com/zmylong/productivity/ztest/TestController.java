package com.zmylong.productivity.ztest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("")
    public String test1() {

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "404 직접 테스트");
        //return "test1. 동작 이상 무";
    }

}
