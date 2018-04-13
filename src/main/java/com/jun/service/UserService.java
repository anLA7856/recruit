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
		userMapper.updateUserUEnable(code);
		User user = userMapper.findByValidate(code);
		// 赋权操作
		// 获得普通用户权限
		Role role = roleUserMapper.findRoleByRoleName(Model.ROLE_USER);
		Role role1 = roleUserMapper.findRoleByRoleName(Model.ROLE_INFO);
		roleUserMapper.addNewRoleAndUser(role1.getId(), user.getId());
		String result = roleUserMapper.addNewRoleAndUser(role.getId(), user.getId()) == 1 ? "激活成功" : "激活失败，数据库出错";
		return result;
	}
}
