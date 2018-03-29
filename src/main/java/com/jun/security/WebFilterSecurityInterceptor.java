package com.jun.security;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.SecurityMetadataSource;
import org.springframework.security.access.intercept.AbstractSecurityInterceptor;
import org.springframework.security.access.intercept.InterceptorStatusToken;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * 过滤器
 * @author jun
 * @date 2018年3月28日 : 下午11:08:22
 *
 */
@Service
public class WebFilterSecurityInterceptor extends AbstractSecurityInterceptor implements Filter {

	//配置文件注入
    @Autowired
    private FilterInvocationSecurityMetadataSource securityMetadataSource;

    @Autowired
    public void setWebAccessDecisionManager(WebAccessDecisionManager webAccessDecisionManager) {
        super.setAccessDecisionManager(webAccessDecisionManager);
    }


    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }
   //登陆后，每次访问资源都通过这个拦截器拦截
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        FilterInvocation fi = new FilterInvocation(request, response, chain);
        invoke(fi);
    }


    /**
     * fi里面有一个被拦截的url
     * 里面调用WebInvocationSecurityMetadataSource的getAttributes(Object object)这个方法获取fi对应的所有权限
     * 再调用WebAccessDecisionManager的decide方法来校验用户的权限是否足够
     * @param fi
     * @throws IOException
     * @throws ServletException
     */
    public void invoke(FilterInvocation fi) throws IOException, ServletException {
        InterceptorStatusToken token = super.beforeInvocation(fi);
        try {
        	//执行下一个拦截器
            fi.getChain().doFilter(fi.getRequest(), fi.getResponse());
        } finally {
            super.afterInvocation(token, null);
        }
    }


    @Override
    public void destroy() {

    }

    @Override
    public Class<?> getSecureObjectClass() {
        return FilterInvocation.class;

    }

    @Override
    public SecurityMetadataSource obtainSecurityMetadataSource() {
        return this.securityMetadataSource;
    }
}
