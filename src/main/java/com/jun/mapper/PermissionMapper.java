package com.jun.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jun.model.Permission;

/**
 * used to mapper the table `permission`
 * 
 * @author jun
 * @date 2018年3月26日 : 上午9:10:46
 */
@Mapper
public interface PermissionMapper {
	public List<Permission> findAll();

	public List<Permission> findPermissionByUserId(Integer id);
	
	public List<Permission> findPermissionByRoleAndUserId(@Param("id")Integer id,@Param("role")String role);
}
