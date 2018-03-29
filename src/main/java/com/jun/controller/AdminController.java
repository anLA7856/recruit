package com.jun.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.service.UserService;

@Controller
@RequestMapping("/admin/")
@EnableWebMvc
public class AdminController {
	
	@Autowired
	UserService userService;
	
	
	/**
	 * 查看个人信息，然后有变有下拉条
	 * @param model
	 * @param request
	 * @return
	 */
    @RequestMapping(value="/", method = RequestMethod.GET)
    public ModelAndView viewLogin(Model model, HttpServletRequest request){
    	
    	model.addAttribute("user", userService);
    	return new ModelAndView("/admin/index");
    }
}
