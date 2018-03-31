package com.jun.utils;

import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 共用工具类
 * @author jun
 * @date 2018年3月27日 : 下午11:20:24
 *
 */
public class CommonUtil {
    public static String formatDate(Date date){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
        return sdf.format(date);
    }

    public static String createActivateCode(){
        return new Date().getTime() + UUID.randomUUID().toString().replace("-","");
    }
    
    public static boolean checkIfNull(Object... args){
    	for(Object o: args){
    		if(o == null){
    			return false;
    		}
    	}
    	return true;
    }
    
    public static void download(String fileName, String filePath,
    		HttpServletRequest request, HttpServletResponse response) 
    		throws Exception {
    		    //设置响应头和客户端保存文件名
    		    response.setCharacterEncoding("utf-8");
    		    response.setContentType("multipart/form-data");
    		    response.setHeader("Content-Disposition", "attachment;fileName=" + fileName);
    		    //用于记录以完成的下载的数据量，单位是byte
    		    long downloadedLength = 0l;
    		    try {
    		        //打开本地文件流
    		        InputStream inputStream = new FileInputStream(filePath);
    		        //激活下载操作
    		        OutputStream os = response.getOutputStream();
    		        //循环写入输出流
    		        byte[] b = new byte[2048];
    		        int length;
    		        while ((length = inputStream.read(b)) > 0) {
    		            os.write(b, 0, length);
    		            downloadedLength += b.length;
    		        }
    		        // 这里主要关闭。
    		        os.close();
    		        inputStream.close();
    		    } catch (Exception e){
    		        throw e;
    		    }

    		}


}
