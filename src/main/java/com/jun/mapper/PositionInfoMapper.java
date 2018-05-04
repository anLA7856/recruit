package com.jun.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.jun.model.PositionInfo;

/**
 * 用于给positioninfo的mapper。
 * 
 * @author jun
 * @date 2018年4月1日 : 下午10:15:57
 *
 */
@Mapper
public interface PositionInfoMapper {

	@Insert("insert into position_info(username,position_name,target) value(#{0},#{1},0)")
	public int addNewPostionInfo(String username, String positionName);

	@Select("select * from position_info where username=#{0} limit #{1},#{2}")
	public List<PositionInfo> getLimitPositionInfos(String username,Integer start, Integer length);
	
	@Select("select count(*) from position_info where username=#{0}")
	public int getAllSizePositionInfosByUsername(String username);
	
	@Select("update position_info set target=#{0} where id=#{1}")
	public void updatePositionState(Integer target,Integer id);
	
	@Select("select * from position_info where target=1")
	public List<PositionInfo> getAllEnablePositions();
	
	@Select("select * from position_info where id=#{0}")
	public PositionInfo getPositionInfoById(Integer id);
	
}
