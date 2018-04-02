package com.jun.controller.dto;

import java.util.List;

import com.jun.model.News;
import com.jun.model.NewsType;
import com.jun.model.User;

/**
 * 用于新闻界面，封装数据。
 * 
 * @author jun
 * @date 2018年4月2日 : 下午7:13:09
 *
 */
public class NewsDto {
	private User user;
	private News news;
	private List<NewsType> newsTypes;

	public News getNews() {
		return news;
	}

	public void setNews(News news) {
		this.news = news;
	}

	public List<NewsType> getNewsTypes() {
		return newsTypes;
	}

	public void setNewsTypes(List<NewsType> newsTypes) {
		this.newsTypes = newsTypes;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "NewsDto [user=" + user + ", news=" + news + ", newsTypes=" + newsTypes + "]";
	}

}
