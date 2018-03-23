package com.jun.springboot;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * 用于配置redis
 * @author jun
 * @date 2018年3月23日 : 上午9:30:25
 */
@Configuration
@EnableAutoConfiguration
public class RedisConfiguration {
	
	/**
	 * 配置redis pool 的config
	 * @return
	 */
	@Bean
	@ConfigurationProperties(prefix="redisPool")
	public JedisPoolConfig initialJedisPoolConfig(){
		return new JedisPoolConfig();
	}
	
	/**
	 * 配置获得redis pool
	 * @return
	 */
	@Bean
	@ConfigurationProperties(prefix="redis")
	public JedisPool initialJedisPool(){
		return new JedisPool();
	}
}
