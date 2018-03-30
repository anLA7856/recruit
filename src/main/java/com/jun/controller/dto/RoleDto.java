package com.jun.controller.dto;
/**
 * 用于在user-modify界面，
 * 封装用户信息以及权限到前端
 * 封装了权限，说明该用户是否有这个权限。
 * @author jun
 * @date 2018年3月30日 : 下午2:58:52
 */

import com.jun.model.Role;

public class RoleDto {
	private int target = 0;
	private Role role;

	public int getTarget() {
		return target;
	}

	public void setTarget(int target) {
		this.target = target;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "RoleDto [target=" + target + ", role=" + role + "]";
	}

	
	
}
