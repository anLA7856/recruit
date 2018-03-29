package com.jun.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jun.mapper.PermissionMapper;
import com.jun.mapper.RoleUserMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.Role;


/**
 * 
 * @author jun
 * @date 2018年3月28日 : 下午11:00:11
 *
 */
@Service
public class CustomUserService implements UserDetailsService { //自定义UserDetailsService 接口

    @Autowired
    UserMapper userMapper;
    @Autowired
    PermissionMapper permissionMapper;
    @Autowired
    RoleUserMapper roleUserMapper;

    public UserDetails loadUserByUsername(String username) {
        com.jun.model.User user = userMapper.findByUserName(username);
        if (user != null) {
        	//获取用户所有角色
            List<Role> roles = roleUserMapper.findRolesByUserId(user.getId());
            List<GrantedAuthority> grantedAuthorities = new ArrayList <>();
            for (Role role : roles) {
                if (role != null && role.getName()!=null) {
                GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getName());
                grantedAuthorities.add(grantedAuthority);
                }
            }
            //返回一个UserDetail，有username，password，以及 grantedAuthorities权限。
            return new User(user.getUsername(), user.getPassword(), grantedAuthorities);
        } else {
            throw new UsernameNotFoundException("admin: " + username + " do not exist!");
        }
    }

}
