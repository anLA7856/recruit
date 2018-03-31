package com.jun.security;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Iterator;

/**
 * 
 * @author jun
 * @date 2018年3月28日 : 下午11:05:23
 *
 */
@Service
public class WebAccessDecisionManager implements AccessDecisionManager {
	/**
	 * 决定某个认证用户是否有权限。
	 * 检查用户是否够权限访问资源
	 * 参数authentication是从spring的全局缓存SecurityContextHolder中拿到的，里面是用户的权限信息
	 * 参数object是url
	 * 参数configAttributes访问某个url所需的权限
	 */
	@Override
	public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes)
			throws AccessDeniedException, InsufficientAuthenticationException {
		if (null == configAttributes || configAttributes.size() <= 0) {  //不需要任何权限。
			return;
		}
		ConfigAttribute c;
		String needRole;    //需要的角色。
		for (Iterator<ConfigAttribute> iter = configAttributes.iterator(); iter.hasNext();) {
			c = iter.next();
			needRole = c.getAttribute();
			for (GrantedAuthority ga : authentication.getAuthorities()) {  //看当前用户拥有的权限
				if (needRole.trim().equals(ga.getAuthority())) {         
					//只要当前用户所拥有的的权限，有一项属于cofigAttributes就好了，交集而不是包含关系
					return;
				}
			}
		}
		//注意：执行这里，后台是会抛异常的，但是界面会跳转到所配的access-denied-page页面
		throw new AccessDeniedException("no right");
	}

	@Override
	public boolean supports(ConfigAttribute attribute) {
		return true;
	}

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}
}
