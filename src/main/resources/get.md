记录项目过程中学到的新知识
0、浏览器异常码：
	406: (Not Acceptable)
	400 - 错误的请求。 ·401 - 访问被拒绝
1、linux下面，讲mysql设置为忽略表名大小写
    注意加上[mysqld]在前面
    https://www.cnblogs.com/jun1019/p/7073227.html
    
2、thymeleaf引入fragment相关操作
       注意路径问题
       注意元素闭合问题
   https://blog.csdn.net/whatlookingfor/article/details/78321451
   https://blog.csdn.net/pdw2009/article/details/44679409
   
3、thymeleaf中的th:if判断表达式取值
	注意 <>，不能直接写，要写成lt，gt
	https://blog.csdn.net/qq_31424825/article/details/79052192
	
4、如果发现没有更新即使，记得去clean install一下。
5、关于在thymeleaf里面直接调用java方法，直接把它丢到request里面，然后调用就好
6、关于mybatis里面使用多个参数，一定要用@param注释，如果一个参数就可以不用。
7、在thymeleaf中，通过js获取后端传值，一定要加一个inline例如：
	<script th:inline="javascript" th:if="${news!=null}">
8、在thymeleaf中，只需要把 & 替换成  &amp;  
9、idea热部署无效问题：
   tomcat项目：https://blog.csdn.net/zhenyushao/article/details/53010273
   spring-boot项目：https://hacpai.com/article/1490191094543