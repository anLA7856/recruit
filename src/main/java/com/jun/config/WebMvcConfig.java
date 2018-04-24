package com.jun.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

/**
 * 是Spring 配置生效
 * @author jun
 *
 */
@Configuration
@EnableWebMvc
@Controller
public class WebMvcConfig extends WebMvcConfigurerAdapter{
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/home").setViewName("/home");
	}
	
	
	/**
	 * 配置视图解析器
	 * @return
	 */
    @Bean  
    public InternalResourceViewResolver viewResolver(){  
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();  
        //viewResolver.setPrefix("/templates/");  
        //viewResolver.setSuffix(".html");  
        viewResolver.setViewClass(JstlView.class);  
        return  viewResolver;  
    }


    @Bean(name = "multipartResolver")
    public CommonsMultipartResolver initCommonsMultipartResolver(){
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        resolver.setDefaultEncoding("utf-8");
        resolver.setMaxUploadSize(10240000l);
        return resolver;
    }


    /**
     * 使配置生效
     */
    @Override
    public void configureDefaultServletHandling(
            DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
    

    
    /**
     * 映射静态文件
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
    }
}
