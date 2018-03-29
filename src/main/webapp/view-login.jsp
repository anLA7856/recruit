<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" >
<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/cdn/taglibs.jsp"%>
<head>
    <meta charset="UTF-8"/>
    <title></title>
    <link rel="stylesheet" href="/css/bootstrap/3.3.1/css/bootstrap.min.css"/>
    <style type="text/css">
        body {
            padding-top: 50px;
        }

        .starter-template {
            padding: 40px 15px;
            text-align: center;
        }
    </style>
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">首页</a>
        </div>
        
    </div>
</nav>
<div class="container">
    <div class="starter-template">
    	<!-- 
        <p th:if="${param.logout}" class="bg-warning">已注销登录</p>
        <p th:if="${param.error}" class="bg-danger">æéè¯¯ï¼è¯·éè¯</p>
         -->
        <h2>登录</h2>
        <form class="form-signin" role="form" name="form" action="/login" method="post">
            <div class="form-group">
                <label for="username">邮箱</label>
                <input type="text" class="form-control" name="username" value="" placeholder="请填写正确邮箱"/>
            </div>
            <div class="form-group">
                <label for="password">密码 </label>
                <input type="password" class="form-control" name="password" placeholder="请填写密码，6~20"/>
            </div>
            <input type="submit" id="login" value="Login" class="btn btn-primary"/>
        </form>
    </div>
</div>


</body>
</html>