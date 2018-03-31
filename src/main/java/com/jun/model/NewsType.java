package com.jun.model;

/**
 * 用于映射新闻类型
 * 
 * @author jun
 * @date 2018年3月31日 : 下午4:47:14
 *
 */
public class NewsType {
	private Integer id;
	private String newsType;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNewsType() {
		return newsType;
	}

	public void setNewsType(String newsType) {
		this.newsType = newsType;
	}

	@Override
	public String toString() {
		return "NewsType [id=" + id + ", newsType=" + newsType + "]";
	}

}
