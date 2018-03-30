package com.jun.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.jun.model.Role;

/**
 * 
 * @author jun
 * @date 2018年3月30日 : 下午2:44:13
 */
@Mapper
public interface RolePermissionMapper {
	
	/**
	 * 找出permission 对应的所有角色
	 * @param name
	 * @return
	 */
	@Select("SELECT r.* "
			+ "FROM role r,role_permission rp,permission p "
			+ "WHERE p.`name`=#{name} "
			+ "AND p.`id`=rp.`permission_id`"
			+ "AND rp.`role_id`=r.`id`;")
	List<Role> getAllRolesByPermissionName(String name);
	
	/**
	 * 找出所有角色
	 * @return
	 */
	@Select("select * from role")
	List<Role> getAllRoles();
	
	/**
	 * 找出username所对应的所有角色。
	 * @param username
	 * @return
	 */
	@Select("SELECT r.* "
			+ "FROM role r,USER u,role_user ru "
			+ "WHERE u.`id`=ru.`user_id` "
			+ "AND ru.`role_id`=r.`id` "
			+ "AND u.`username`=#{0}")
	List<Role> getAllRolesByUsername(String username);
}
