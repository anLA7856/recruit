package com.jun.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/")
public class IndexController {
	
	
    @RequestMapping("/index.do")
    public String index(Model model, HttpServletRequest request){
        //return new ModelAndView("index");
    	return "index";
    }
}
