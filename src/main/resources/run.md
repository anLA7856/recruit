##运行该项目的步骤

1.  首先 git clone该项目到本地
2.  下载mysql，redis，密码均为123456
注意redis命令：
卸载服务：redis-server --service-uninstall
开启服务：redis-server --service-start
停止服务：redis-server --service-stop
查看redis密码：
　redis-cli.exe -h 127.0.0.1 -p 6379
  config get requirepass
  config set requirepass "yourpassword"//设置当前密码,服务重新启动后又会置为默认,临时的
直接使用配置文件启动（记得在配置文件中修改密码）
  redis-server redis.windows.conf
  
3. 待续
  