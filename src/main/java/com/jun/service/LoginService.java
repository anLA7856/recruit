package com.jun.service;

import java.util.Date;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fc.async.MailTask;
import com.fc.util.MyConstant;
import com.fc.util.MyUtil;
import com.jun.mapper.UserMapper;
import com.jun.utils.CommonUtil;

@Service
public class LoginService {
	
	@Autowired
	UserMapper userMapper;
	
	public String addUser(String username,String password){
        //校验邮箱格式
        Pattern p = Pattern.compile("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\\.[a-zA-Z0-9_-]{2,3}){1,2})$");
        Matcher m = p.matcher(username);
        if(!m.matches()){
            return "邮箱格式有问题啊~";
        }
        //校验密码长度
        p = Pattern.compile("^\\w{6,20}$");
        m = p.matcher(password);
        if(!m.matches()){
            return "密码长度要在6到20之间~";
        }
        //检查邮箱是否被注册
        int emailCount = userMapper.selectUsernameCount(username);
        if(emailCount>0){
            return "该邮箱已被注册~";
        }
        String validate = CommonUtil.createActivateCode();
       
        //发送邮件
        taskExecutor.execute(new MailTask(activateCode,user.getEmail(),javaMailSender,1));

        //向数据库插入记录
        userMapper.addNewUser(username, password, validate);

        return "ok";
	}
}
