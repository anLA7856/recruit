package com.jun.controller;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;



@Controller
@RequestMapping("/")
@EnableWebMvc
@Transactional
public class IndexController {
	
    /**
     * 用于进入系统后，没有后缀的直接映射。
     * @return
     */
    @RequestMapping(value="/", method = RequestMethod.GET)
    public String index(){
        return "index";
    }
	
	
	
    /**
     * 用于登录成功后的跳转
     * @return
     */
    @RequestMapping(value="/index.do", method = RequestMethod.GET)
    public String getHomePage(){
        return "index";
    }
}
