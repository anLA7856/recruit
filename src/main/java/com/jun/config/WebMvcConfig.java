package com.jun.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

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
    /**
     * 使配置生效
     */
    @Override
    public void configureDefaultServletHandling(
            DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
    
    /**
     * 用于映射首页
     * @return
     */
    @RequestMapping(value="/", method = RequestMethod.GET)
    public String getHomePage(){
        return "index";
    }
    
    /**
     * 映射静态文件
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
    }
}
