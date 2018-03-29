package com.jun.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jun.mapper.PermissionMapper;
import com.jun.mapper.RoleUserMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.Role;
import com.jun.model.User;
import com.jun.utils.Model;

/**
 * 用于处理user表的server层
 * 
 * @author jun
 * @date 2018年3月28日 : 下午8:25:56
 *
 */
@Service
public class UserService {

	@Autowired
	UserMapper userMapper;

	@Autowired
	PermissionMapper permissionMapper;

	@Autowired
	RoleUserMapper roleUserMapper;

	/**
	 * 用于用户初始化时候，讲ennable设为1,并且给予基本的权限。
	 * 
	 * @param code
	 * @return
	 */
	public String validateAndSetRole(String code) {
		int validateResult = userMapper.updateUserUEnable(code);
		if (validateResult == 0) {
			return "激活失败！";
		}
		User user = userMapper.findByValidate(code);
		// 赋权操作
		// 获得普通用户权限
		Role role = roleUserMapper.findRoleByRoleName(Model.ROLE_USER);

		String result = roleUserMapper.addNewRoleAndUser(user.getId(), role.getId()) == 1 ? "激活成功" : "激活失败，数据库出错";
		return result;
	}
	
	
	public User getUserByUsername(String username){
		return userMapper.findByUserName(username);
	}
}
