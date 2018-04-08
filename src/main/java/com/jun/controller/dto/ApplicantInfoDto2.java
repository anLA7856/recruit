package com.jun.controller.dto;

/**
 * 用于在 职位发布者 看职位页面，所封装的ApplicantInfo部分数据。
 * 
 * @author jun
 * @date 2018年4月8日 : 下午11:26:19
 *
 */
public class ApplicantInfoDto2 {
	private Integer id;
	private Integer name;
	private Integer state;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getName() {
		return name;
	}

	public void setName(Integer name) {
		this.name = name;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "ApplicantInfoDto2 [id=" + id + ", name=" + name + ", state=" + state + "]";
	}

}
