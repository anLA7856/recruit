package com.jun.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.controller.dto.RoleDto;
import com.jun.controller.vo.RoleVo;
import com.jun.mapper.RolePermissionMapper;
import com.jun.mapper.RoleUserMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.Role;
import com.jun.model.User;

@Controller
@RequestMapping("/admin/")
@EnableWebMvc
@Transactional
public class AdminController {
	@Autowired
	UserMapper userMapper;
	@Autowired
	RolePermissionMapper rolePermissionMapper;//角色权限匹配
	@Autowired
	RoleUserMapper roleUserMapper;

	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(Model model, HttpServletRequest request) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);
		return "/admin/index";
	}


	/**
	 * 管理员获得用户信息。 默认是20条每页。
	 * 
	 * @param model
	 * @param request
	 * @param nowPages
	 *            当前页数
	 * @param target
	 *            标志变量，0代表前一页，1代表后一页
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
		int length = 20;

		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		int start = nowPages == null ? 0 : nowPages * length;

		int totalSize = userMapper.getAllFilterUsers(searchEmail, searchName);
		if (target == null) {
			target = new Integer(3);// 初始值为3
		}
		if (nowPages == null) {
			nowPages = new Integer(1);
		}
		switch (target) {
		case 0:         //上一页
			nowPages--;
			start = (nowPages-1)*length;
			break;
		case 1:     //下一页
			nowPages++;
			break;
		case 3:
			start = 0;
			break;
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
	@RequestMapping(value = "/user-modify", method = RequestMethod.GET)
	public String userModify(Model model, HttpServletRequest request, @RequestParam String username) {
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
		return "修改成功";
		
	}
}
