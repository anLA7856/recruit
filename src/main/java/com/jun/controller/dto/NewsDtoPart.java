package com.jun.controller.dto;
/**
 * 用于映射首页某一块
 * @author jun
 * @date 2018年4月11日 : 下午11:40:08
 *
 */

import java.util.List;

public class NewsDtoPart {
	private String name;
	List<NewsPart> list;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<NewsPart> getList() {
		return list;
	}

	public void setList(List<NewsPart> list) {
		this.list = list;
	}

}

/**
 * 用于映射部分新闻消息
 * 
 * @author jun
 * @date 2018年4月11日 : 下午11:41:38
 *
 */
class NewsPart {
	private String title;
	private String createTime;
	private String hitCount;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getHitCount() {
		return hitCount;
	}

	public void setHitCount(String hitCount) {
		this.hitCount = hitCount;
	}

}
