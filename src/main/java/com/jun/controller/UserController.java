package com.jun.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.mapper.ApplicantInfoMapper;
import com.jun.mapper.PositionInfoMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.ApplicantInfo;
import com.jun.model.PositionInfo;
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
	
	@Autowired
	PositionInfoMapper positionInfoMapper;
	
	@Autowired
	ApplicantInfoMapper applicantInfoMaaper;
	
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
		
		List<PositionInfo> list = positionInfoMapper.getAllEnablePositions();
		model.addAttribute("positions", list);
		return "/user/view-user-apply";
	}
	
	/**
	 * 用于保存，申请人申请职位的信息
	 * @param model
	 * @param request
	 * @param info
	 * @return
	 */
	@RequestMapping(value = "/save-user-apply")
	public String saveUserApply(Model model, HttpServletRequest request,@RequestBody ApplicantInfo data) {
		data.setTarget(-1);
		applicantInfoMaaper.addNewApplicantInfo(data);
		//申请完之后，重定向到职位申请列表结果页面
		return "ok";
	}
	
	@RequestMapping(value = "/view-user-apply-list", method = RequestMethod.GET)
	public String viewUserApplyList(Model model, HttpServletRequest request,Integer id) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);
		
		List<ApplicantInfo> list = applicantInfoMaaper.getAllApplicantInfoByUsername(username);
		model.addAttribute("list", list);
		
		model.addAttribute("positionInfoMapper", positionInfoMapper);
		
		return "/user/view-user-apply-list";
	}
	
}
