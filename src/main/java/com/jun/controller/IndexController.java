package com.jun.controller;

import com.jun.service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.mapper.UserMapper;
import com.jun.model.User;



@Controller
@RequestMapping("/")//对类的匹配
@EnableWebMvc
@Transactional
public class IndexController {
	
	@Autowired
	UserMapper userMapper;

	@Autowired
	IndexService indexService;
	
	
    /**
     * 用于进入系统后，没有后缀的直接映射。
     * @return
     */
    @RequestMapping(value="/", method = RequestMethod.GET)//对方法的匹配
    public String index(Model model){
    	String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);
		model.addAttribute("index",indexService.getNewsDtoPart());
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
