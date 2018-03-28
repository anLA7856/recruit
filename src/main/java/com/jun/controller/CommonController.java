package com.jun.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.service.LoginService;
import com.jun.service.UserService;

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
	
	@Autowired
	LoginService loginService;
	
	@Autowired
	UserService userService;

    @RequestMapping(value="/view-login", method = RequestMethod.GET)
    public ModelAndView viewLogin(Model model, HttpServletRequest request){
    	return new ModelAndView("/common/view-login");
    }
    @RequestMapping(value="/veiw-register", method = RequestMethod.GET)
    public ModelAndView viewRegister(Model model, HttpServletRequest request){
    	return new ModelAndView("/common/view-register");
    }
    
    /**
     * 登录用户。
     * @param model
     * @param request
     * @param username
     * @param password
     * @return
     */
    @RequestMapping(value="/register", method = RequestMethod.POST,produces="text/html; charset=UTF-8")
    @ResponseBody
    public String register(Model model, HttpServletRequest request,@RequestParam String username,@RequestParam String password){
    	return "";
    }
    /**
     * 用于激活帐号
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value="/activate", method = RequestMethod.GET)
    public ModelAndView activate(Model model, HttpServletRequest request,@RequestParam String code){
    	String result = userService.validateAndSetRole(code);
    	model.addAttribute("result", result);
    	return new ModelAndView("/common/validate-result");   
    }
    
    @RequestMapping(value="/login", method = RequestMethod.POST,produces="text/html; charset=UTF-8")
    public String login(Model model, HttpServletRequest request,@RequestParam String username,@RequestParam String password){
    	String result = loginService.addUser(username, password);
    	return result;
    }
    
}
