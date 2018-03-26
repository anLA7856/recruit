package com.jun.config;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;

/**
 * 用于配置java mail
 * @author jun
 * @date 2018年3月23日 : 上午9:38:29
 */
@Configuration
@EnableAutoConfiguration
public class JavaMailConfiguration {
	
	@Bean
	@ConfigurationProperties(prefix="mail")
	public JavaMailSenderImpl initialJavaMailSenderImpl(){
		return new JavaMailSenderImpl();
	}
}
