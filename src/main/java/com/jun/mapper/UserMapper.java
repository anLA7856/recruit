package com.jun.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.jun.model.User;

@Mapper
public interface UserMapper {
	public User findByUserName(String username);
}
