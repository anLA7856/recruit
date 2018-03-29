package com.jun.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author jun
 * @date 2018年3月26日 : 上午9:08:17
 */
public class User implements UserDetails {
	private Integer id;
	private String username;
	private String name;
	private String password;
	private Integer uEnabled;
	private String email;
	private String telephone;
	private List<? extends GrantedAuthority> authorities;

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}



	public Integer getuEnabled() {
		return uEnabled;
	}

	public void setuEnabled(Integer uEnabled) {
		this.uEnabled = uEnabled;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public void setAuthorities(List<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", enabled=" + uEnabled + "]";
	}

	public User() {

	}

	public User(Integer id, String username, String password, Integer uEnabled, String email, String telephone,
			List<? extends GrantedAuthority> authorities) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.uEnabled = uEnabled;
		this.email = email;
		this.telephone = telephone;
		this.authorities = authorities;
	}

	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public void setGrantedAuthorities(List<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return uEnabled == 1;
	}

	@Override
	public boolean isAccountNonLocked() {
		return uEnabled == 1;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	

}
