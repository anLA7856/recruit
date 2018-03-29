package com.jun.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Service;

import com.jun.mapper.PermissionMapper;
import com.jun.mapper.RolePermissionMapper;
import com.jun.model.Permission;
import com.jun.model.Role;

/**
 * 
 * @author jun
 * @date 2018年3月28日 : 下午11:10:49
 *
 */
@Service
public class WebInvocationSecurityMetadataSourceService implements FilterInvocationSecurityMetadataSource {

	@Autowired
	PermissionMapper permissionMapper;
	
	@Autowired
	RolePermissionMapper rolePermissionMapper;
	
	/**
	 * String 代表url
	 * Collection<ConfigAttribut> 代表角色，也就是ROLE开头那个
	 */
	private HashMap<String, Collection<ConfigAttribute>> map = null;

	/**
	 * 加载资源，初始化资源变量,把所有以url为key，permissionName的集合为value。
	 * 所以每次更改数据库，注意这里可能不能及时得到更新。
	 * 
	 */
	public void loadResourceDefine() {
		map = new HashMap<>();
		Collection<ConfigAttribute> array = new ArrayList<>();
		ConfigAttribute cfg;
		List<Permission> permissions = permissionMapper.findAll();   //加载所有permission，因为url在permission里面。
		for (Permission permission : permissions) {
			//通过每一个permission，获取它的所有的role、
			List<Role> needRoles = rolePermissionMapper.getAllRolesByPermissionName(permission.getName());
			//把url的所有role都翻到list中
			for(Role role : needRoles){
				array = new ArrayList<>();
				cfg = new SecurityConfig(role.getName());
				array.add(cfg);
			}
			//一条记录是，一个url，多个Role。
			map.put(permission.getUrl(), array);
		}

	}

	/**
	 * 参数是要访问的url，返回这个url对于的所有权限（或角色）
	 */
	@Override
	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
		if (map == null)
			loadResourceDefine();
		HttpServletRequest request = ((FilterInvocation) object).getHttpRequest();  //获取request
		AntPathRequestMatcher matcher;
		String resUrl;
		for (Iterator<String> iter = map.keySet().iterator(); iter.hasNext();) {    //遍历map
			resUrl = iter.next();
			matcher = new AntPathRequestMatcher(resUrl);
			if (matcher.matches(request)) {        
				//如果有个key的url和这个request匹配上了，那么返回她相应的所有权限。即把url和权限name匹配。
				return map.get(resUrl);
			}
		}
		return null;
	}

	@Override
	public Collection<ConfigAttribute> getAllConfigAttributes() {
		return null;
	}

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}
}
