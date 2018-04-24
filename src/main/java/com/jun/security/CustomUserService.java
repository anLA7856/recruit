package com.jun.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
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

    /**
     *通过用户名去加载用户。
     */
    public UserDetails loadUserByUsername(String username) {
        com.jun.model.User user = userMapper.findByUserName(username);     //从数据库中获取用户名对应的user
        
        if (user != null) {    //当user不为null
        	if(user.getuEnabled()==0){         //当用户未激活，也就是没有点击邮箱中的链接。
            	//未激活
            	throw new DisabledException("用户未激活");
            }else{     //已激活。
            	//获取用户所有角色
                List<Role> roles = roleUserMapper.findRolesByUserId(user.getId());
                List<GrantedAuthority> grantedAuthorities = new ArrayList <>();  //角色集合
                for (Role role : roles) {                //把该用户对应的所有角色，放入到grantedAuthorities/里面。
                    if (role != null && role.getName()!=null) {
	                    GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getName());
	                    grantedAuthorities.add(grantedAuthority);
                    }
                }
                //返回一个UserDetail，有username，password，以及 grantedAuthorities权限。
                return new User(user.getUsername(), user.getPassword(), grantedAuthorities);   //把username和grantedAuthorities绑定起来。  
            }
        } else {
        	//没找到对应用户。
            throw new UsernameNotFoundException("admin: " + username + " do not exist!");
        }
    }

}
