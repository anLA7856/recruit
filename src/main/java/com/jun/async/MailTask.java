package com.jun.async;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

import com.jun.utils.Model;

/**
 * 一个邮件的异步任务，也就是线程
 * @author jun
 *
 */
public class MailTask implements Runnable {

    private String code;
    private String email;
    private JavaMailSender javaMailSender;
    private int operation;

    public MailTask(String code, String email, JavaMailSender javaMailSender,int operation) {
        this.code = code;
        this.email = email;
        this.javaMailSender = javaMailSender;
        this.operation = operation;
    }

    @Override
    public void run() {
        javaMailSender.send(new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                System.out.println("开始发邮件...");
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true,"UTF-8");    //设置字符集
                mimeMessageHelper.setFrom(Model.MAIL_FROM);                                              //设置邮件发送方
                mimeMessageHelper.setTo(email);                                                          //邮件目的方
                mimeMessageHelper.setSubject("一封激活邮件");                                        //设置标题
                StringBuilder sb  = new StringBuilder();
                //以下是拼凑html串，即一个带a标签的串
                sb.append("<html><head></head><body>");                                      

                if(operation==1){
                    sb.append("<a href="+Model.DOMAIN_NAME+"/common/activate.do?code=");
                    sb.append(code);
                    sb.append(">点击激活</a></body>");
                }else{
                    sb.append("是否将您的密码修改为:");
                    sb.append(code.substring(0,8));
                    sb.append("，<a href="+Model.DOMAIN_NAME+"verify.do?code="+code+">");
                    sb.append("点击是</a></body>");
                }

                mimeMessageHelper.setText(sb.toString(),true);

                System.out.println("邮件发送成功...");
            }
        });
    }
}








