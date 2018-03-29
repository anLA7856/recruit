package com.jun.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
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
	
//	@Bean(name="stringHttpMessageConverter")
//	public StringHttpMessageConverter stringHttpMessageConverter(){
//		StringHttpMessageConverter stringHttpMessageConverter = new StringHttpMessageConverter();
//		List<MediaType> list = new ArrayList<>();
//		//list.add(new MediaType("text html; charset=UTF-8"));
//		stringHttpMessageConverter.setSupportedMediaTypes(list);
//		return stringHttpMessageConverter;
//	}
	
	
	/**
	 * 配置视图解析器
	 * @return
	 */
    @Bean  
    public InternalResourceViewResolver viewResolver(){  
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();  
        //viewResolver.setPrefix("/content/");  
        viewResolver.setSuffix(".jsp");  
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
     * 映射静态文件
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
    }
}
