package com.jun.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
/**
 * 配置javamail，以及taskExecutor线程池。
 * 
 * @author jun
 *
 */
@Configuration
@PropertySource("classpath:jun.properties")   //读取jun.properties的文件
public class JavaMailConfig {
	
	@Autowired
    private Environment env;
	
	@Bean(name="javaMailSender")
	public JavaMailSenderImpl javaMailSenderImpl() {
		JavaMailSenderImpl javaMailSenderImpl = new JavaMailSenderImpl();
		javaMailSenderImpl.setUsername(env.getProperty("mail.username"));
		javaMailSenderImpl.setPassword(env.getProperty("mail.password"));
		javaMailSenderImpl.setHost(env.getProperty("mail.host"));
		return javaMailSenderImpl;
	}
	
	@Bean(name="taskExecutor")
	public ThreadPoolTaskExecutor threadPoolTaskExecutor(){
		ThreadPoolTaskExecutor threadPoolTaskExecutor = new ThreadPoolTaskExecutor();
		threadPoolTaskExecutor.setCorePoolSize(Integer.parseInt(env.getProperty("spring.taskExecutor.corePoolSize")));
		threadPoolTaskExecutor.setMaxPoolSize(Integer.parseInt(env.getProperty("spring.taskExecutor.maxPoolSize")));
		threadPoolTaskExecutor.setQueueCapacity(Integer.parseInt(env.getProperty("spring.taskExecutor.queueCapacity")));
		return threadPoolTaskExecutor;
	}
}
