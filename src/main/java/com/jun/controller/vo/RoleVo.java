package com.jun.controller.vo;

import java.util.Arrays;

/**
 * 用于权限修改页面，向后台提交数据封装
 * 
 * @author jun
 * @date 2018年3月30日 : 下午5:12:23
 */
public class RoleVo {
	private String username;
	private String name;
	private String telephone;
	private String uEnabled;
	private String[] role;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String[] getRole() {
		return role;
	}

	public void setRole(String[] role) {
		this.role = role;
	}

	public String getuEnabled() {
		return uEnabled;
	}

	public void setuEnabled(String uEnabled) {
		this.uEnabled = uEnabled;
	}

	@Override
	public String toString() {
		return "RoleVo [username=" + username + ", name=" + name + ", telephone=" + telephone + ", uEnabled=" + uEnabled
				+ ", role=" + Arrays.toString(role) + "]";
	}

}
