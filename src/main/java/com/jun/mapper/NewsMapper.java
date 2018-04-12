package com.jun.mapper;

import java.util.List;

import com.jun.controller.dto.NewsPart;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

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
	
	@Select("select count(*) from news where user_name=#{0}")
	public int getAllNewsSizeByUsername(String username);
	
	@Select("delete from news where id=#{0}")
	public void deleteNewsById(Integer id);
	
	@Select("select * from news where id=#{0}")
	public News getNewsById(Integer id);
	
	@Update("update news set hitCount=#{0} where id=#{1}")
	public void addNewsHitCount(Long hitCount,Integer id);
	
	/**
	 * 用于在种类页面，获取某个种类的新闻
	 * 
	 * @param id
	 * @return
	 */
	public List<News> getAllNewsBesidesContentByTypeId(@Param("id") Integer id);
	
	/**
	 * 用于在种类页面，获取所有新闻，不分类。
	 * @param id
	 * @return
	 */
	public List<News> getAllNewsBesidesContent();

	/**
	 * 用于获取首页数据，通过id，只获取五条
	 * @param id
	 * @return
	 */
	public List<NewsPart> getFiveNewsByTypeId(@Param("id")Integer id);
	
	/**
	 * 获取所有动态的前五条。
	 * @return
	 */
	public List<NewsPart> getFiveCommonNews();
}
