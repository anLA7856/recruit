package com.jun.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jun.mapper.PermissionMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.Permission;
import com.jun.model.User;
import com.jun.utils.Model;

/**
 * 
 * @author jun
 * @date 2018年3月26日 : 下午9:08:08
 *
 */
@Service
public class UrlUserService implements UserDetailsService {
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private PermissionMapper permissionMapper;

	@Override
	public UserDetails loadUserByUsername(String userName) { // 重写loadUserByUsername
																// 方法获得
																// userdetails
																// 类型用户

		User user = userMapper.findByUserName(userName);
		if (user != null) {
			List<Permission> permissions = permissionMapper.findPermissionByRoleAndUserId(user.getId(),
					Model.ROLE_ADMIN);
			List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
			for (Permission permission : permissions) {
				if (permission != null && permission.getName() != null) {
					GrantedAuthority grantedAuthority = new UrlGrantedAuthority(permission.getUrl(),
							permission.getMethod());
					grantedAuthorities.add(grantedAuthority);
				}
			}
			user.setGrantedAuthorities(grantedAuthorities);
			return user;
		} else {
			throw new UsernameNotFoundException("admin: " + userName + " do not exist!");
		}
	}

	public UserMapper getUserMapper() {
		return userMapper;
	}

	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	public PermissionMapper getPermissionMapper() {
		return permissionMapper;
	}

	public void setPermissionMapper(PermissionMapper permissionMapper) {
		this.permissionMapper = permissionMapper;
	}



}