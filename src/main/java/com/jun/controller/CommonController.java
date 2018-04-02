package com.jun.controller;

import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.mapper.NewsMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.News;
import com.jun.model.NewsType;
import com.jun.model.User;
import com.jun.service.LoginService;
import com.jun.service.UserService;
import com.jun.utils.IoUtils;

/**
 * 共用页面，用来登录注册，以及查看新闻的。
 * @author jun
 * @date 2018年3月27日 : 下午10:42:04
 *
 */
@Controller
@RequestMapping("/common/")
@EnableWebMvc
@Transactional
public class CommonController {
	
	@Autowired
	LoginService loginService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserMapper userMapper;
	
	@Autowired
	NewsMapper newsMapper;

	/**
	 * 登录直接提交在这里，spring secruity会从WebSecurityConfig中知道这个请求是登录，从而进行前端判断。
	 * 返回自己这个链接，也就是登录不成功反馈
	 * @param model
	 * @param request
	 * @return
	 */
    @RequestMapping(value="/view-login", method = RequestMethod.GET)
    public ModelAndView viewLogin(Model model, HttpServletRequest request){
    	return new ModelAndView("/common/view-login");
    }
    /**
     * 仅仅返回一个注册界面
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value="/veiw-register", method = RequestMethod.GET)
    public ModelAndView viewRegister(Model model, HttpServletRequest request){
    	return new ModelAndView("/common/view-register");
    }
   
    /**
     * 注销登录操作，同样在spring 里面配置，由他管理。
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value="/view-logout", method = RequestMethod.GET)
    public String viewLogout(Model model, HttpServletRequest request,HttpServletResponse response){
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	if (auth != null){    
    	    new SecurityContextLogoutHandler().logout(request, response, auth);
    	}
    	return "redirect:/common/login?logout";
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
    
    /**
     * 获取用户头像
     * @param username
     * @param os
     * @throws Exception
     */
    @RequestMapping("/avatar")
    @ResponseBody
    public void avatar(@RequestParam("username") String username, OutputStream os,HttpServletRequest request)
            throws Exception {
    	
        User user = userMapper.findByUserName(username);
        request.getServletContext().getRealPath("/");
       // ResourceUtils.getFile("classpath:/");
        InputStream is = new FileInputStream(ResourceUtils.getFile(request.getServletContext().getRealPath("/")+"/headPicLocation/"+user.getPic()));
        IoUtils.copyStream(is, os);
    }
    
    /**
     * 用于查看新闻信息
     * @param model
     * @param request
     * @param id
     * @return
     */
	@RequestMapping(value = "/news-view", method = RequestMethod.GET)
	public String newsView(Model model, HttpServletRequest request,Integer id) {
		News news = newsMapper.getNewsById(id);
		model.addAttribute("news", news);
		return "/common/news-view";
	}
    
	/**
	 * 用于查看新闻种类信息
	 * @param model
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/news-catelog", method = RequestMethod.GET)
	public String newsCatelog(Model model, HttpServletRequest request,Integer id) {
		News news = newsMapper.getNewsById(id);
		model.addAttribute("news", news);
		return "/common/news-catelog";
	}
    
}
