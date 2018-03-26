package com.jun.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
/**
 * 配置  Spring config的地方
 * @author jun
 * @date 2018年3月23日 : 上午10:08:50
 */
@Configuration
@EnableAutoConfiguration
public class SpringConfiguation {
		
	/**
	 * 注入   ThreadPoolTaskExecutor
	 * @return
	 */
	@Bean
	@ConfigurationProperties(prefix="spring.taskExecutor")
	public ThreadPoolTaskExecutor initialThreadPoolTaskExecutor(){
		return new ThreadPoolTaskExecutor();
	}
	
	
}
