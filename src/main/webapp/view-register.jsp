<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" >
<head >
    <meta charset="UTF-8"/>
    <title>æ³¨å</title>
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
<link rel="stylesheet" href="/cdn/bootstrap/3.3.1/css/bootstrap.min.css"/>

<!-- jquery -->
<script type='text/javascript' src='/cdn/jquery/1.11.3/jquery.min.js'></script>
<!-- bootstrap -->
<script type='text/javascript'
	src='/cdn/bootstrap/3.3.6/js/bootstrap.min.js'></script>
	
<script type="text/javascript">
	
	 $(function () {
		 
		 $("#login").click(function (){
			 var username = $("#username").val();
			 var password = $("#password").val();
			 $("#progress").modal('show');
			 $.post(
					 "/common/register",
			 	{
			 		username:username,
			 		password:password
			 	},function(date){
			 		debugger;
			 		$("#progress").modal('hide');
			 		if(date=="ok"){
			 			alert("æ³¨åæåï¼è¯·ç»å½é®ç®±æ ¡éª");
			 			self.location='/'; 
			 		}else{
			 			alert("æ³¨åå¤±è´¥"+date);
			 		}
			 	}	 
			 
			 );
			 
		 });
			 
			 
		 
		
	 });
	

</script>
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<a class="navbar-brand" href="#">加载中</a>
			</div>
			
		</div>
	</nav>




<div class="container">
    <div class="starter-template">
        <h2>注册账号</h2>
        <form class="form-signin" role="form" name="form" action="/register" method="post">
            <div class="message">
            	
            </div>
            <div class="form-group">
                <label for="username">邮箱</label>
                <input type="text" class="form-control required" name="username" value="" placeholder="请输入邮箱" id="username"/>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" class="form-control required" name="password" placeholder="密码" id="password"/>
            </div>
            <input type="button" id="login" value="æ³¨å" class="btn btn-primary"/>
        </form>
    </div>
    
   
</div>


</body>
</html>