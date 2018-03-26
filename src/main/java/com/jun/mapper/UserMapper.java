package com.jun.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.jun.model.User;

/**
 * 
 * @author jun
 * @date 2018年3月26日 : 下午9:06:26
 *
 */
@Mapper
public interface UserMapper {
	public User findByUserName(String username);
}
