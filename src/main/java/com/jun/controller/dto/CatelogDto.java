package com.jun.controller.dto;

import java.util.List;

import com.jun.model.News;
import com.jun.model.NewsType;

/**
 * 用于显示，前台新闻种类的dto。
 * 
 * @author jun
 * @date 2018年4月2日 : 下午8:47:45
 *
 */
public class CatelogDto {
	private int nowCatelog;
	private List<News> newsList;
	private List<NewsType> newsTypeList;

	public List<News> getNewsList() {
		return newsList;
	}

	public void setNewsList(List<News> newsList) {
		this.newsList = newsList;
	}

	public List<NewsType> getNewsTypeList() {
		return newsTypeList;
	}

	public void setNewsTypeList(List<NewsType> newsTypeList) {
		this.newsTypeList = newsTypeList;
	}

	public int getNowCatelog() {
		return nowCatelog;
	}

	public void setNowCatelog(int nowCatelog) {
		this.nowCatelog = nowCatelog;
	}

	@Override
	public String toString() {
		return "CatelogDto [newsList=" + newsList + ", newsTypeList=" + newsTypeList + "]";
	}

}
