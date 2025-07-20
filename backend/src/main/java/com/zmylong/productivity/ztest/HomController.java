package com.zmylong.productivity.ztest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomController {

    @GetMapping("/")
    public String forwardToIndex() {
        return "forward:/index.html";
    }

}
