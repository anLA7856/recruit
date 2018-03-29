package com.jun.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.mapper.UserMapper;
import com.jun.model.User;
import com.jun.utils.CommonUtil;

@Controller
@RequestMapping("/admin/")
@EnableWebMvc
public class AdminController {
	
	@Autowired
	UserMapper userMapper;
	
	@RequestMapping(value="/index", method = RequestMethod.GET)
	public String index(Model model, HttpServletRequest request){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);
		return "/admin/index";
	}
	
	@RequestMapping(value="/update-person-info",method = RequestMethod.POST,produces="text/html; charset=UTF-8")
	@ResponseBody
	public String updatePersonInfo(Model model, HttpServletRequest request,String name,String telephone,String username){
		if(!CommonUtil.checkIfNull(name,telephone,username)){
			return "error,paramer not null";
		}
		if(!SecurityContextHolder.getContext().getAuthentication().getName().equals(username)){
			throw new AccessDeniedException("没有权限");
		}
		int result = userMapper.updateNameAndTelephoneByUserName(name, telephone, username);
		if(result == 1){
			return "修改成功";
		}else{
			return "修改失败";
		}
	}
	
	/**
	 * 管理员获得用户信息。
	 * 默认是20条每页。
	 * @param model
	 * @param request
	 * @param nowPages  当前页数
	 * @param target  标志变量，1代表前一页，2代表后一页，3代表首页，4代表尾页。
	 * @return
	 */
	@RequestMapping(value="/user-list", method = RequestMethod.GET)
	public String usreList(Model model, HttpServletRequest request,Integer nowPages,Integer target){
		int start = nowPages == null? 0 : nowPages*20;
		int length = 20;
		int totalSize = userMapper.allUserNumbers();
		if(target == null){
			target = new Integer(1);//初始值为1
		}
		if(nowPages == null){
			nowPages = new Integer(1);
		}
		switch (target) {
		case 1:
			start = nowPages*20-20;
			break;
		case 2:
			start = nowPages*20+20;
		case 3:
			start = 0;
		case 4:
			start = totalSize - totalSize%20;
			start = start==0? totalSize-20:start;
		default:
			break;
		}
		List<User> list = userMapper.getLimitUsers(start, length);
		model.addAttribute("list", list);
		model.addAttribute("nowPages", nowPages == null? 1:nowPages+1);
		return "/admin/user-list";
	}
	
	/**
	 * 用于超级管理员管理某个用户，赋予权限等等。
	 * @param model
	 * @param request
	 * @param username
	 * @return
	 */
	@RequestMapping(value="/user-modify/{username}",method=RequestMethod.POST)
	public String userModify(Model model,HttpServletRequest request,@PathVariable String username){
		
		return "/admin/user-modify";
	}
	
}
