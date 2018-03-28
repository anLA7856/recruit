package com.jun.mapper;

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
	public int addNewRoleAndUser(Integer uid,Integer roleId);
	
	
	/**
	 * 通过rolename，去找一个role
	 * @param roleName
	 * @return
	 */
	@Select("select * from role where name=#{0}")
	public Role findRoleByRoleName(String roleName);
}
