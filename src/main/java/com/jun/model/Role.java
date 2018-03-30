package com.jun.model;

/**
 * 
 * @author jun
 * @date 2018年3月26日 : 上午9:08:51
 */
public class Role {
	private Integer id;
	private String name;

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

	public Role(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Role() {
	}

	@Override
	public String toString() {
		return "Role [id=" + id + ", name=" + name + "]";
	}

	
	@Override
	public boolean equals(Object obj) {
		if(!(obj instanceof Role)){
			return false;
		}
		Role cpRole = (Role)obj;
		if((cpRole.getId() == this.getId()) && (cpRole.getName().equals(this.getName()))){
			return true;
		}
		return false;
	}
}




