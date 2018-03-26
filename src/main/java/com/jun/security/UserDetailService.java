package com.jun.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jun.mapper.PermissionMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.Permission;
import com.jun.model.User;

@Service
public class UserDetailService implements UserDetailsService {
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private PermissionMapper permissionMapper;

	private static final String ROLE_ADMIN = "ROLE_ADMIN";
	private static final String ROLE_PUBLISHER = "ROLE_PUBLISHER";
	private static final String ROLE_USER = "ROLE_USER";

	public UserDetails loadUserByUsername(String username) {
		User user = userMapper.findByUserName(username);
		if (user != null) {
			List<Permission> permissions = permissionMapper.findPermissionByRoleAndUserId(user.getId(), ROLE_ADMIN);
			List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
			for (Permission permission : permissions) {
				if (permission != null && permission.getName() != null) {
					GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(permission.getName());
					// 1：此处将权限信息添加到 GrantedAuthority
					// 对象中，在后面进行全权限验证时会使用GrantedAuthority 对象。
					grantedAuthorities.add(grantedAuthority);
				}
			}
			return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
					grantedAuthorities);
		} else {
			throw new UsernameNotFoundException("admin: " + username + " do not exist!");
		}
	}
}
