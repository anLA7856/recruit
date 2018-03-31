package com.jun.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.jun.model.News;

/**
 * 用于给news的mapper
 * @author jun
 * @date 2018年3月31日 : 下午5:38:38
 *
 */
@Mapper
public interface NewsMapper {
	/**
	 * 用于向数据库中，增加一条新闻消息。
	 * @param news
	 * @return
	 */
	public int addNewNews(News news);
	
	/**
	 * 通过id，去更新一条消息
	 * @param id
	 * @return
	 */
	public int updateNews(News news);
	
	/**
	 * 用于分页查询中，获取start到start+length的长度。
	 * 查询到本人发布的所有的数据。
	 * @param start
	 * @param length
	 * @return
	 */
	public List<News> getLimitNews(@Param("start")int start,@Param("length")int length,@Param("username")String username);
	
	/**
	 * 因为内容太长，所以，这个是不拿内容的分页查询。
	 * @param start
	 * @param length
	 * @param username
	 * @return
	 */
	public List<News> getLimitNewsBesidesContent(@Param("start")int start,@Param("length")int length,@Param("username")String username);
	
}
