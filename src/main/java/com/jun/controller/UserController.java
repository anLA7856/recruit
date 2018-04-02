package com.jun.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.mapper.UserMapper;
import com.jun.model.News;
import com.jun.model.User;

/**
 * 普通用户的controller
 * 主要是填写信息，报考职位。
 * @author jun
 * @date 2018年4月2日 : 下午4:54:58
 */
@Controller
@RequestMapping("/user")
@EnableWebMvc
@Transactional
public class UserController {
	
	@Autowired
	UserMapper userMapper;
	
	/**
	 * 用于,进入用户申请页面。
	 * @param model
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/view-user-apply", method = RequestMethod.GET)
	public String userApply(Model model, HttpServletRequest request,Integer id) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);
		return "/user/view-user-apply";
	}
}
