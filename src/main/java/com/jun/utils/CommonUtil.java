package com.jun.utils;

import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 共用工具类
 * 
 * @author jun
 * @date 2018年3月27日 : 下午11:20:24
 *
 */
public class CommonUtil {
	
	public static String formatDate(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
		return sdf.format(date);
	}
/*
 *  创建一个随机码，用于激活用户
 */
	public static String createActivateCode() {
		return new Date().getTime() + UUID.randomUUID().toString().replace("-", "");
	}
/**
 * 检查args数组是否有一个为空
 * @param args
 * @return
 */
	public static boolean checkIfNull(Object... args) {
		for (Object o : args) {
			if (o == null) {
				return false;
			}
		}
		return true;
	}

 /**
  * 用于下载头像流
  * @param fileName
  * @param filePath
  * @param request
  * @param response
  * @throws Exception
  */
	public static void download(String fileName, String filePath, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// 设置响应头和客户端保存文件名
		response.setCharacterEncoding("utf-8");
		response.setContentType("multipart/form-data");
		response.setHeader("Content-Disposition", "attachment;fileName=" + fileName);
		// 用于记录以完成的下载的数据量，单位是byte
		long downloadedLength = 0l;
		try {
			// 打开本地文件流
			InputStream inputStream = new FileInputStream(filePath);
			// 激活下载操作
			OutputStream os = response.getOutputStream();
			// 循环写入输出流
			byte[] b = new byte[2048];
			int length;
			while ((length = inputStream.read(b)) > 0) {
				os.write(b, 0, length);
				downloadedLength += b.length;
			}
			// 这里主要关闭。
			os.close();
			inputStream.close();
		} catch (Exception e) {
			throw e;
		}

	}

	/**
	 * 用于将一个对象的所有属性映射出去，key为fieldName，value为值。
	 * 
	 * @param obj
	 * @return
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 */
	public static Map<String, Object> reflectObject2Map(Object obj) throws IllegalArgumentException, IllegalAccessException {
		Map<String, Object> map = new HashMap<>();
		if (obj == null)
			return null;
		Field[] fields = obj.getClass().getDeclaredFields();
		for (int j = 0; j < fields.length; j++) {
			fields[j].setAccessible(true);
			// 字段名
			String fieldName = fields[j].getName();
			System.out.print(fields[j].getName() + ",");
			// 字段值
			if(fields[j].get(obj) == null){
				continue;
			}
			if (fields[j].getType().getName().equals(java.lang.String.class.getName())) {
				// String type
				try {
					map.put(fieldName,fields[j].get(obj).toString());
					System.out.print(fields[j].get(obj));
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
			} else if (fields[j].getType().getName().equals(java.lang.Integer.class.getName())
					|| fields[j].getType().getName().equals("int")) {
				// Integer type
				try {
					map.put(fieldName,Integer.parseInt(fields[j].get(obj).toString()));
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
			}
		}
		return map;
	}

}
