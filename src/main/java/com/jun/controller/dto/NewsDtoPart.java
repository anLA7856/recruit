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
	private Integer id;
	List<NewsPart> list;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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

	@Override
	public String toString() {
		return "NewsDtoPart [name=" + name + ", id=" + id + ", list=" + list + "]";
	}

}
