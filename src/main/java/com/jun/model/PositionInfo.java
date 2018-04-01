package com.jun.model;

/**
 * 用于映射position_info的表
 * 
 * @author jun
 * @date 2018年4月1日 : 下午9:54:40
 *
 */
public class PositionInfo {
	private Integer id;
	private String username;
	private String positionName;
	private Integer target;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public Integer getTarget() {
		return target;
	}

	public void setTarget(Integer target) {
		this.target = target;
	}

	@Override
	public String toString() {
		return "PositionInfo [id=" + id + ", username=" + username + ", positionName=" + positionName + ", target="
				+ target + "]";
	}

}
