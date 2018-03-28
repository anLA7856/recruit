package com.jun.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.jun.model.User;

/**
 * 
 * @author jun
 * @date 2018年3月26日 : 下午9:06:26
 *
 */
@Mapper
public interface UserMapper {
	/**
	 * 通过用户名查找这个用户
	 * @param username
	 * @return
	 */
	public User findByUserName(String username);
	/**
	 * 增加一个用户
	 * @param username
	 * @param password
	 * @param validate
	 * @return
	 */
	public int addNewUser(String username,String password,String validate);
	/**
	 * 查看这个用户名有没有人在用了
	 * @param username
	 * @return
	 */
	public int selectUsernameCount(String username);
	/**
	 * 用于账户中，人员点击账户，然后激活
	 * @param code
	 * @return
	 */
	@Update("update user set u_enabled=1 where validate=#{0}")
	public int updateUserUEnable(String code);
	
	/**
	 * 通过validatecode，查询一个用户
	 * @param code
	 * @return
	 */
	@Select("select * from user where validate=#{0}")
	public User findByValidate(String code);
}
