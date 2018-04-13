package com.jun.utils;

/**
 * 用来存储一些常量 后期从数据库读取
 * 
 * @author jun
 * @date 2018年3月26日 : 下午8:42:46
 *
 */
public class Model {
	// 用来存储数据库角色
	public static final String ROLE_ADMIN = "ROLE_ADMIN";
	public static final String ROLE_USER = "ROLE_USER";
	public static final String ROLE_PUBLISHER = "ROLE_PUBLISHER";
	public static final String ROLE_INFO = "ROLE_INFO";
	
	
	// 第一次默认的图片
	public static final String DEFAULT_USER_PIC = "/df/headPicLocation/default.png";
	public static final String USER_HEAD_PICS = "headPicLocation";
	public static final String COMMENT_PICS = "commentPicLocation";

	// 发送邮件的邮箱，要与df.properties中的一致
	public static final String MAIL_FROM = "anLA7856@yeah.net";

	// 域名,用作程序中标明本服务器域名
	public static final String DOMAIN_NAME = "http://localhost:8989";

	// 三种操作
	public static final int OPERATION_CLICK_LIKE = 1;
	public static final int OPERATION_REPLY = 2;
	public static final int OPERATION_COMMENT = 3;

	//七个栏目,和数据库一一对应
	public static final int COLLUMN_SHOUYE = 1;
	public static final int COLLUMN_GONGGAO = 2;
	public static final int COLLUMN_ZHENGCEFAGUI = 3;
	public static final int COLLUMN_CHANGJIANWENTI = 4;
	public static final int COLLUMN_ZHAOKAOZHIWEI = 5;
	public static final int COLLUMN_XIANGGUANXIAZAI = 6;
	public static final int COLLUMN_GONGGAOGONGSHI = 7;

}
