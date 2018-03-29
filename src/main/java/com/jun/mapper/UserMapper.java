package com.jun.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.jun.model.Role;
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
	
	@Update("update user set name=#{0},telephone=#{1} where username=#{2}")
	public int updateNameAndTelephoneByUserName(String name,String telephone,String username);
	
	/**
	 * 用于数据库中分页显示。
	 * @param start
	 * @param length
	 * @return
	 */
	@Select("select * from user limit #{0},#{1}")
	public List<User> getLimitUsers(Integer start,Integer length);
	
	/**
	 * 获得本表所有用户。
	 * @return
	 */
	@Select("select count(*) from user")
	public int allUserNumbers();
}
