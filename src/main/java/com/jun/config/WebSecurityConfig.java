package com.jun.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.jun.security.CustomUserService;
import com.jun.utils.MD5Util;


/**
 * 
 * @author jun
 * @date 2018年3月26日 : 下午9:15:50
 *
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserService customerUserService;
    @Autowired
    SessionRegistry sessionRegistry;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();       //将csrf校验关闭。
    	http.authorizeRequests()
                .antMatchers("/index.do").permitAll()     //首页
                .antMatchers("/css/**").permitAll()
                .antMatchers("/font/**").permitAll()
                .antMatchers("/headPicLocation/**").permitAll()
                .antMatchers("/img/**").permitAll()
                .antMatchers("/js/**").permitAll()
                .antMatchers("/common/**").permitAll()   //用于一些通用请求，例如登录注册，新闻详情查看
                //其他地址的访问均需验证权限
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/common/view-login")  //指定登录页是"/login"
                .defaultSuccessUrl("/index.do")  //登录成功后默认跳转到"list"
                .and()
                .logout()
                .logoutUrl("/common/view-logout")
                .logoutSuccessUrl("/common/view-login")  //退出登录后的默认url是"/home"
                .permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    	//首先auth，去urlUserService检查权限。
        auth.userDetailsService(customerUserService).passwordEncoder(new PasswordEncoder() {
        	/**
        	 * 小写。
        	 */
            @Override
            public String encode(CharSequence rawPassword) {
                return MD5Util.encode((String) rawPassword);
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return encodedPassword.equals(MD5Util.encode((String) rawPassword));
            }
        });
    }

    /**
     * session 注册
     * @return
     */
    @Bean
    public SessionRegistry getSessionRegistry(){
        SessionRegistry sessionRegistry=new SessionRegistryImpl();
        return sessionRegistry;
    }

}