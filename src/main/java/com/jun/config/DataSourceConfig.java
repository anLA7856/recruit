package com.jun.config;

import java.beans.PropertyVetoException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import com.mchange.v2.c3p0.ComboPooledDataSource;
/**
 * 主要用来配置数据源
 * @author jun
 * @date 2018年3月26日 : 下午9:16:40
 *
 */
@Configuration
@PropertySource("classpath:jun.properties")
public class DataSourceConfig {
	@Autowired
    private Environment env;
	
    @Bean(name="dataSource")
    @ConfigurationProperties(prefix="jdbc.mysql")
    public ComboPooledDataSource dataSource() throws PropertyVetoException {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass(env.getProperty("jdbc.mysql.driverClassName"));
        dataSource.setJdbcUrl(env.getProperty("jdbc.mysql.url"));
        dataSource.setUser(env.getProperty("jdbc.mysql.username"));
        dataSource.setPassword(env.getProperty("jdbc.mysql.password"));
        dataSource.setMaxPoolSize(20);
        dataSource.setMinPoolSize(5);
        dataSource.setInitialPoolSize(10);
        dataSource.setMaxIdleTime(300);
        dataSource.setAcquireIncrement(5);
        dataSource.setIdleConnectionTestPeriod(60);
        
        return dataSource;
    }
    
    
}

