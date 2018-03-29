package com.jun.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.jun.model.Role;

@Mapper
public interface RolePermissionMapper {
	
	@Select("SELECT r.* "
			+ "FROM role r,role_permission rp,permission p "
			+ "WHERE p.`name`=#{name} "
			+ "AND p.`id`=rp.`permission_id`"
			+ "AND rp.`role_id`=r.`id`;")
	List<Role> getAllRolesByPermissionName(String name);
}
