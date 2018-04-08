package com.jun.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.controller.dto.ApplicantInfoDto;
import com.jun.mapper.ApplicantInfoMapper;
import com.jun.mapper.PositionInfoMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.ApplicantInfo;
import com.jun.model.PositionInfo;
import com.jun.model.User;
import com.jun.utils.CommonUtil;

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
	 * 如果用户已经申请过了，那么直接跳到它的申请界面，并且把东西填进去，
	 * 如果职位信息已经审核过了，无论是否通过，都不能能再输入了。
	 * 并且只能一次申请一个。
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
		
		//查询最新的，已经申请过的。看是不是，也就是去applicant_info里面看，是不是有未审核的记录。
		int countOk = applicantInfoMaaper.getAreadyApplyCount(username);
		int notOk = applicantInfoMaaper.getAreadyApplyNotOk(username); 
		
		if(countOk == 1){
			//即成功的
			//说明已经有一个审批过了，那么就就进入已成功，等待打印准考证
			return "/user/view-user-apply-success";
		}else if(notOk == 1){
			//在途的。
			//说明此时，自己提交了一个申请，但是还没有申请过。这里就可以进行数据修改。
			//但是不能更换职业。
			List<PositionInfo> list = positionInfoMapper.getAllEnablePositions();
			model.addAttribute("positions", list);
			ApplicantInfo info = applicantInfoMaaper.getOnVerifyingByUsername(username);
			model.addAttribute("info", info);
			return "/user/view-user-apply";
		}else{
			//新建
			List<PositionInfo> list = positionInfoMapper.getAllEnablePositions();
			model.addAttribute("positions", list);
			ApplicantInfo info = new ApplicantInfo();  //一个空对象
			model.addAttribute("info", info);
			return "/user/view-user-apply";
		}
		
		
	}
	
	/**
	 * 用于保存，申请人申请职位的信息
	 * @param model
	 * @param request
	 * @param info
	 * @return
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 */
	@RequestMapping(value = "/save-user-apply")
	@ResponseBody
	public String saveUserApply(Model model, HttpServletRequest request,@RequestBody ApplicantInfo data) throws IllegalArgumentException, IllegalAccessException {
		data.setTarget(0);
		Map<String, Object> map = CommonUtil.reflectObject2Map(data);
		
		if(data.getId()!=null){
			//说明是修改操作
			applicantInfoMaaper.updateApplicantInfo(map);
		}else{
			applicantInfoMaaper.addNewApplicantInfo(map);
		}
		//申请完之后，重定向到职位申请列表结果页面
		return "ok";
	}
	
	@RequestMapping(value = "/view-user-apply-list", method = RequestMethod.GET)
	public String viewUserApplyList(Model model, HttpServletRequest request,Integer id) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);
		
		List<ApplicantInfoDto> list = applicantInfoMaaper.getAllApplicantInfoByUsername(username);
		model.addAttribute("list", list);
		
		model.addAttribute("positionInfoMapper", positionInfoMapper);
		
		return "/user/view-user-apply-list";
	}
	
}
