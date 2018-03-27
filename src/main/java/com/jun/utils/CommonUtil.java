package com.jun.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * 共用工具类
 * @author jun
 * @date 2018年3月27日 : 下午11:20:24
 *
 */
public class CommonUtil {
    public static String formatDate(Date date){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
        return sdf.format(date);
    }

    public static String createActivateCode(){
        return new Date().getTime() + UUID.randomUUID().toString().replace("-","");
    }
}
