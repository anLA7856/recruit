package com.jun.springboot;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

/**
 * 对spring mvc 进行配置
 * 
 * @author jun
 * @date 2018年3月23日 : 上午11:29:46
 */
@Configuration
@EnableAutoConfiguration
@EnableWebMvc // 开启 spring mvc 支持。
@ComponentScan(basePackages = "com.jun.controller")
public class WebMvcConfig extends WebMvcConfigurerAdapter {

	@Bean
	public InternalResourceViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/view/");
		viewResolver.setSuffix(".jsp");
		viewResolver.setContentType("text/html");
		return viewResolver;
	}
	
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}
	
	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		 super.configureViewResolvers(registry);
	     registry.viewResolver(viewResolver());
	}

	/**
	 *    * 如果项目的一些资源文件放在/WEB-INF/resources/下面
     * 在浏览器访问的地址就是类似：https://host:port/projectName/WEB-INF/resources/xxx.css
     * 但是加了如下定义之后就可以这样访问：
     * https://host:port/projectName/resources/xxx.css
	 */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// addResourceLocations指的是文件放置的目录，addResourceHandler指的是对外暴露的访问路径
		registry.addResourceHandler("/common/**").addResourceLocations("/WEB-INF/common/");
	}
	
	/**
	 * 用于将默认的8080端口，直接映射到/index请求下
	 */
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		super.addViewControllers(registry);
        registry.addViewController("/").setViewName("/index");
	}

}
