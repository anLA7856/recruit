package com.jun.security;

import org.springframework.security.core.GrantedAuthority;

/**
 * 
 * @author jun
 * @date 2018年3月26日 : 下午9:08:25
 *
 */
public class UrlGrantedAuthority implements GrantedAuthority {

    private String permissionUrl;
    private String method;

    public String getPermissionUrl() {
        return permissionUrl;
    }

    public void setPermissionUrl(String permissionUrl) {
        this.permissionUrl = permissionUrl;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public UrlGrantedAuthority (String permissionUrl, String method) {
        this.permissionUrl = permissionUrl;
        this.method = method;
    }

    @Override
    public String getAuthority() {
        return this.permissionUrl + ";"+this.method;
    }
}
