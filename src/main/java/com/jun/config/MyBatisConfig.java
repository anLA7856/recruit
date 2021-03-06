package com.jun.config;

import org.apache.ibatis.type.JdbcType;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

/**
 * 
 * @author jun
 * @date 2018年3月26日 : 下午9:16:24
 *
 */
@Configuration
public class MyBatisConfig {

	@Autowired
	private DataSource dataSource;

	@Bean(name = "sqlSessionFactory")
	public SqlSessionFactoryBean sqlSessionFactory(
			ApplicationContext applicationContext) throws Exception {
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource);

		org.apache.ibatis.session.Configuration configuration = new org.apache.ibatis.session.Configuration();
		configuration.setMapUnderscoreToCamelCase(true);
		configuration.setJdbcTypeForNull(JdbcType.NULL);
		configuration.setMapUnderscoreToCamelCase(true);
		configuration.setLogImpl(org.apache.ibatis.logging.log4j.Log4jImpl.class);//use log4j log
		sessionFactory.setConfiguration(configuration);
		sessionFactory.setMapperLocations(applicationContext.getResources("classpath:com/jun/mapper/*.xml"));


		return sessionFactory;
	}

}
