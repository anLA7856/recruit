package com.jun.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/")
public class IndexController {
	
	/**
	 * 经由spring mvc 对/下跳转，从而进入的这里面
	 * @param model
	 * @param request
	 * @return
	 */
    @RequestMapping("/index.do")
    public String index(Model model, HttpServletRequest request){
    	String msg =  new String("测试标题测试内容额外信息，只对管理员显示");
        model.addAttribute("msg", msg);
    	return "home";
    }
}
