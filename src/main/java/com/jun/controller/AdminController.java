package com.jun.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.controller.dto.RoleDto;
import com.jun.controller.vo.RoleVo;
import com.jun.mapper.RolePermissionMapper;
import com.jun.mapper.RoleUserMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.Role;
import com.jun.model.User;
import com.jun.utils.CommonUtil;
import com.jun.utils.MD5Util;

@Controller
@RequestMapping("/admin/")
@EnableWebMvc
public class AdminController {
	@Autowired
	UserMapper userMapper;
	@Autowired
	RolePermissionMapper rolePermissionMapper;
	@Autowired
	RoleUserMapper roleUserMapper;

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(Model model, HttpServletRequest request) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);
		return "/admin/index";
	}

	@RequestMapping(value = "/update-person-info", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String updatePersonInfo(Model model, HttpServletRequest request, String name, String telephone,
			String username) {
		if (!CommonUtil.checkIfNull(name, telephone, username)) {
			return "error,paramer not null";
		}
		if (!SecurityContextHolder.getContext().getAuthentication().getName().equals(username)) {
			throw new AccessDeniedException("没有权限");
		}
		int result = userMapper.updateNameAndTelephoneByUserName(name, telephone, username);
		if (result == 1) {
			return "修改成功";
		} else {
			return "修改失败";
		}
	}

	/**
	 * 管理员获得用户信息。 默认是20条每页。
	 * 
	 * @param model
	 * @param request
	 * @param nowPages
	 *            当前页数
	 * @param target
	 *            标志变量，1代表前一页，2代表后一页，3代表首页，4代表尾页。
	 * @return
	 */
	@RequestMapping(value = "/user-list")
	public String usreList(Model model, HttpServletRequest request, Integer nowPages, Integer target,
			String searchEmail, String searchName) {
		if (searchEmail == null) {
			searchEmail = "";
		}
		if (searchName == null) {
			searchName = "";
		}
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		int start = nowPages == null ? 0 : nowPages * 20;
		int length = 20;
		int totalSize = userMapper.getAllFilterUsers(searchEmail, searchName);
		if (target == null) {
			target = new Integer(1);// 初始值为1
		}
		if (nowPages == null) {
			nowPages = new Integer(1);
		}
		switch (target) {
		case 1:
			start = nowPages * 20 - 20;
			break;
		case 2:
			start = nowPages * 20 + 20;
		case 3:
			start = 0;
		case 4:
			start = totalSize - totalSize % 20;
			start = start == 0 ? totalSize - 20 : start;
		default:
			break;
		}

		List<User> list = userMapper.getLimitUsers(start, length, searchEmail, searchName);
		model.addAttribute("list", list);
		model.addAttribute("nowPages", nowPages);
		model.addAttribute("user", user);
		model.addAttribute("totalSize", totalSize);
		model.addAttribute("startPoint", start + 1);
		int endPoint = start + length > totalSize ? totalSize : start + length;
		model.addAttribute("endPoint", endPoint);
		model.addAttribute("currentPagesSize", endPoint - start);
		if (searchEmail != null) {
			model.addAttribute("searchEmail", searchEmail);
		}
		if (searchName != null) {
			model.addAttribute("searchName", searchName);
		}
		return "/admin/user-list";
	}

	/**
	 * 用于超级管理员管理某个用户，赋予权限等等。 获取赋予权限页面
	 * 
	 * @param model
	 * @param request
	 * @param username
	 * @return
	 */
	@RequestMapping(value = "/user-modify/{username}", method = RequestMethod.GET)
	public String userModify(Model model, HttpServletRequest request, @PathVariable String username) {
		String concurrentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(concurrentUsername);

		User getUser = userMapper.findByUserName(username);

		model.addAttribute("user", user);
		model.addAttribute("getUser", getUser);
		// 找出所有用户角色
		List<Role> allRoles = rolePermissionMapper.getAllRoles();

		// 找出username用户所拥有的的角色。
		List<Role> haveRoles = rolePermissionMapper.getAllRolesByUsername(getUser.getUsername());

		// 用于传递出去
		List<RoleDto> listRole = new ArrayList<>();
		// 遍历allRole，因为要把所有role都放出来看
		for (Role r : allRoles) {
			RoleDto rDto = new RoleDto();
			if (haveRoles.contains(r)) {
				rDto.setTarget(1);
			} else {
				rDto.setTarget(0);
			}
			rDto.setRole(new Role(r.getId(), r.getName()));
			listRole.add(rDto);
		}
		model.addAttribute("listRole", listRole);
		return "/admin/user-modify";
	}

	/**
	 * 用于管理员，提交修改任何页面的请求
	 * 
	 * @param model
	 * @param request
	 * @param name
	 * @param telephone
	 * @param username
	 * @return
	 */
	@RequestMapping(value = "/save-user-info", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String saveUserInfo(Model model, HttpServletRequest request, @RequestBody RoleVo roleVo) {
		Map<String, String[]> map = request.getParameterMap();
		//遍历map中的键 
		for (String key : map.keySet()) { 
		  System.out.println("Key = " + key); 
		} 
		//遍历map中的值 
		for (String[] value : map.values()) { 
		  System.out.println("Value = " + value); 
		}
		User modifyUser = userMapper.findByUserName(roleVo.getUsername());
		// 首先修改用户个人信息
		int result1 = userMapper.updateNameAndTelephoneAndEnableByUsername(roleVo.getName(), roleVo.getTelephone(),
				Integer.parseInt(roleVo.getuEnabled()), roleVo.getUsername());
		//修改权限，采用先全部删除，然后再添加的方式
		int result2 = roleUserMapper.deleteAllRolesByUserId(modifyUser.getId());
		//再把所有选中的权限加上去。
		int result3 = 0;
		for(String str : roleVo.getRole()){
			Integer id = Integer.parseInt(str);
			result3 = roleUserMapper.addNewRoleAndUser(id,modifyUser.getId());
			if(result3 == 0){
				return "修改失败";
			}
		}
		if ((result1 == result2)&&(result2 == result3)) {
			return "修改成功";
		} else {
			return "修改失败";
		}
	}
	/**
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/modify-password", method = RequestMethod.POST,produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String modifyPassword(Model model,HttpServletResponse response, HttpServletRequest request,String oldPassword,String newPassword) {
		if(!CommonUtil.checkIfNull(oldPassword,newPassword)){
			return "error";
		}
		String concurrentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		newPassword = MD5Util.encode(newPassword);
		oldPassword = MD5Util.encode(oldPassword);
		
		int result = userMapper.updatePasswordByUsername(newPassword, concurrentUsername, oldPassword);
		
		if(result == 1){
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    	if (auth != null){    
	    	    new SecurityContextLogoutHandler().logout(request, response, auth);
	    	}
	    	return "ok";
		}else{
			return "修改失败";
		}

	}
	
    @RequestMapping(value="/view-modify-password", method = RequestMethod.GET)
    public String viewRegister(Model model, HttpServletRequest request){
    	String concurrentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(concurrentUsername);
		model.addAttribute("user", user);
    	return "/admin/view-modify-password";
    }

}
