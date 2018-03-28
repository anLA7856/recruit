package com.jun;

import static org.springframework.boot.SpringApplication.run;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

/**
 * 用于 启动应用程序 启动器
 * 
 * @author jun
 * @date 2018年3月23日 : 上午10:17:27
 */
@ComponentScan(basePackages ="com.jun")
@SpringBootApplication
public class Application implements EmbeddedServletContainerCustomizer{
    public static void main(String[] args) {
        ConfigurableApplicationContext run = run(Application.class, args);
    }

	@Override
	public void customize(ConfigurableEmbeddedServletContainer configurableEmbeddedServletContainer) {
        configurableEmbeddedServletContainer.setPort(8989);  		
	}
    
    

}
