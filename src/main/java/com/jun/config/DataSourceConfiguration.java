package com.jun.config;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;  
/**
 * 
 * @author jun
 * @date 2018年3月23日 : 上午8:53:33
 */
@Configuration
@EnableAutoConfiguration
public class DataSourceConfiguration {
	
	@Bean
	@ConfigurationProperties(prefix="jdbc.mysql")  //配置前缀，自动反射导入
	public DataSource InitialDataSource(){
		return new BasicDataSource();
	}
}
