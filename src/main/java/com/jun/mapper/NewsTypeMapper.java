package com.jun.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.jun.model.NewsType;

/**
 * 用于作为news_type表的mapper
 * @author jun
 * @date 2018年3月31日 : 下午4:48:33
 *
 */
@Mapper
public interface NewsTypeMapper {
	
	@Select("select * from news_type")
	public List<NewsType> getAllNewsTypes();
	
	@Select("select * from news_type where id=#{id}")
	public NewsType getNewsTypeById(Integer id);
}
