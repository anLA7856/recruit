package com.jun.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
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

@Controller
@RequestMapping("/")
@EnableWebMvc
public class IndexController {

	@Autowired
	LoginService loginService;

	/**
	 * 用于进入系统后，没有后缀的直接映射。
	 * 
	 * @return
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index() {
		return "index";
	}

	@Autowired
	UserService userService;

	/**
	 * 登录直接提交在这里，spring secruity会从WebSecurityConfig中知道这个请求是登录，从而进行前端判断。
	 * 返回自己这个链接，也就是登录不成功反馈
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView viewLogin(Model model, HttpServletRequest request) {
		return new ModelAndView("/login");
	}

	/**
	 * 仅仅返回一个注册界面
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/veiw-register", method = RequestMethod.GET)
	public ModelAndView viewRegister(Model model, HttpServletRequest request) {
		return new ModelAndView("/view-register");
	}

	/**
	 * 注销登录操作，同样在spring 里面配置，由他管理。
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/view-logout", method = RequestMethod.GET)
	public String viewLogout(Model model, HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return "redirect:/common/login?logout";
	}

	/**
	 * 登录用户。
	 * 
	 * @param model
	 * @param request
	 * @param username
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "/register", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String register(Model model, HttpServletRequest request, @RequestParam String username,
			@RequestParam String password) {
		return "";
	}

	/**
	 * 用于激活帐号
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/activate", method = RequestMethod.GET)
	public ModelAndView activate(Model model, HttpServletRequest request, @RequestParam String code) {
		String result = userService.validateAndSetRole(code);
		model.addAttribute("result", result);
		return new ModelAndView("/common/validate-result");
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	public String login(Model model, HttpServletRequest request, @RequestParam String username,
			@RequestParam String password) {
		String result = loginService.addUser(username, password);
		return result;
	}
}
