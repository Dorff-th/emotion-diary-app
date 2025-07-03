package com.zmylong.productivity.ztest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("")
    public String test1() {
        return "test1. 동작 이상 무";
    }
}
