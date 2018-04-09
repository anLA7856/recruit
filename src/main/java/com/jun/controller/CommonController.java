package com.jun.controller;

import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
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

import com.jun.controller.dto.CatelogDto;
import com.jun.controller.dto.NewsDto;
import com.jun.mapper.NewsMapper;
import com.jun.mapper.NewsTypeMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.News;
import com.jun.model.NewsType;
import com.jun.model.User;
import com.jun.service.LoginService;
import com.jun.service.UserService;
import com.jun.utils.CommonUtil;
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
	
	@Autowired
	NewsTypeMapper newsTypeMapper;

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
    @RequestMapping(value="/register", method = RequestMethod.POST)
    public String register(Model model, HttpServletRequest request,@RequestParam String username,@RequestParam String password){
    	String result = loginService.addUser(username, password);
    	model.addAttribute("info", "请进入邮箱验证！");
    	model.addAttribute("href", com.jun.utils.Model.DOMAIN_NAME);
    	model.addAttribute("result", result);
    	return "/common/validate-result";
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
    	model.addAttribute("info", "邮箱验证成功，请登录");
    	model.addAttribute("href", com.jun.utils.Model.DOMAIN_NAME);
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
		
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);
		
		
		News news = newsMapper.getNewsById(id);
		NewsDto dto = new NewsDto();
		dto.setNews(news);
		
		List<NewsType> list = newsTypeMapper.getAllNewsTypes();
		dto.setNewsTypes(list);
		
		User articleUser = userMapper.findByUserName(news.getUsername());
		dto.setUser(articleUser);
		
		model.addAttribute("newsTypeMapper", newsTypeMapper);
		model.addAttribute("dto", dto);
		
		Long hitCountPlus = news.getHitCount()+1;
		newsMapper.addNewsHitCount(hitCountPlus, news.getId());
		
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
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);
		
		
		News news = newsMapper.getNewsById(id);
		model.addAttribute("news", news);
		
		CatelogDto dto = new CatelogDto();
		List<News> list = new ArrayList<>();
		if(id == -1){
			//获取所有新闻
			list = newsMapper.getAllNewsBesidesContent();
		}else{
			list = newsMapper.getAllNewsBesidesContentByTypeId(id);
		}
		dto.setNewsList(list);
		List<NewsType> typeList = newsTypeMapper.getAllNewsTypes();
		dto.setNewsTypeList(typeList);
		
		dto.setNowCatelog(id);
		
		model.addAttribute("dto", dto);
		model.addAttribute("newsTypeMapper", newsTypeMapper);
		return "/common/news-catelog";
	}
	
	/**
	 * 用于下载附件
	 * @param model
	 * @param request
	 * @param response
	 * @param fileName
	 * @throws Exception
	 */
	@RequestMapping(value = "/download-attachment", method = RequestMethod.GET)
	public void downloadAttachment(Model model, HttpServletRequest request,HttpServletResponse response,String fileName) throws Exception {
		 //上传文件路径
        String path = request.getServletContext().getRealPath("/attachment/");
		//String filePath = path+"pipe.bmp";注意可能每当启动一次，class下面的文件会被清空。
		String filePath = path+fileName;
		
		CommonUtil.download(fileName, filePath, request, response);
	}
    
}
