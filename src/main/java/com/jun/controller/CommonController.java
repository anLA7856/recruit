package com.jun.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * 共用页面，用来登录注册，以及查看新闻的。
 * @author jun
 * @date 2018年3月27日 : 下午10:42:04
 *
 */
@Controller
@RequestMapping("/common/")
@EnableWebMvc
public class CommonController {

    @RequestMapping(value="/view-login", method = RequestMethod.GET)
    public ModelAndView viewLogin(Model model, HttpServletRequest request){
    	return new ModelAndView("login");
    }
    @RequestMapping(value="/veiw-register", method = RequestMethod.GET)
    public ModelAndView viewRegister(Model model, HttpServletRequest request){
    	return new ModelAndView("register");
    }
    
    @RequestMapping(value="/register", method = RequestMethod.POST)
    public ModelAndView register(Model model, HttpServletRequest request,@RequestParam String username,@RequestParam String password){
    	
    	return new ModelAndView("/index");
    }
}
