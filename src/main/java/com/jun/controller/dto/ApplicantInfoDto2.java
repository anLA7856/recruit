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
	private String name;
	private int target; // state变量不能为integer，这样太使用==则是使用引用！

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

	public int getTarget() {
		return target;
	}

	public void setTarget(int target) {
		this.target = target;
	}

	@Override
	public String toString() {
		return "ApplicantInfoDto2 [id=" + id + ", name=" + name + ", target=" + target + "]";
	}

}
