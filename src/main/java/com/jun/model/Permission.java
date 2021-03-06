package com.jun.model;

/**
 * 用于映射权限表
 * 
 * @author jun
 * @date 2018年3月26日 : 上午9:04:43
 */
public class Permission {
	private Integer id;
	private String name;
	private String description;
	private String url;
	private String method;

	public Permission() {

	}

	public Permission(Integer id, String name, String description, String url, String method) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.url = url;
		this.method = method;
	}

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	@Override
	public String toString() {
		return "Permission [id=" + id + ", name=" + name + ", description=" + description + ", url=" + url + ", method="
				+ method + "]";
	}

}
