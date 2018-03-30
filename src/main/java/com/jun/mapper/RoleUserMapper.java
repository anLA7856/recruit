package com.jun.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.jun.model.Role;

/**
 * 用于操作role_user表以及role表
 * @author jun
 * @date 2018年3月28日 : 下午8:43:40
 *
 */
@Mapper
public interface RoleUserMapper {
	
	/**
	 * 往Role_user表里面添加一条数据。
	 * @param uid
	 * @param roleId
	 * @return
	 */
	@Insert("insert into role_user(role_id,user_id) values(#{0},#{1})")
	public int addNewRoleAndUser(Integer roleId,Integer uid);
	
	
	/**
	 * 通过rolename，去找一个role
	 * @param roleName
	 * @return
	 */
	@Select("select * from role where name=#{0}")
	public Role findRoleByRoleName(String roleName);
	
	/**
	 * 找出该用户所有角色
	 * @param id
	 * @return
	 */
	@Select("SELECT role.* FROM role,role_user WHERE role.`id`=role_user.`role_id` AND role_user.`user_id`=#{0}")
	public List<Role> findRolesByUserId(Integer id);
	
	@Delete("delete from role_user where user_id=#{0}")
	public int deleteAllRolesByUserId(Integer id);
}
