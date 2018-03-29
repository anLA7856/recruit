var isCityClick = false;
var isNewListHover = false;
var username_t = "";
var uname_t = "";
var unameunid_t = "";
var ucode_t = "";
var umobile_t = "";
var uemail_t = "";
var ymh_login_c = 0;

$(document).ready(function() {
	var intIndex = function() {
		// $.newsMsgInit("快讯在这里调用", "http://www.baidu.com");
		// 载入时显示的内容 1秒后显示
		setTimeout("$.loadingInit()", 1000);
		if ($.isEmpty($(".search .text").val().trim())) {
			$(".search .initial").show();
		};
		$(".search .text").keydown(function() {
					$(".search .initial").hide();
				});
		$(".search .text").keypress(function() {
			if (event.keyCode == 13) {
				window
						.open("/oadata/e_main.nsf/f_or_adb_New?OpenForm&SearchType=KeyWordSearch&searchkey="
								+ encodeURI($(".search .text").val()))
			}
		});
		$(".search .text").focusout(function() {
					if ($.isEmpty($(this).val().trim())) {
						$(".search .initial").show();
					}
				});
		$(".search .initial").bind("click", function() {
					$(".search .text").focus();
				})
		$(".search .button").click(function() {
			var _val = $(".search .text").val().trim();
			window
					.open("/oadata/e_main.nsf/f_or_adb_New?OpenForm&SearchType=KeyWordSearch&searchkey="
							+ encodeURI($(".search .text").val()));

		});

		$(".apply").hover(function() {
					$(this).find(".applyList").show();
				}, function() {
					$(this).find(".applyList").hide();
				});
		$(".cityContent").click(function(event) {
					var e = event || window.event;
					var _this = $(".cityContent");
					e.stopPropagation()
					if (_this.hasClass("cityClick")) {
						_this.removeClass("cityClick");
						$(".newImg").fadeIn(300);
						$(".city .newList").hide();
						isCityClick = false;
					} else {
						_this.addClass("cityClick");
						$(".newImg").fadeOut(300);
						$(".city .newList").show();
						isCityClick = true;
					}
				});
		$(".newList").mouseenter(function() {
					isNewListHover = true;
				});
		$(".newList").mouseleave(function() {
					isNewListHover = false;
				});
		$(document).click(function() {
					if (isCityClick && !isNewListHover) {
						$(".cityContent").removeClass("cityClick");
						$(".newImg").fadeIn(300);
						$(".city .newList").hide();
						isCityClick = false;
						isNewListHover = false;
					}
				});
		$(".resource dt[id!=zdtj]").hover(function() {
					var _this = $(this);
					_this.addClass("hover");
					var ul = _this.find("ul");
					ul.css({
								"top" : -(ul.height() - _this.height()) / 2
							}).show();
				}, function() {
					$(this).removeClass("hover");
					$(this).find("ul").hide();
				});
		$("#newsTab li").live("click", function() {
					$(this).addClass("click").siblings("li")
							.removeClass("click");
					$("#infoList>ul").hide().eq($(this).index()).show();
					showMoreTag();
				});
		// 列表新闻轮播
		$(".news").wheelGo({
					_speed : 2000,
					interval : 86400000,
					mode : "fade",
					sumShow : 2
				});
		// 图片新闻轮播
		$(".imgNews").wheelGo({
					_speed : 100,
					interval : 86400000,
					mode : "fade",
					sumShow : 2,
					speed : 100
				});

		// 内部期刊不需要轮播
		$(".periodicalContent").wheelGo({
					_speed : 2000,
					interval : 86400000,
					sumShow : 2,
					view : $(".periodicalContent .view"),
					sumCenter : 1,
					butLeft : $(".periodicalContent .periodicalLeft"),
					butRight : $(".periodicalContent .periodicalRight")
				});
		$(".floating_ads").click(function() {
					$("#ssFrm").attr("src","/oadata/App_CollectSuggestion.nsf/f_new_suggests?openform");
					$.suggestShow();
				});
		$(".floating_ads2").click(function() {
					$("#ssFrm").attr("src","/oadata/App_SuggestCollect.nsf/f_new_suggests?openform");
					$.suggestShow();
				});
		$("#newsTab li").first().click();
		//公司新闻及图片的渲染
		$("#cpnNews dd").hover(function(){$(this).addClass("hover");$("#imgSums li").get($("#cpnNews dd").index(this)).click();},function(){$(this).removeClass("hover");});
		$("#imgSums li").click(function(){$("#cpnNews dd").removeClass("hover");var _o=$("#cpnNews dd").get($("#imgSums li").index(this));$(_o).addClass("hover")})
		//资讯公告渲染
		$("#infoList li").hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");});
}

	// ////------------------------------------
	var json = {"serDateTime":"2016-05-27&nbsp;&nbsp;星期五","loginbar":{"username":"龙帆","userUrl":"/oadata/AIS_Org.nsf/Fwrite/48257A860022D2FF48257D18000AC019?EditDocument","userDept":"信息化服务中心","userDeptUrl":"","uname":"gzlongfan","ucode":"7E6D48257D18000ABFFB","umobile":"18620011701","uemail":"","unid":"48257A860022D2FF48257D18000AC019"},"appList":[{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_NewsCenter.nsf","title":"新闻管理"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_NoticeManage.nsf","title":"公告管理"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_companyqb.nsf","title":"工作签报"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_yjptFlow.nsf","title":"佣金补提"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_ShengOAZhangHaoYeWuGongDan.nsf","title":"省OA账号和邮箱申请"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/docdata/e_jkywzsk.nsf/pageleft?openform&mainTarget=/oadata/docdata/e_jkywzsk.nsf/mainform_first?OpenForm","title":"文件共享"}],"newList":{"historyLink":[{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_companyqb.nsf&action=newdraft","title":"工作签报"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_prjMgr.nsf&action=newdraft","title":"督办流程"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_meetingmanage.nsf&action=newdraft","title":"会议管理"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_yjptFlow.nsf&action=newdraft","title":"佣金补提"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_ShengOAZhangHaoYeWuGongDan.nsf&action=newdraft","title":"省OA账号和邮箱申请"},{"url":"http://gz1.gd.unicom.local:8080/easth/e_quickcenter2.nsf/mainform?openform","title":"任务中心"}],"appList":[{"type":"","apps":[]}]},"cityList":[{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_companyqb.nsf","title":"签报","num":"0"},{"url":"/oadata/e_main.nsf/index?openForm&leftTarget=/oadata/Sys_ApproveDataEven.nsf/pageleft?openform&mainTarget=/oadata/Sys_ApproveDataEven.nsf/v_all_SysApproveEven?OpenForm","title":"流程","num":"0"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_prjMgr.nsf","title":"督办","num":"0"},{"url":"#","title":"立项","num":"0"},{"url":"http://gz1.gd.unicom.local:8080/easth/e_quickcenter3.nsf/v_all_approve?openform","title":"任务","num":"0"},{"url":"/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_ywlhyzglxt.nsf","title":"验证","num":"0"},{"url":"","title":"客响","num":"0"},{"url":"","title":"营业","num":"0"}],"cpnNews":[{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=8E6FC1A638CE560A48257FB8003AF78F","imgLink":"/oadata/appfiles/NewsAttachment_2016.nsf/Fwrite/157C5F3E5FF33B3348257FB9000AB638/$File/介绍会现场_副本.jpg","isTop":"","isRed":"","tit":"集团公司企业发展部杨学钰副总经理一行到广州市分公司调研","title":"集团公司企业发展部杨学钰副总经理一行到广州市分公司调研","creater":"杨蔼","scanCount":"439","reviewCount":"9","creatDate":"05-19 18:44"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=3FE71A87CBBECBE448257FB80021FFB5","imgLink":"/oadata/appfiles/NewsAttachment_2016.nsf/Fwrite/671CBEA09C93A4D848257FBC0007937C/$File/首页图.png","isTop":"","isRed":"","tit":"广州联通第五届5•17网购节掀\"沃4G+\"风暴","title":"广州联通第五届5•17网购节掀\"沃4G+\"风暴","creater":"邓丽妍","scanCount":"99","reviewCount":"2","creatDate":"05-19 14:11"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=5BB90E58E849264E48257FB5004038E4","imgLink":"/oadata/appfiles/NewsAttachment_2016.nsf/Fwrite/55087A6B2CC97BDE48257FB500418933/$File/IMG_7781_副本.jpg","isTop":"","isRed":"","tit":"从严从实 破局担当 广州联通启动管理干部一线调研行动","title":"从严从实 破局担当 广州联通启动管理干部一线调研行动","creater":"张颖2","scanCount":"576","reviewCount":"3","creatDate":"05-16 19:41"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=68DD7DB7EE1721B748257FB5000F9775","imgLink":"/oadata/appfiles/NewsAttachment_2016.nsf/Fwrite/C926076E107A6AE748257FB500156269/$File/0515信息港论坛2_编辑.jpg","isTop":"","isRed":"","tit":"广州联通斩获中国通信与“互联网+”应用优秀成果金奖","title":"广州联通斩获中国通信与“互联网+”应用优秀成果金奖","creater":"杨蔼","scanCount":"239","reviewCount":"8","creatDate":"05-16 10:50"}],"infoList":[{"moreurl":"","type":"公司新闻","width":"75","news":[{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=D09CF0DF0EBEF17848257FBD00082267","title":"提高安全责任意识，防范安全事故发生—从化区销售公司安全生......","creater":"李秀霞","scanCount":"&nbsp;35","reviewCount":"&nbsp;&nbsp;5","isTop":"","isRed":"","sortDate":"2016-05-24 09:28","createDate":"05-24 09:28"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=B10CABBD2625344B48257FBC0023509E","title":"PMS3.0系统培训顺利开展","creater":"谢梅","scanCount":"&nbsp;39","reviewCount":"&nbsp;&nbsp;0","isTop":"","isRed":"","sortDate":"2016-05-23 14:25","createDate":"05-23 14:25"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=19FD2B1EB5BB13BD48257FBC000AB0B4","title":"生辰记录韶华，拼搏定格青春—暨番禺销售公司5月员工生日会","creater":"谢炳坤","scanCount":"&nbsp;29","reviewCount":"&nbsp;&nbsp;0","isTop":"","isRed":"","sortDate":"2016-05-23 09:56","createDate":"05-23 09:56"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=930979AEB6AE43FA48257FB800251207","title":"一鼓作气，再创辉煌——黄埔区分公司召开楼宇突破行动宣贯大......","creater":"王皎皎","scanCount":"112","reviewCount":"&nbsp;&nbsp;2","isTop":"","isRed":"","sortDate":"2016-05-19 14:44","createDate":"05-19 14:44"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=1A7ACF9B180990CB48257FB70011CBEE","title":"黄埔区销售公司召开城中村突破“暴风行动”专项部署会","creater":"刘娴娟","scanCount":"&nbsp;46","reviewCount":"&nbsp;&nbsp;1","isTop":"","isRed":"","sortDate":"2016-05-18 11:14","createDate":"05-18 11:14"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=19BAA75F2273AE9348257FB70016F620","title":"【工会园地】越目娱心，秀逸生活——记越秀区分工会户外拓展......","creater":"谢嘉宁","scanCount":"172","reviewCount":"13","isTop":"","isRed":"","sortDate":"2016-05-18 12:10","createDate":"05-18 12:10"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=BD0B95C24F2CE92748257FB7000FEA70","title":"第八党支部召开“从严从实 破局担当 广州联通管理干部一线......","creater":"方堃","scanCount":"&nbsp;74","reviewCount":"&nbsp;&nbsp;1","isTop":"","isRed":"","sortDate":"2016-05-18 10:53","createDate":"05-18 10:53"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=27F5FEF9A341800448257FB60033BB3D","title":"再接再厉 决胜双过半——记黄埔区销售公司开门红总结表彰大......","creater":"刘娴娟","scanCount":"&nbsp;99","reviewCount":"&nbsp;&nbsp;4","isTop":"","isRed":"","sortDate":"2016-05-17 17:25","createDate":"05-17 17:25"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=589F7DA26794392148257FB6002A7B73","title":"重温入党誓词 回顾光辉历程——记南沙党支部广州起义烈士陵......","creater":"张凤贞","scanCount":"105","reviewCount":"&nbsp;&nbsp;8","isTop":"","isRed":"","sortDate":"2016-05-17 15:44","createDate":"05-17 15:44"},{"url":"/oadata/app_NewsCenter.nsf/News_Show?openform&Unid=C2F3897629D0316048257FB600219713","title":"生日聚会，融融情谊—番禺区分四/五月员工生日会","creater":"张馨予","scanCount":"160","reviewCount":"&nbsp;&nbsp;3","isTop":"","isRed":"","sortDate":"2016-05-17 14:06","createDate":"05-17 14:06"}]},{"moreurl":"","type":"优化内部生态圈","width":" 100","news":[{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=4646263B408A4DF348257F3E0036B8D2&PARENT_KEYUNID=023C927CD92BC8AC48257F3A0011D439_1452741302186","isTop":"","isRed":"","title":"关于大院外墙安全整改顺利完工的通告","creater":"王辉","scanCount":"168","reviewCount":"&nbsp;&nbsp;2","sortDate":"2016-01-14 11:14","createDate":"01-14 11:14"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=DA0BA1CE6BD924C548257F3800107965&PARENT_KEYUNID=ACCAA65BD8248B8548257F3700121827_1452482265422","isTop":"","isRed":"","title":"  关于周末清洁大扫除行动（2016年1月8日）检查结果......","creater":"王辉","scanCount":"136","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-01-11 11:17","createDate":"01-11 11:17"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=783E883B89BA634448257F3100167EDE&PARENT_KEYUNID=574A51DD6F7BE36148257F30002DC385_1451895593425","isTop":"","isRed":"","title":"关于在禁烟区域吸烟引起火警情况的通报","creater":"王辉","scanCount":"154","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-01-04 16:19","createDate":"01-04 16:19"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=102EEE05EFEECFCF48257F2A0036DF30&PARENT_KEYUNID=8F756E2502751F0948257F2A002A03BA_1451374739140","isTop":"","isRed":"","title":"关于周末清洁大扫除行动（2015年12月25日）检查结果......","creater":"王辉","scanCount":"&nbsp;37","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-12-29 15:38","createDate":"12-29 15:38"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=E4057ECBB0918B7248257F1E00393987&PARENT_KEYUNID=345A07C0005A765848257F1E003301BA_1450343838019","isTop":"","isRed":"","title":"关于大院外墙安全整改施工的温馨提示","creater":"陈枨扬","scanCount":"118","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-12-17 17:17","createDate":"12-17 17:17"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=C6AE19FCCB7DEFA148257F1B0021A359&PARENT_KEYUNID=3B14929A6918A8B248257F1B000B766D_1450058713388","isTop":"","isRed":"","title":"关于周末清洁大扫除行动（2015年12月11日）检查结果......","creater":"王辉","scanCount":"&nbsp;77","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-12-14 10:05","createDate":"12-14 10:05"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=DE7BD9A1CD1DF71948257F0700320D98&PARENT_KEYUNID=772708B8A697905148257F07002C64E1_1448352318218","isTop":"","isRed":"","title":"关于周末清洁大扫除行动（2015年11月20日）检查结果......","creater":"王辉","scanCount":"114","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-11-24 16:04","createDate":"11-24 16:04"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=11C64A147C80608748257EFA0033A60D&PARENT_KEYUNID=6BD6B8108576552C48257EFA0027E811_1447226160129","isTop":"","isRed":"","title":"关于周末清洁大扫除行动（2015年11月6日）检查结果的......","creater":"王辉","scanCount":"185","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-11-11 15:15","createDate":"11-11 15:15"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=374C2A34C21145A448257EC400357A17&PARENT_KEYUNID=D950BEFC4020BF4E48257EC4000468D4_1442537320223","isTop":"","isRed":"","title":"关于开展周末清洁大扫除行动的通知","creater":"陈枨扬","scanCount":"&nbsp;49","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-09-18 08:48","createDate":"09-18 08:48"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=FD15123D5E06E25D48257EC00007B957&PARENT_KEYUNID=C60A28430DDBED2848257EBB003263D5_1441789829842","isTop":"","isRed":"","title":"大家齐行动  共同防鼠患（实景照）","creater":"陈枨扬","scanCount":"&nbsp;77","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-09-09 17:10","createDate":"09-09 17:10"}]},{"moreurl":"","type":"创新专栏","width":" ","news":[{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=769D161EAB6ED8E448257F5E003CE738&PARENT_KEYUNID=292CBFAA4F50E2C248257F5E0031F2F1_1455872785779","isTop":"","isRed":"","title":"“当美人鱼遇上星骑士”--“星骑士计划”宣讲会火热召开","creater":"邓丽妍","scanCount":"600","reviewCount":"&nbsp;&nbsp;2","sortDate":"2016-02-19 17:05","createDate":"02-19 17:05"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=655AC2E1990BF03148257F5D000BF243&PARENT_KEYUNID=4E8A14A05AFDC20B48257F5D0008EB3B_1455759493834","isTop":"","isRed":"","title":"群雄逐鹿，“花”属大师——创新业务大师杯第一季圆满落幕","creater":"曹霞","scanCount":"484","reviewCount":"26","sortDate":"2016-02-18 09:37","createDate":"02-18 09:37"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=43E9B07DB0E7021748257F260022EFDF&PARENT_KEYUNID=78373DD5A5602CF048257F26002189EE_1451023563083","isTop":"","isRed":"","title":"新荔湾！新梦想！新荔湾区分公司员工见面会暨开门红启航会议","creater":"肖妮","scanCount":"200","reviewCount":"10","sortDate":"2015-12-25 14:06","createDate":"12-25 14:06"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=BD26091C52DC561248257EED003A420B&PARENT_KEYUNID=96D11D07678F33B848257EEB00398775_1445941729585","isTop":"","isRed":"","title":"关于开展2015年集团客户网络服务技能竞赛的通知","creater":"王莉","scanCount":"&nbsp;66","reviewCount":"&nbsp;&nbsp;1","sortDate":"2015-10-27 18:28","createDate":"10-27 18:28"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=07E0730036DA963A48257EC900345521&PARENT_KEYUNID=717203DA27FA967A48257EC90011BB86_1442978027885","isTop":"","isRed":"","title":"关于2015广东通信年青年论坛征文通知","creater":"王延军","scanCount":"&nbsp;92","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-09-23 11:13","createDate":"09-23 11:13"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=8AB68CF6F7ED2E8548257E8C0032AF94&PARENT_KEYUNID=72D62A658A40DEDE48257E8C000603A3_1437699953538","isTop":"","isRed":"","title":"转发《关于广东联通2014年度企业现代化管理创新成果及优......","creater":"慎重","scanCount":"&nbsp;79","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-07-24 09:05","createDate":"07-24 09:05"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=1F123A3543E08B3B48257E8A0038FC98&PARENT_KEYUNID=D7CC86AA7F95958F48257E880038DD49_1437387546175","isTop":"","isRed":"","title":"营业渠道专车司机专属营销活动员工引流量第二期通报","creater":"徐慧俞","scanCount":"174","reviewCount":"&nbsp;&nbsp;1","sortDate":"2015-07-20 18:21","createDate":"07-20 18:21"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=5E8A251BCC26C6FC48257E8200378673&PARENT_KEYUNID=A586EE3BB091A24448257E8200325666_1436864874642","isTop":"","isRed":"","title":"营业渠道专车司机专属营销活动员工引流量第一期通报","creater":"徐慧俞","scanCount":"306","reviewCount":"&nbsp;&nbsp;8","sortDate":"2015-07-14 17:09","createDate":"07-14 17:09"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=091BDE4CE159F20A48257E7E00255F33&PARENT_KEYUNID=0985509989E47CEF48257E7E000C9A08_1436494552970","isTop":"","isRed":"","title":"齐推广，赢大奖——营业渠道诚邀您参与专车司机专属营销活动......","creater":"徐慧俞","scanCount":"382","reviewCount":"15","sortDate":"2015-07-10 10:17","createDate":"07-10 10:17"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=CD4B0268EB70EB6D48257E72003E0BC6&PARENT_KEYUNID=615EDB610607550448257E70003069D1_1435308599491","isTop":"","isRed":"","title":"关于组织学习《广东联通科技创新奖励办法》的通知","creater":"张晶晶","scanCount":"154","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-06-26 16:48","createDate":"06-26 16:48"}]},{"moreurl":"","type":"人力资源","width":" ","news":[{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=CCED40FD6B4471ED48257FBC003111FA&PARENT_KEYUNID=AD29B4162136967248257FBC002B9735_1463990198766","isTop":"","isRed":"","title":"先进基层党组织、优秀党务工作者、优秀共产党员推荐名单公示","creater":"李海霞","scanCount":"384","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-05-23 15:56","createDate":"05-23 15:56"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=E22FD8CDEF0D15D648257FB6000249F0&PARENT_KEYUNID=5925F6A4E593D6C248257FB50028E591_1463383603315","isTop":"","isRed":"","title":"关于方煜斌等人选任前的公示","creater":"井澔","scanCount":"1344","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-05-16 15:26","createDate":"05-16 15:26"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=E14113FE96416CC848257FB500029D26&PARENT_KEYUNID=B59C602D00AA258448257FB500024010_1463358268281","isTop":"","isRed":"","title":"关于谢利娜等人选任前的公示","creater":"杨华","scanCount":"1567","reviewCount":"&nbsp;&nbsp;1","sortDate":"2016-05-16 08:24","createDate":"05-16 08:24"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=9BE4FEB2950706C348257FB500024FB9&PARENT_KEYUNID=06D084A827E92CFB48257FB50001AD0A_1463357891671","isTop":"","isRed":"","title":"关于陈娟选任前的公示","creater":"杨华","scanCount":"1137","reviewCount":"&nbsp;&nbsp;1","sortDate":"2016-05-16 08:18","createDate":"05-16 08:18"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=5C23C650EF55F33348257FAA0007C5F0&PARENT_KEYUNID=0FE5FCBC2894C59748257FAA00065668_1462410561586","isTop":"","isRed":"","title":"关于公开招募广东联通品牌运营创新工作坊运营办公室负责人、......","creater":"崔浩巍","scanCount":"2516","reviewCount":"137","sortDate":"2016-05-05 09:09","createDate":"05-05 09:09"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=A2E0E656D00ED67148257FA300362886&PARENT_KEYUNID=C10EB026AA3AC15248257FA300118566_1461813097453","isTop":"","isRed":"","title":"2016年04月薪酬发放说明","creater":"郑春欣","scanCount":"1043","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-04-28 11:11","createDate":"04-28 11:11"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=84F1A67E3AC67AD548257F93001170C9&PARENT_KEYUNID=572732E35CF6826C48257F9300107991_1460430373156","isTop":"","isRed":"","title":"关于推荐李娅等人申报“2015-2016年度广东联通优秀......","creater":"孙秀玲","scanCount":"1242","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-04-12 10:59","createDate":"04-12 10:59"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=9EC7B282136EB2F448257F8F002A6108&PARENT_KEYUNID=95AAAED0EA64179B48257F8F0014CB95_1460087243942","isTop":"","isRed":"","title":"关于广州联通自有营业厅第二批储备店长选拔结果的公示","creater":"温思欣","scanCount":"899","reviewCount":"&nbsp;&nbsp;3","sortDate":"2016-04-08 11:47","createDate":"04-08 11:47"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=072E36809D03816748257F850035BF06&PARENT_KEYUNID=02E5993D9AB6524748257F840037F0DB_1459159945667","isTop":"","isRed":"","title":"2016年03月薪酬发放说明","creater":"郑春欣","scanCount":"1229","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-03-28 18:11","createDate":"03-28 18:11"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=DDF08B411623C23D48257F81004049CB&PARENT_KEYUNID=AF219A159401359748257F8100336545_1458897753546","isTop":"","isRed":"","title":"关于开展广州联通自有营业厅第二批储备店长选拔的通知","creater":"温思欣","scanCount":"618","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-03-25 17:21","createDate":"03-25 17:21"}]},{"moreurl":"","type":"工会园地","width":" ","news":[{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=A64793909179FC8548257FBD002EA493&PARENT_KEYUNID=2D2FB54EDF04034A48257FBD002D22C5_1464077584833","isTop":"","isRed":"","title":"【市场部生日Party】因为520","creater":"余玲","scanCount":"340","reviewCount":"18","sortDate":"2016-05-24 16:13","createDate":"05-24 16:13"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=D1E2C5304FAD882148257FBD0022A1D7&PARENT_KEYUNID=51FD42B3E8EDB82548257FBD001A7D9D_1464065365169","isTop":"","isRed":"","title":"【工会园地】网络建设部开展5月部门工会活动","creater":"王怡凤","scanCount":"156","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-05-24 12:49","createDate":"05-24 12:49"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=DF999CF0D5EA044048257FBD000E87D8&PARENT_KEYUNID=2B1B91B129E3318C48257FBD000E39AE_1464057326644","isTop":"","isRed":"","title":"【工会园地】政企客户中心---一次别开生面的生日会","creater":"黄静妍","scanCount":"185","reviewCount":"&nbsp;&nbsp;5","sortDate":"2016-05-24 10:35","createDate":"05-24 10:35"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=2FB9D9B09303E52148257FBC000ED033&PARENT_KEYUNID=0109199C0343B58F48257FBC000E9AFE_1463971172313","isTop":"","isRed":"","title":"生日聚会、情意浓浓——记移动业务中心生日会","creater":"孙晶","scanCount":"198","reviewCount":"13","sortDate":"2016-05-23 10:39","createDate":"05-23 10:39"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=21FE58E47877A30C48257FBC0009DD28&PARENT_KEYUNID=8367D0FE2BFD28AB48257FBC0008AFE8_1463967296563","isTop":"","isRed":"","title":"【工会园地】齐参与，共欢乐—花都区分公司举办“幸福520......","creater":"梁许怡","scanCount":"&nbsp;98","reviewCount":"&nbsp;&nbsp;4","sortDate":"2016-05-23 09:34","createDate":"05-23 09:34"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=CD4ABFBBD1BA054F48257FB5002FE3D8&PARENT_KEYUNID=96C372BED8F990BC48257FB500106F65_1463367567762","isTop":"","isRed":"","title":"花都区销售公司活动兴趣村成立啦!!!","creater":"徐嘉雯","scanCount":"262","reviewCount":"22","sortDate":"2016-05-16 10:59","createDate":"05-16 10:59"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=559C965E65C6186B48257FB2002DAAAC&PARENT_KEYUNID=4A1710D4874416CF48257FB20029066C_1463124502170","isTop":"","isRed":"","title":"白云区分公司双过半实战演练比赛暨四五月员工生日会","creater":"付子芮","scanCount":"265","reviewCount":"22","sortDate":"2016-05-13 15:28","createDate":"05-13 15:28"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=3890AD9426CDC96048257FB1000BDF54&PARENT_KEYUNID=EFC06C0FCB70593F48257FAE002F526F_1462783015933","isTop":"","isRed":"","title":"花都区分公司举办“一路有沃、万步健行”暨“爱护地球母亲、......","creater":"梁许怡","scanCount":"&nbsp;&nbsp;&nbsp;9","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-05-09 16:36","createDate":"05-09 16:36"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=9B913B8AF2052AB148257FB1000B6BF1&PARENT_KEYUNID=5DEB66AE3E478FA448257FAE002EBF6A_1462782639591","isTop":"","isRed":"","title":"花都区分公司开展“浓情五月  感念母恩”活动","creater":"梁许怡","scanCount":"&nbsp;&nbsp;&nbsp;7","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-05-09 16:30","createDate":"05-09 16:30"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=7A2384FDCD447A4C48257FB00030071B&PARENT_KEYUNID=71E874ADB38CC33B48257FAE0031038C_1462784123488","isTop":"","isRed":"","title":"“感恩母亲节，爱心DIY”——记黄埔区分公司工会母亲节献......","creater":"王晓璐","scanCount":"&nbsp;&nbsp;&nbsp;9","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-05-09 16:55","createDate":"05-09 16:55"}]},{"moreurl":"","type":"业务通知","width":" ","news":[{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=4621BC5A1B1CF90648257FB7003054A3&PARENT_KEYUNID=AE5F8D50EC12D8B848257FB700303FB3_1463561236572","isTop":"","isRed":"","title":"关于省公司离线数据库割接，影响省系统和本地系统使用的通知......","creater":"杨炼钢","scanCount":"220","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-05-18 16:47","createDate":"05-18 16:47"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=B366259CB4A520B948257F8D00111D7E&PARENT_KEYUNID=0F8D5475339B8A4248257F8D00104716_1459911492069","isTop":"","isRed":"","title":"side智能提数系统2016年3月账单已生成，请各位同事......","creater":"冯子强","scanCount":"&nbsp;70","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-04-06 10:57","createDate":"04-06 10:57"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=14710C0312CE32D948257F3F002C412D&PARENT_KEYUNID=0E0DA834C706ADFB48257F3F000CE97A_1453170091315","isTop":"","isRed":"","title":"广东联通手机公文审批app（企管云）安装指引","creater":"吴锐滔","scanCount":"987","reviewCount":"20","sortDate":"2016-01-19 10:21","createDate":"01-19 10:21"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=9159E0EBF063E47548257F320010988C&PARENT_KEYUNID=34B4093994D13ADC48257F320010735C_1452049222193","isTop":"","isRed":"","title":"side智能提数系统2015年12月账单已生成，请各位同......","creater":"冯子强","scanCount":"&nbsp;42","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-01-06 10:59","createDate":"01-06 10:59"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=84BBA0A65D72083248257F26002DCD27&PARENT_KEYUNID=FFCB57191D54B53B48257F26002CC694_1451030973402","isTop":"","isRed":"","title":"2015年广州联通营业厅网络安全应急演练活动圆满收官","creater":"杨炼钢","scanCount":"&nbsp;29","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-12-25 16:09","createDate":"12-25 16:09"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=BB9BAA335B59ED9E48257F1400058D94&PARENT_KEYUNID=D04321BD9A7C961048257F1400032643_1449448474567","isTop":"","isRed":"","title":"side智能提数系统2015年11月账单已生成，请各位同......","creater":"冯子强","scanCount":"&nbsp;38","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-12-07 08:34","createDate":"12-07 08:34"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=925E471226DC666A48257EF8000616B5&PARENT_KEYUNID=C59CD2E72D2B2ADC48257EF50024161D_1446791677612","isTop":"","isRed":"","title":"side智能提数系统2015年10月账单已生成，请各位同......","creater":"冯子强","scanCount":"&nbsp;24","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-11-06 14:34","createDate":"11-06 14:34"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=F3EE8A0F1C46D16948257ED80011DB80&PARENT_KEYUNID=E7BB72C557F6490048257ED80010C8D9_1444273356264","isTop":"","isRed":"","title":"side智能提数系统2015年9月账单已生成，请各位同事......","creater":"冯子强","scanCount":"&nbsp;44","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-10-08 11:03","createDate":"10-08 11:03"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=4F0FB68B6F57EC1B48257EB900088ED0&PARENT_KEYUNID=A5270DBB324BD07048257EB8003AC744_1441536067717","isTop":"","isRed":"","title":"side智能提数系统2015年8月账单已生成，请各位同事......","creater":"冯子强","scanCount":"&nbsp;33","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-09-06 18:42","createDate":"09-06 18:42"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=8D6AAE19A74F38F248257E99001A8C48&PARENT_KEYUNID=271FA48472FFE2A648257E9900134EB2_1438831819002","isTop":"","isRed":"","title":"side智能提数系统2015年7月账单已生成，请各位同事......","creater":"冯子强","scanCount":"&nbsp;23","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-08-06 11:30","createDate":"08-06 11:30"}]},{"moreurl":"","type":"公文培训","width":" ","news":[{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=02ADD95252A786F348257F85000EEEB5&PARENT_KEYUNID=C433CA51F78FDBE148257F8500068D7A_1459213978328","isTop":"","isRed":"","title":"公司收文流程","creater":"谭玉姣","scanCount":"&nbsp;90","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-03-29 09:11","createDate":"03-29 09:11"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=0194D42C22DFBFCF48257F85000EDBBA&PARENT_KEYUNID=26F8897CC7CFD4C748257F850006BB9D_1459214096406","isTop":"","isRed":"","title":"公司发文流程","creater":"谭玉姣","scanCount":"170","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-03-29 09:13","createDate":"03-29 09:13"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=BEAF8481AFED12BD48257F3E000DF7E0&PARENT_KEYUNID=ACE562E661B1A33348257F3E000C9CD5_1453083494921","isTop":"","isRed":"","title":"公文知识培训教材","creater":"谭玉姣","scanCount":"183","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-01-18 10:17","createDate":"01-18 10:17"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=B51A40C0F349202248257F3E000DF465&PARENT_KEYUNID=A6BBC5F9849DF1E048257F3E0008D2DF_1453081011687","isTop":"","isRed":"","title":"关于明确2016年公文管理有关要求的通知","creater":"谭玉姣","scanCount":"161","reviewCount":"&nbsp;&nbsp;0","sortDate":"2016-01-18 09:36","createDate":"01-18 09:36"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=7ECF073C266FEB9B48257DCB003217BC&PARENT_KEYUNID=8090762876815FEA48257DCB002AB66C_1421048896062","isTop":"","isRed":"","title":"担保合同清算函","creater":"谭玉姣","scanCount":"107","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-01-12 15:46","createDate":"01-12 15:46"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=87182BDBD178A79048257DCB0032134B&PARENT_KEYUNID=410E6B73A4A2BBF248257DCB002AFEEF_1421049081734","isTop":"","isRed":"","title":"关于敦促履行交费义务的函","creater":"谭玉姣","scanCount":"161","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-01-12 15:49","createDate":"01-12 15:49"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=2B4EA59D722D75AF48257DCB00320FDC&PARENT_KEYUNID=5F281F6F8F419D3448257DCB002C8853_1421050088828","isTop":"","isRed":"","title":"关于赴XXX分公司学习交流XXX先进经验的函","creater":"谭玉姣","scanCount":"219","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-01-12 16:06","createDate":"01-12 16:06"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=D5648935FA67663448257DCB0032065E&PARENT_KEYUNID=00526B62F0CEA9B948257DCB002D5754_1421050618718","isTop":"","isRed":"","title":"关于印发集团客户4G业务团购优惠审批授权体系的通知（广东......","creater":"谭玉姣","scanCount":"126","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-01-12 16:15","createDate":"01-12 16:15"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=DE87C91D122C7A4E48257DCB0031FFBE&PARENT_KEYUNID=2F94E320C2F67DED48257DCB002E47D0_1421051234453","isTop":"","isRed":"","title":"管线迁改施工的函","creater":"谭玉姣","scanCount":"110","reviewCount":"&nbsp;&nbsp;0","sortDate":"2015-01-12 16:25","createDate":"01-12 16:25"},{"url":"/oadata/e_GGTZ.nsf/News_Show?openform&Unid=FBD83DD43A5D0F6748257C8D0032B49A&PARENT_KEYUNID=7C960F2DA982BD5748257C8D003233D3_1393578541828","isTop":"","isRed":"","title":"户口迁出证明","creater":"谭玉姣","scanCount":"870","reviewCount":"&nbsp;&nbsp;0","sortDate":"2014-02-28 17:08","createDate":"02-28 17:08"}]}],"innerBkList":{"total":"66","rows":[{"srId":"247","title":"联通沃之讯第247期","url":"/oadata/e_innerBkManage.nsf/Fwrite/AA37529A5A4D5FB448257FB800335A6B/$File/联通沃之讯第247期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/AA37529A5A4D5FB448257FB800335A6B/$File/联通沃之讯第247期_预览.jpg"},{"srId":"246","title":"联通沃之讯第246期","url":"/oadata/e_innerBkManage.nsf/Fwrite/0927CCD4499EF77B48257FA000378F57/$File/联通沃之讯第246期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/0927CCD4499EF77B48257FA000378F57/$File/联通沃之讯第246期_预览.jpg"},{"srId":"245","title":"联通沃之讯第245期","url":"/oadata/e_innerBkManage.nsf/Fwrite/471EC6D36B02FCFF48257F980006BF25/$File/联通沃之讯第245期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/471EC6D36B02FCFF48257F980006BF25/$File/联通沃之讯第245期_预览.jpg"},{"srId":"244","title":"联通沃之讯第244期","url":"/oadata/e_innerBkManage.nsf/Fwrite/18B5C24E2761196F48257F8E001A29CC/$File/联通沃之讯第244期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/18B5C24E2761196F48257F8E001A29CC/$File/联通沃之讯第244期_预览.jpg"},{"srId":"243","title":"联通沃之讯第243期","url":"/oadata/e_innerBkManage.nsf/Fwrite/E023303B4B179AB148257F8800231BCA/$File/联通沃之讯第243期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/E023303B4B179AB148257F8800231BCA/$File/联通沃之讯第243期_预览.jpg"},{"srId":"242","title":"联通沃之讯第242期","url":"/oadata/e_innerBkManage.nsf/Fwrite/0E8843F9CFC8040548257F88002328F5/$File/联通沃之讯第242期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/0E8843F9CFC8040548257F88002328F5/$File/联通沃之讯第242期_预览.jpg"},{"srId":"241","title":"联通沃之讯第241期","url":"/oadata/e_innerBkManage.nsf/Fwrite/A7C077DB264C8B3E48257F7800272035/$File/联通沃之讯第241期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/A7C077DB264C8B3E48257F7800272035/$File/联通沃之讯第241期_预览.jpg"},{"srId":"240","title":"联通沃之讯第240期","url":"/oadata/e_innerBkManage.nsf/Fwrite/70124D164637603B48257F780027197F/$File/联通沃之讯第240期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/70124D164637603B48257F780027197F/$File/联通沃之讯第240期_预览.jpg"},{"srId":"239","title":"联通沃之讯第239期","url":"/oadata/e_innerBkManage.nsf/Fwrite/4EB7D90FB73A913D48257F78002710D2/$File/联通沃之讯第239期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/4EB7D90FB73A913D48257F78002710D2/$File/联通沃之讯第239期_预览.jpg"},{"srId":"238","title":"联通沃之讯第238期","url":"/oadata/e_innerBkManage.nsf/Fwrite/61A3A7B72EB9A5A048257F39002C4E24/$File/联通沃之讯第238期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/61A3A7B72EB9A5A048257F39002C4E24/$File/联通沃之讯第238期_预览.jpg"},{"srId":"237","title":"联通沃之讯第237期","url":"/oadata/e_innerBkManage.nsf/Fwrite/1084C5A29AF8074048257F32002C1CFC/$File/联通沃之讯第237期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/1084C5A29AF8074048257F32002C1CFC/$File/联通沃之讯第237期_预览.jpg"},{"srId":"236","title":"联通沃之讯第236期","url":"/oadata/e_innerBkManage.nsf/Fwrite/A27E838562946C6248257F2C001B28D5/$File/联通沃之讯第236期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/A27E838562946C6248257F2C001B28D5/$File/联通沃之讯第236期_预览.jpg"},{"srId":"235","title":"联通沃之讯第235期","url":"/oadata/e_innerBkManage.nsf/Fwrite/C51D67794D8034C748257F2200356FE4/$File/联通沃之讯第235期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/C51D67794D8034C748257F2200356FE4/$File/联通沃之讯第235期_预览.jpg"},{"srId":"234","title":"联通沃之讯第234期","url":"/oadata/e_innerBkManage.nsf/Fwrite/2A86C56F6CF9697348257F1C002E4842/$File/联通沃之讯第234期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/2A86C56F6CF9697348257F1C002E4842/$File/联通沃之讯第234期_预览.jpg"},{"srId":"233","title":"联通沃之讯第233期","url":"/oadata/e_innerBkManage.nsf/Fwrite/9BC2EBF2EC611E2748257F150037409A/$File/联通沃之讯第233期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/9BC2EBF2EC611E2748257F150037409A/$File/联通沃之讯第233期_预览.jpg"},{"srId":"232","title":"联通沃之讯第232期","url":"/oadata/e_innerBkManage.nsf/Fwrite/31D10760928985CD48257F0F003186A2/$File/联通沃之讯第232期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/31D10760928985CD48257F0F003186A2/$File/联通沃之讯第232期_预览.jpg"},{"srId":"230","title":"联通沃之讯第231期","url":"/oadata/e_innerBkManage.nsf/Fwrite/D4570FC0632BDE8148257F090026F373/$File/联通沃之讯第231期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/D4570FC0632BDE8148257F090026F373/$File/联通沃之讯第231期_预览.jpg"},{"srId":"229","title":"联通沃之讯第229期","url":"/oadata/e_innerBkManage.nsf/Fwrite/8D8BCD9DF7AFAA1848257EFA00321112/$File/联通沃之讯第229期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/8D8BCD9DF7AFAA1848257EFA00321112/$File/联通沃之讯第229期_预览.jpg"},{"srId":"228","title":"联通沃之讯第228期","url":"/oadata/e_innerBkManage.nsf/Fwrite/7082841A7B66EEB748257EF30029A2D6/$File/联通沃之讯第228期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/7082841A7B66EEB748257EF30029A2D6/$File/联通沃之讯第228期_预览.jpg"},{"srId":"227","title":"联通沃之讯第227期","url":"/oadata/e_innerBkManage.nsf/Fwrite/3E24FD3B59FBA19948257EEC00080453/$File/联通沃之讯第227期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/3E24FD3B59FBA19948257EEC00080453/$File/联通沃之讯第227期_预览.jpg"},{"srId":"226","title":"联通沃之讯第226期","url":"/oadata/e_innerBkManage.nsf/Fwrite/C795E635B9721E8B48257EE5000E1C67/$File/联通沃之讯第226期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/C795E635B9721E8B48257EE5000E1C67/$File/联通沃之讯第226期_预览.jpg"},{"srId":"225","title":"联通沃之讯第225期","url":"/oadata/e_innerBkManage.nsf/Fwrite/CA4C671340307EAF48257EDF000193AB/$File/联通沃之讯第225期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/CA4C671340307EAF48257EDF000193AB/$File/联通沃之讯第225期_预览.jpg"},{"srId":"224","title":"联通沃之讯第224期","url":"/oadata/e_innerBkManage.nsf/Fwrite/4CBAAB128927899548257EC8002A850A/$File/联通沃之讯第224期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/4CBAAB128927899548257EC8002A850A/$File/联通沃之讯第224期_预览.jpg"},{"srId":"223","title":"联通沃之讯第223期","url":"/oadata/e_innerBkManage.nsf/Fwrite/1DACB38B5D36C47848257EC2003A26CF/$File/联通沃之讯第223期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/1DACB38B5D36C47848257EC2003A26CF/$File/联通沃之讯第223期_预览.jpg"},{"srId":"222","title":"联通沃之讯第222期","url":"/oadata/e_innerBkManage.nsf/Fwrite/06CB5D0F6F615F7E48257EBA003750C0/$File/联通沃之讯第222期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/06CB5D0F6F615F7E48257EBA003750C0/$File/联通沃之讯第222期_预览.jpg"},{"srId":"221","title":"联通沃之讯第221期","url":"/oadata/e_innerBkManage.nsf/Fwrite/054CD2C9479F4B9148257EB3000A796A/$File/联通沃之讯第221期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/054CD2C9479F4B9148257EB3000A796A/$File/联通沃之讯第221期_预览.jpg"},{"srId":"220","title":"联通沃之讯第220期","url":"/oadata/e_innerBkManage.nsf/Fwrite/8CB1B0B82B1BCD7C48257EAC000A65C5/$File/联通沃之讯第220期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/8CB1B0B82B1BCD7C48257EAC000A65C5/$File/联通沃之讯第220期_预览.jpg"},{"srId":"219","title":"联通沃之讯第219期","url":"/oadata/e_innerBkManage.nsf/Fwrite/6664D1285DAF0F6448257EA400358D0B/$File/联通沃之讯第219期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/6664D1285DAF0F6448257EA400358D0B/$File/联通沃之讯第219期_预览.jpg"},{"srId":"218","title":"联通沃之讯第218期","url":"/oadata/e_innerBkManage.nsf/Fwrite/3D3E7921C624BCD348257E9E000AC3AC/$File/联通沃之讯第218期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/3D3E7921C624BCD348257E9E000AC3AC/$File/联通沃之讯第218期_预览.jpg"},{"srId":"217","title":"联通沃之讯第217期","url":"/oadata/e_innerBkManage.nsf/Fwrite/824071EB03CB19CC48257E9800070F4F/$File/联通沃之讯第217期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/824071EB03CB19CC48257E9800070F4F/$File/联通沃之讯第217期_预览.jpg"},{"srId":"216","title":"联通沃之讯第216期","url":"/oadata/e_innerBkManage.nsf/Fwrite/DEE0240153802DEE48257E900029A988/$File/联通沃之讯第216期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/DEE0240153802DEE48257E900029A988/$File/联通沃之讯第216期_预览.jpg"},{"srId":"215","title":"联通沃之讯第215期","url":"/oadata/e_innerBkManage.nsf/Fwrite/6B7B57430529F7E248257E8B000C5275/$File/联通沃之讯第215期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/6B7B57430529F7E248257E8B000C5275/$File/联通沃之讯第215期_预览.jpg"},{"srId":"214","title":"联通沃之讯第214期","url":"/oadata/e_innerBkManage.nsf/Fwrite/6ADC10191286C9F848257E840028AB41/$File/联通沃之讯第214期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/6ADC10191286C9F848257E840028AB41/$File/联通沃之讯第214期_预览.jpg"},{"srId":"213","title":"联通沃之讯第213期","url":"/oadata/e_innerBkManage.nsf/Fwrite/8118215E0F7BA63948257E7B0009A615/$File/联通沃之讯第213期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/8118215E0F7BA63948257E7B0009A615/$File/联通沃之讯第213期_预览.jpg"},{"srId":"212","title":"联通沃之讯第212期","url":"/oadata/e_innerBkManage.nsf/Fwrite/CF45AA44E02E53BC48257E6F002C5061/$File/联通沃之讯第212期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/CF45AA44E02E53BC48257E6F002C5061/$File/联通沃之讯第212期_预览.jpg"},{"srId":"211","title":"联通沃之讯第211期","url":"/oadata/e_innerBkManage.nsf/Fwrite/0236DC1864EF222C48257E690029A310/$File/联通沃之讯第211期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/0236DC1864EF222C48257E690029A310/$File/联通沃之讯第211期_预览.jpg"},{"srId":"210","title":"联通沃之讯第210期","url":"/oadata/e_innerBkManage.nsf/Fwrite/8B665CC8AB3E795148257E5F00060FD6/$File/联通沃之讯第210期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/8B665CC8AB3E795148257E5F00060FD6/$File/联通沃之讯第210期_预览.jpg"},{"srId":"209","title":"联通沃之讯第209期","url":"/oadata/e_innerBkManage.nsf/Fwrite/27E1FB21B3552E0748257E58000A9EB6/$File/联通沃之讯第209期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/27E1FB21B3552E0748257E58000A9EB6/$File/联通沃之讯第209期_预览.jpg"},{"srId":"208","title":"联通沃之讯第208期","url":"/oadata/e_innerBkManage.nsf/Fwrite/085710C2A0087BE148257E500036CC28/$File/联通沃之讯第208期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/085710C2A0087BE148257E500036CC28/$File/联通沃之讯第208期_预览.jpg"},{"srId":"207","title":"联通沃之讯第207期","url":"/oadata/e_innerBkManage.nsf/Fwrite/4F622789657EBEDE48257E4B00089F3B/$File/联通沃之讯第207期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/4F622789657EBEDE48257E4B00089F3B/$File/联通沃之讯第207期_预览.jpg"},{"srId":"206","title":"联通沃之讯第206期","url":"/oadata/e_innerBkManage.nsf/Fwrite/83FF4E5CE50EB94748257E4300087B36/$File/联通沃之讯第206期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/83FF4E5CE50EB94748257E4300087B36/$File/联通沃之讯第206期_预览.jpg"},{"srId":"205","title":"联通沃之讯第205期","url":"/oadata/e_innerBkManage.nsf/Fwrite/D9F69E45CB490A6248257E3D003010A2/$File/联通沃之讯第205期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/D9F69E45CB490A6248257E3D003010A2/$File/联通沃之讯第205期_预览.jpg"},{"srId":"204","title":"联通沃之讯第204期","url":"/oadata/e_innerBkManage.nsf/Fwrite/AB80C5D2EBF079F948257E35002922E9/$File/联通沃之讯第204期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/AB80C5D2EBF079F948257E35002922E9/$File/联通沃之讯第204期_预览.jpg"},{"srId":"203","title":"联通沃之讯第203期","url":"/oadata/e_innerBkManage.nsf/Fwrite/EC188E06906FC7CC48257E2E000800CE/$File/联通沃之讯第203期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/EC188E06906FC7CC48257E2E000800CE/$File/联通沃之讯第203期_预览.jpg"},{"srId":"202","title":"联通沃之讯第202期","url":"/oadata/e_innerBkManage.nsf/Fwrite/2847B013B45466D748257E2700068925/$File/联通沃之讯第202期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/2847B013B45466D748257E2700068925/$File/联通沃之讯第202期_预览.jpg"},{"srId":"201","title":"联通沃之讯第201期","url":"/oadata/e_innerBkManage.nsf/Fwrite/026A2A9710DBDA9A48257E2000308222/$File/联通沃之讯第201期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/026A2A9710DBDA9A48257E2000308222/$File/联通沃之讯第201期_预览.jpg"},{"srId":"200","title":"联通沃之讯第200期","url":"/oadata/e_innerBkManage.nsf/Fwrite/6A8915D479257AD948257E1A00085877/$File/联通沃之讯第200期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/6A8915D479257AD948257E1A00085877/$File/联通沃之讯第200期_预览.jpg"},{"srId":"199","title":"联通沃之讯第199期1","url":"/oadata/e_innerBkManage.nsf/Fwrite/D309F707AF949C9B48257E11002D87AD/$File/联通沃之讯第199期1.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/D309F707AF949C9B48257E11002D87AD/$File/联通沃之讯第199期_预览.jpg"},{"srId":"198","title":"联通沃之讯第198期","url":"/oadata/e_innerBkManage.nsf/Fwrite/F1CDE2573988951E48257E0B002417E3/$File/联通沃之讯第198期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/F1CDE2573988951E48257E0B002417E3/$File/联通沃之讯第198期_预览.jpg"},{"srId":"197","title":"联通沃之讯第197期","url":"/oadata/e_innerBkManage.nsf/Fwrite/4DA80E37109E071E48257E050009ED91/$File/联通沃之讯第197期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/4DA80E37109E071E48257E050009ED91/$File/联通沃之讯第197期_预览.jpg"},{"srId":"196","title":"联通沃之讯第196期","url":"/oadata/e_innerBkManage.nsf/Fwrite/32C5A27CB7FF907648257DFD00330B13/$File/联通沃之讯第196期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/32C5A27CB7FF907648257DFD00330B13/$File/联通沃之讯第196期_预览.jpg"},{"srId":"195","title":"联通沃之讯第195期","url":"/oadata/e_innerBkManage.nsf/Fwrite/4B87CD26D733DC2948257DE700229C3D/$File/联通沃之讯第195期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/4B87CD26D733DC2948257DE700229C3D/$File/联通沃之讯第195期_预览.jpg"},{"srId":"194","title":"联通沃之讯第194期","url":"/oadata/e_innerBkManage.nsf/Fwrite/268672D7D79B5CD048257DE0000EFA65/$File/联通沃之讯第194期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/268672D7D79B5CD048257DE0000EFA65/$File/联通沃之讯第194期_预览.jpg"},{"srId":"193","title":"联通沃之讯第239期","url":"/oadata/e_innerBkManage.nsf/Fwrite/C06748053257C01B48257F4E002E65D6/$File/联通沃之讯第239期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/C06748053257C01B48257F4E002E65D6/$File/联通沃之讯第239期_预览.jpg"},{"srId":"193","title":"联通沃之讯第193期","url":"/oadata/e_innerBkManage.nsf/Fwrite/F5977AC57A2F69D148257DDA0011CA9C/$File/联通沃之讯第193期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/F5977AC57A2F69D148257DDA0011CA9C/$File/联通沃之讯第193期_预览.jpg"},{"srId":"192","title":"联通沃之讯第192期","url":"/oadata/e_innerBkManage.nsf/Fwrite/4A150D6D0B4AB7E848257DDA0011BACC/$File/联通沃之讯第192期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/4A150D6D0B4AB7E848257DDA0011BACC/$File/联通沃之讯第192期_预览.jpg"},{"srId":"191","title":"联通沃之讯第191期","url":"/oadata/e_innerBkManage.nsf/Fwrite/2149DE0E2F8B222548257DDA00119F7B/$File/联通沃之讯第191期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/2149DE0E2F8B222548257DDA00119F7B/$File/联通沃之讯第191期_预览.jpg"},{"srId":"190","title":"联通沃之讯第190期","url":"/oadata/e_innerBkManage.nsf/Fwrite/51555292D1B2E7C248257DDA00118E90/$File/联通沃之讯第190期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/51555292D1B2E7C248257DDA00118E90/$File/联通沃之讯第190期_预览.jpg"},{"srId":"189","title":"联通沃之讯第189期","url":"/oadata/e_innerBkManage.nsf/Fwrite/4CDC2541FE2CC70A48257DDA00117FFD/$File/联通沃之讯第189期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/4CDC2541FE2CC70A48257DDA00117FFD/$File/联通沃之讯第189期_预览.jpg"},{"srId":"188","title":"联通沃之讯第188期","url":"/oadata/e_innerBkManage.nsf/Fwrite/906A17DDAF5CFBE348257DDA0011733D/$File/联通沃之讯第188期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/906A17DDAF5CFBE348257DDA0011733D/$File/联通沃之讯第188期_预览.jpg"},{"srId":"187","title":"联通沃之讯第187期","url":"/oadata/e_innerBkManage.nsf/Fwrite/F615E3A646A0BDCC48257DDA0010FC32/$File/联通沃之讯第187期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/F615E3A646A0BDCC48257DDA0010FC32/$File/联通沃之讯第187期_预览.jpg"},{"srId":"186","title":"联通沃之讯第186期","url":"/oadata/e_innerBkManage.nsf/Fwrite/12C8F44DBF11E47248257DDA0010E555/$File/联通沃之讯第186期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/12C8F44DBF11E47248257DDA0010E555/$File/联通沃之讯第186期_预览.jpg"},{"srId":"185","title":"联通沃之讯第185期","url":"/oadata/e_innerBkManage.nsf/Fwrite/26F52A01E94C4B8948257DDA0010CF33/$File/联通沃之讯第185期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/26F52A01E94C4B8948257DDA0010CF33/$File/联通沃之讯第185期_预览.jpg"},{"srId":"184","title":"联通沃之讯第184期","url":"/oadata/e_innerBkManage.nsf/Fwrite/1A67A64F0033C2C348257DDA0010BACD/$File/联通沃之讯第184期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/1A67A64F0033C2C348257DDA0010BACD/$File/联通沃之讯第184期_预览.jpg"},{"srId":"183","title":"联通沃之讯第183期","url":"/oadata/e_innerBkManage.nsf/Fwrite/74C395D15D87DEC748257DDA0010A66E/$File/联通沃之讯第183期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/74C395D15D87DEC748257DDA0010A66E/$File/联通沃之讯第183期_预览.jpg"},{"srId":"182","title":"联通沃之讯第182期","url":"/oadata/e_innerBkManage.nsf/Fwrite/E6B844F90961FD7048257DDA001092CB/$File/联通沃之讯第182期.jpg","imgLink":"/oadata/e_innerBkManage.nsf/Fwrite/E6B844F90961FD7048257DDA001092CB/$File/联通沃之讯第182期_预览.jpg"}]},"ldInfoImgList":{"total":8,"rows":[{"srId":"76","title":"NPS知识通关活动","url":"http://mp.weixin.qq.com/s?__biz=MjM5MzgzMzU4MA==&mid=505178158&idx=1&sn=033d2c6f9b4c3abb04a9a5b6b390b6a7#rd","imgLink":"/oasrc/portal/images/temp/NPS2.jpg","isused":"","limitDate":"2016-05-26"},{"srId":"77","title":"沃TV手机端产品","url":"http://10.210.24.50/WOTV.htm","imgLink":"/oasrc/portal/images/temp/沃TV 副本.jpg","isused":"","limitDate":"2016-05-31"},{"srId":"77","title":"5．17网购节风暴来袭","url":"http://zhaopin.gzuni.com/www/ds/ds_zb_517hdoa/index.php","imgLink":"/oasrc/portal/images/temp/2016517网购节.jpg","isused":"","limitDate":"2016-05-24"},{"srId":"78","title":"公开招募广东联通品牌运营创新工作坊运营办公室负责人、团队项目经理 ","url":"http://gz.gd.unicom.local:82/oadata/e_GGTZ.nsf/News_Show?openform&Unid=5C23C650EF55F33348257FAA0007C5F0&PARENT_KEYUNID=0FE5FCBC2894C59748257FAA00065668_1462410561586","imgLink":"/oasrc/portal/images/temp/招聘海报0511.jpg","isused":"","limitDate":"2016-05-11"},{"srId":"79","title":"广州联通历届劳模展","url":"http://fwzc.gzuni.com/imgtp/laomo","imgLink":"/oasrc/portal/images/temp/2016年五一劳模.jpg","isused":"","limitDate":"2016-05-31"},{"srId":"80","title":"母亲节特别呈献","url":"http://mp.weixin.qq.com/s?__biz=MjM5MzgzMzU4MA==&mid=505177994&idx=1&sn=8e4b155cc62b104d056c3dd73856c6bc#rd","imgLink":"/oasrc/portal/images/temp/母亲节活动.jpg","isused":"","limitDate":"2016-05-11"},{"srId":"81","title":"2016年广州联通安康杯竞赛","url":"http://130.51.79.40:9003/466.htm","imgLink":"/oasrc/portal/images/temp/安康杯.jpg","isused":"","limitDate":"2016-05-12"},{"srId":"83","title":"关于严明2016年劳动节期间纪律要求的通知","url":"http://10.210.24.50/关于严明2016年劳动节期间纪律要求的通知.htm","imgLink":"/oasrc/portal/images/temp/2016laodongjl.jpg","isused":"","limitDate":"2016-05-03"}]}
};
try {
	loadIndexData.loadloginbar(json);
	loadIndexData.loadTMessage(json);
	loadIndexData.loadappList(json);
	loadIndexData.loadprovinceList();
	loadIndexData.loadflowappList(json);
	loadIndexData.loadcityList(json);
	loadIndexData.loadcpnNews(json);
	loadIndexData.loadinfoList(json);
	loadIndexData.loadinnerBkList(json);
	loadIndexData.loadldInfoImgList(json);
	loadIndexData.loadWeather();

	intIndex();
	getLxgd();
	getKxgd();
	getYygd();
} catch (e) {
	alert(e.message + ";" + e.name);
	return;
}

	/*$.ajax({
				url : "/oadata/e_main.nsf/ajax_initPortal?openagent",
				type : "POST",
				dataType : "json",
				data : "&t=" + new Date().getTime().toString(),
				success : function(json) {
					try {
						loadIndexData.loadloginbar(json);
						loadIndexData.loadTMessage(json);
						loadIndexData.loadappList(json);
						loadIndexData.loadprovinceList();
						loadIndexData.loadflowappList(json);
						loadIndexData.loadcityList(json);
						loadIndexData.loadcpnNews(json);
						loadIndexData.loadinfoList(json);
						loadIndexData.loadinnerBkList(json);
						loadIndexData.loadldInfoImgList(json);
						loadIndexData.loadWeather();

						intIndex();
						getLxgd();
						getKxgd();
						getYygd();
					} catch (e) {
						alert(e.message + ";" + e.name);
						return;
					}

				},
				error : function() {
					alert("请先登录!");
					window.location.href = "names.nsf?login"
				}
			});*/

});
var showMoreTag = function(){
	var tabTit = $("#newsTab li.click").html();
	var listType = "";
	var url = "/oadata/e_GGTZ.nsf/v_f_MoreData?openform";
	if(tabTit!="全部"){
		switch(tabTit){
			case "公司新闻":
				listType = "公司新闻";
				url = "/oadata/app_NewsCenter.nsf/v_f_MoreNews?openform";
				break;
			case "优化内部生态圈":
				listType = 1;
				break;
			case "创新专栏":
				listType = 2;
				break;
			//case "营改增":
			//	listType = 3;
			//	break;
			case "人力资源":
				listType = 4;
				break;
			case "工会园地":
				listType = 7;
				break;
			case "业务通知":
				listType = 5;
				break;
			case "公文培训":
				listType = 6;
				break;
		}

		$("#moreTag a").attr("href",url+"&listType="+listType);
		$("#moreTag").show();
	}else{
		$("#moreTag").hide();
	}
}
// ------------------Updated~ by Guozheng 3rd.June,2013----------加载页面数据
var loadIndexData = (function(o) {
	o.loadloginbar = function(json) {
		var _a = $(".logins a");
		$(_a[0]).html(json.loginbar.username);
		// $(_a[1]).attr("src", json.loginbar.userUrl);
		_a = $(".times a");
		$(_a[0]).html(json.loginbar.username);
		// $(_a[0]).attr("src", json.loginbar.userUrl);
		$(_a[1]).html(json.loginbar.userDept);
		// $(_a[1]).attr("src", json.loginbar.userDeptUrl);
		$(".times span").html(json.serDateTime);
	}
	// /---------
	o.loadappList = function(json) {
		var appl = new Array();
		if (json.appList.length % 2 == 1) {
			json.appList.push({
						"url" : "#",
						"title" : ""
					})
		}
		$(json.appList).each(function(i) {
			switch (i) {
				case json.appList.length - 2 :
					cls = "left bottom";
					break;
				case json.appList.length - 1 :
					cls = "bottom";
					break;
				default :
					cls = (i % 2 == 0 ? "left" : "");
			}
			appl.push("<li class='" + cls + "'><a target='_blank' href='"
					+ this.url + "'>" + this.title + "</a></li>");
		});
		$("#appList ul").html(appl.join(""));
	}
	// /-----------------省OA待办

	o.loadprovinceList = function() {
		$(".provinceList")
				.html("<img src='./widgets/index/images/loading.gif' style='margin-left:100px;padding-top:10px;'>");
		var province = {"msg": "", "unread": [["805", "/task/0/default/unreading?type=gongwen", "\u516c\u6587"], ["0", "/task/0/default/unreading?type=hetong", "\u5408\u540c"], ["0", "/task/0/default/unreading?type=baoxiao", "\u62a5\u8d26"], ["0", "/task/0/default/unreading?type=program", "\u9879\u76ee"], ["0", "/task/0/default/unreading?type=others", "\u5176\u4ed6"]], "success": true, "pending": [["0", "/task/0/default/unpending?type=gongwen", "\u516c\u6587"], ["0", "/task/0/default/unpending?type=hetong", "\u5408\u540c"], ["0", "/task/0/default/unpending?type=caigou", "\u91c7\u8d2d"], ["0", "/task/0/default/unpending?type=baoxiao", "\u62a5\u8d26"], ["0", "/task/0/default/unpending?type=program", "\u9879\u76ee"], ["0", "/task/0/default/unpending?type=others", "\u5176\u4ed6"]]};

		var arr = new Array();
		province.pending&&$(province.pending).each(function(i) {
			arr.push('<li><a href="#" onclick="ymh_login(\''
					+ uname_t
					+ '\',\''
					+ this[1]
					+ '\');">'
					+ this[2]
					+ '（<span>'
					+ this[0] + '</span>）</a></li>');
		});
		arr.length>0&&$(".provinceList").html(arr.join(""));

		$(".provinceList").parent().css(
				"height",
				parseInt($(".provinceList").css("height"))
				+ (province[0] != "" ? 20 : 35));
		/*
		$.ajax({
			url : "/oadata/e_main.nsf/ag_getOracleData?openagent",
			type : "GET",
			data : "t=" + new Date().getTime().toString(),
			dataType : "json",
			success : function(json) {
				var arr = new Array();
					json.pending&&$(json.pending).each(function(i) {
							arr.push('<li><a href="#" onclick="ymh_login(\''
											+ uname_t
											+ '\',\''
											+ this[1]
											+ '\');">'
											+ this[2]
											+ '（<span>'
											+ this[0] + '</span>）</a></li>');
					});
					arr.length>0&&$(".provinceList").html(arr.join(""));

				$(".provinceList").parent().css(
						"height",
						parseInt($(".provinceList").css("height"))
								+ (json[0] != "" ? 20 : 35));
			}
		});*/

	}

	// /--------------------------
	o.loadflowappList = function(json) {
		var arr = new Array();
		arr.push("<ul>");
		$(json.newList.historyLink).each(function(i) {
			arr.push('<li><a target="_blank" href="' + this.url + '">'
					+ this.title + '</a></li>');
		});
		arr.push("</ul>");
		$(json.newList.appList).each(function(i) {
			if (i != 0 && i % 3 == 0) {
				arr.push('<ul></ul>');
			}
			arr.push('<dl>');
			arr.push('<dt>' + this.type + '</dt>');
			$(json.newList.appList[i].apps).each(function() {
				arr.push('<dd><a target="_blank" href="' + this.url + '">'
						+ this.title + '</a></dd>');
			});
			arr.push('</dl>');
		});
		$(".setting").before(arr.join(""));
		$("#flowappList").css(
				"height",
				parseInt($("#flowappList").css("height"))
						* Math.ceil(json.newList.appList.length / 3))
	}

	// /-----------------------
	o.loadcityList = function(json) {
		var arr = new Array();
		$(json.cityList).each(function(i) {
		//? " style=\"margin-left:" + (parseInt(this.num)<10?0:(parseInt(this.num)<100?5:8)) + "px;\""
			arr.push('<li'
					+ ((i != 1 && i % 4 == 0 && !$.browser.msie)
							? " style=\"margin-left:" + (parseInt(this.num)<10?0:(parseInt(this.num)<100?0:0)) + "px;\""
							: "")
					+ '><a '
					+ ((i != 1 && i % 4 == 0 && $.browser.msie)
							? 'style="width:'+(parseInt(this.num)<10?($.browser.version=="6.0"?80:90):(parseInt(this.num)<100?99:105))+'px;" '
							: "")
					+ ((i == 0 || i == 1 || i == 2 || i==5) ? '' : ' target="_blank"')
					+ ' href="' + this.url + '">' + this.title + '（<span>'
					+ this.num + '</span>）' + '</a></li>');
		});
		$(".cityList").html(arr.join(""));
	}

	// /-----------------------
	o.loadcpnNews = function(json) {
		var arr = new Array();
		var arr2 = new Array();
		$(json.cpnNews).each(function(i) {
			if (i == 0) {
				arr.push("<li><dl>")
			}
			arr.push("<dd" + (i==0?" style=\"border-top:0px;\"":"") + ">" + '<p title='
					+ this.tit
					+ '><a target="_blank" style="' + (this.isTop==""?"":"font-weight:bolder;") + (this.isRed==""?"":"color:#223d7c;") + '" href="'
					+ this.url
					+ '">'
					+ this.title + '</a></p>' + '<p><em>('
					+ this.creater + ' ' + this.creatDate + ')&nbsp;&nbsp;' + this.scanCount + '次阅读,' + this.reviewCount + '回复</em></p></dd>');
			if (i == json.cpnNews.length - 1) {
				arr.push("</dl></li>")
			}

						arr2.push('<li style="display:'
					+ (i == 0 ? 'list-item' : 'none')
					+ ';"><a target="_blank" href="'
					+ this.url
					+ '"><img title="'
					+ this.tit
					+ '" src="'
					+ this.imgLink
					+ '"></a><p title='
					+ this.tit
					+ '><a target="_blank" href="'
					+ this.url
					+ '">'
					+ this.title + '</a></p></li>')
		});
		$("#cpnNews").html(arr.join(""));
		$("#imgNews").html(arr2.join(""));
	}

	// /----------------------
	o.loadimgNews = function(json) {
		var arr = new Array();
		$(json.imgNews).each(function(i) {
			arr.push('<li style="display:'
					+ (i == 0 ? 'list-item' : 'none')
					+ ';"><a target="_blank" href="'
					+ this.url
					+ '"><img title="'
					+ this.title
					+ '" src="'
					+ this.imgLink
					+ '"></a><p title='
					+ this.title
					+ '><a target="_blank" href="'
					+ this.url
					+ '">'
					+ (this.title.replace(/[^\x00-\xff]/g, "xx").length > 26
							? this.title.substring(0, 26) + "......"
							: this.title) + '</a></p></li>')
		});
		$("#imgNews").html(arr.join(""));
	}

	// /----------------------资讯公告
	o.loadinfoList = function(json) {
		var arr = new Array();
		var arr2 = new Array();
		var arr3 = new Array();
		var dataArray = new Array();
		var _topArr = new Array();	//存放置顶的数据---
		$(json.infoList).each(function(i) {
			arr.push('<li'
					+ (this.width == '' ? '' : ' style="width:' + this.width
							+ 'px"') + ' class="child' + (i + 1) + '">'
					+ this.type + '</li>');
			arr2.push('<ul' + (i == 0 ? '' : ' class="none"') + '>');
			var type = this.type;
			$(this.news).each(function(j) {
				this.type = type;
				(this.url != ""? (this.isTop!=""?_topArr.push(this):dataArray.push(this)) : "");
				arr2.push('<li'
								+ (j == 0 ? ' class="first"' : '')
								+ '><a target="_blank" style="' + (this.isTop==""?"":"font-weight:bolder;font-size:1.29em;") + (this.isRed==""?"":"color:#223d7c;") + '" href="'
								+ this.url
								+ '">'
								+ this.title + '</a>'
								+ '<span>'
								+ this.scanCount + '读,'
								+ this.reviewCount + '回复</span>'
								+ '<span>'
								+ '(' + this.creater + ' '
								+ this.createDate + ')</span>'
								+ '</li>');
								//(徐滔 08-27 18:24)  513读,1回复
			});
			arr2.push('</ul>');

		});

		// 因为冒泡效率低，修改为快速排序--updated by guozheng 6th.Sept,2013-------
	var quickSort = function(array){
		var i = 0;
		var j = array.length - 1;
		var Sort = function(i, j){

			// 结束条件
			if(i == j ){ return };

			var key = array[i];
			var keyDate = new Date(key.sortDate.replace(/-/g,"/"));
			var stepi = i; // 记录开始位置
			var stepj = j; // 记录结束位置

			while(j > i){
				// j <<-------------- 向前查找

				if(new Date(array[j].sortDate.replace(/-/g,"/")) <= keyDate){
					j--;
				}else{
					array[i] = array[j]
					//i++ ------------>>向后查找
					while(j > ++i){
						if(new Date(array[i].sortDate.replace(/-/g,"/")) < keyDate){
							array[j] = array[i];
							break;
						}
					}
				}
			}

			// 如果第一个取出的 key 是最大的数
			if(stepi == i){
				Sort(++i, stepj);
				return ;
			}

			// 最后一个空位留给 key
			array[i] = key;

			// 递归
			Sort(stepi, i);
			Sort(j, stepj);
		}

		Sort(i, j);

		return array;

	}
	/**updated by guozheng 6th.Sept,2013**/
	dataArray = quickSort(dataArray);
	//如果置顶的数据多于一条，也排序一次
	if(_topArr.length>1){
		_topArr = quickSort(_topArr);
	}
	dataArray = $.merge(_topArr,dataArray);	//置顶数据放前面，合并成一个数组




		arr3.push('<ul class="none">');
		var sum;
		dataArray.length>10?sum=10:sum=dataArray.length;
		for(i=0;i<sum;i++){
				arr3.push('<li' + (i==0?' class="first"':'')
				 + '><a target="_blank" style="' + (dataArray[i].isTop==""?"":"font-weight:bolder;font-size:1.29em;") + (dataArray[i].isRed==""?"":"color:#223d7c;") + '" href="'
				 + dataArray[i].url
				 + '">'
				 + dataArray[i].type
				 + '：'
				 + (dataArray[i].title.replace(/[^\x00-\xff]/g, 'xx').length > 48 ? dataArray[i].title.substring(0, 24) + '......': dataArray[i].title)
				 + '</a>'
				 + '<span>' + dataArray[i].scanCount + '读,'+ dataArray[i].reviewCount + '回复</span>'
				 + '<span>' + dataArray[i].createDate
				 + ')</span><span>(' + dataArray[i].creater
				 + '</span></li>');
		}
		arr3.push('</ul>');
		var temp = '<li class="child8" width="35px">全部</li>'
		$("#newsTab").html(temp + arr.join(""));
		$("#infoList").html(arr3.join("")+ arr2.join(""));

	}

	// /----------------------
	o.loadinnerBkList = function(json) {
		var arr = new Array();
		$(json.innerBkList.rows).each(function(i) {
			arr.push('<li><a target="_blank" href="' + this.url
					+ '"><img style="width:90px;height:117px;" src="'
					+ this.imgLink + '"></a><p>' + this.title + '</p></li>')
		});
		$("#innerBkList").html(arr.join(""));
	}

	// /----------------------
	o.loadldInfoImgList = function(json) {
		var arr = new Array();
		var d = new Date();
		var thisDVal = d.getFullYear().toString()
				+ (d.getMonth() >= 9 ? d.getMonth() + 1 : "0"
						+ (d.getMonth() + 1)) + (d.getDate() > 9 ? d.getDate() : "0"
						+ d.getDate().toString());
		$(json.ldInfoImgList.rows).each(function(i) {
			if (this.limitDate == ""
					|| (parseInt(this.limitDate.toString().replace(/(-|\/)/g,
							"")) >= parseInt(thisDVal))) {
				if(this.isused=="是"){
                			arr.push('<li data="' + (this.title == "" ? "------": this.title) + '" urldata="' + this.url + '"><a href="#" onclick="redirectto(\'' + this.url + '\')"><img src="' + this.imgLink + '"></a></li>');
          			}else{
                			arr.push('<li data="' + (this.title == "" ? "------": this.title) + '" urldata="' + this.url + '"><a target="_blank" href="' + this.url + '"><img src="' + this.imgLink + '"></a></li>')
            			}
		}
		});
		if (arr.length > 0) {
			$("#ldInfoImgList ul").html(arr.join(""));
		}
	}

	// ------加载天气
	o.loadWeather = function() {
		var json = {"error":0,"status":"success","date":"2016-05-27","results":[{"currentCity":"广州","pm25":"27","index":[{"title":"穿衣","zs":"热","tipt":"穿衣指数","des":"天气热，建议着短裙、短裤、短薄外套、T恤等夏季服装。"},{"title":"洗车","zs":"不宜","tipt":"洗车指数","des":"不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。"},{"title":"旅游","zs":"较不宜","tipt":"旅游指数","des":"天气稍热，风力不大，但有有较强降水，会给您的出行产生很多麻烦，建议您最好还是多选择在室内活动吧！"},{"title":"感冒","zs":"少发","tipt":"感冒指数","des":"各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。"},{"title":"运动","zs":"较不宜","tipt":"运动指数","des":"有较强降水，建议您选择在室内进行健身休闲运动。"},{"title":"紫外线强度","zs":"弱","tipt":"紫外线强度指数","des":"紫外线强度较弱，建议出门前涂擦SPF在12-15之间、PA+的防晒护肤品。"}],"weather_data":[{"date":"周五 05月27日 (实时：28℃)","dayPictureUrl":"http://api.map.baidu.com/images/weather/day/dayu.png","nightPictureUrl":"http://api.map.baidu.com/images/weather/night/leizhenyu.png","weather":"大雨转雷阵雨","wind":"微风","temperature":"31 ~ 25℃"},{"date":"周六","dayPictureUrl":"http://api.map.baidu.com/images/weather/day/leizhenyu.png","nightPictureUrl":"http://api.map.baidu.com/images/weather/night/leizhenyu.png","weather":"雷阵雨","wind":"微风","temperature":"31 ~ 25℃"},{"date":"周日","dayPictureUrl":"http://api.map.baidu.com/images/weather/day/leizhenyu.png","nightPictureUrl":"http://api.map.baidu.com/images/weather/night/leizhenyu.png","weather":"雷阵雨","wind":"微风","temperature":"31 ~ 26℃"},{"date":"周一","dayPictureUrl":"http://api.map.baidu.com/images/weather/day/leizhenyu.png","nightPictureUrl":"http://api.map.baidu.com/images/weather/night/duoyun.png","weather":"雷阵雨转多云","wind":"微风","temperature":"32 ~ 26℃"}]}]};
		$("#city-name .cn").html(json.results[0].currentCity); // 城市名
		$("#city-name .en").html(json.results[0].currentCity); // 城市英文名
		if(json.results[0].weather_data[0].date.indexOf("℃")>=0){
			$("#rt-temp-value").html(json.results[0].weather_data[0].date.slice(json.results[0].weather_data[0].date.indexOf("℃")-2,json.results[0].weather_data[0].date.indexOf("℃"))); // 当前温度
		}else{
			$("#rt-temp-value").html(json.results[0].weather_data[0].temperature.replace("℃",""));
		}
		$("#rt-scene span")
				.html(json.results[0].weather_data[0].weather); // 当前天气

		var getWeatherImgClass = function(imgNum) {
			return ""
		}

		$("#rt-symbol a").css("background","url("+json.results[0].weather_data[0].dayPictureUrl+")").css("background-repeat","no-repeat");
		$("#fc-s1 a").css("background","url("+json.results[0].weather_data[0].dayPictureUrl+")").css("background-repeat","no-repeat").css("width","42");
		$("#fc-s1").append("<br>").append($("#fc-s1 a").clone().css("background","url("+json.results[0].weather_data[0].nightPictureUrl+")").css("background-repeat","no-repeat"));
		$("#fc-s1 a").attr("title",json.results[0].weather_data[0].weather);
		$("#fc-s2 a").css("background","url("+json.results[0].weather_data[1].dayPictureUrl+")").css("background-repeat","no-repeat").css("width","42");
		$("#fc-s2").append("<br>").append($("#fc-s2 a").clone().css("background","url("+json.results[0].weather_data[1].nightPictureUrl+")").css("background-repeat","no-repeat"));
		$("#fc-s2 a").attr("title",json.results[0].weather_data[1].weather);
		$("#fc-s3 a").css("background","url("+json.results[0].weather_data[2].dayPictureUrl+")").css("background-repeat","no-repeat").css("width","42");
		$("#fc-s3").append("<br>").append($("#fc-s3 a").clone().css("background","url("+json.results[0].weather_data[2].nightPictureUrl+")").css("background-repeat","no-repeat"));
		$("#fc-s3 a").attr("title",json.results[0].weather_data[2].weather);
		$("#rt-wind span").html(json.results[0].weather_data[0].wind); //风力
		$("#rt-hum span").html(json.results[0].weather_data[0].temperature); // 当天温度
		// /3天的温度
		$("#fc-l1").html(json.results[0].weather_data[0].temperature);
		$("#fc-l2").html(json.results[0].weather_data[1].temperature);
		$("#fc-l3").html(json.results[0].weather_data[2].temperature);
		$("#slider").html("【PM2.5】" + json.results[0].pm25).attr("title",json.results[0].index[5].title+":"+json.results[0].index[5].zs+"\n"+json.results[0].index[5].des);
	/*
		$.ajax({
			url : "/oadata/e_main.nsf/ag_getWeatherJson?openagent",
			dataType : "json",
			cache : false,
			type : "GET",
			success : function(json) {
				$("#city-name .cn").html(json.results[0].currentCity); // 城市名
				$("#city-name .en").html(json.results[0].currentCity); // 城市英文名
				if(json.results[0].weather_data[0].date.indexOf("℃")>=0){
					$("#rt-temp-value").html(json.results[0].weather_data[0].date.slice(json.results[0].weather_data[0].date.indexOf("℃")-2,json.results[0].weather_data[0].date.indexOf("℃"))); // 当前温度
				}else{
					$("#rt-temp-value").html(json.results[0].weather_data[0].temperature.replace("℃",""));
				}
				$("#rt-scene span")
						.html(json.results[0].weather_data[0].weather); // 当前天气

				var getWeatherImgClass = function(imgNum) {
					return ""
				}

				$("#rt-symbol a").css("background","url("+json.results[0].weather_data[0].dayPictureUrl+")").css("background-repeat","no-repeat");
				$("#fc-s1 a").css("background","url("+json.results[0].weather_data[0].dayPictureUrl+")").css("background-repeat","no-repeat").css("width","42");
				$("#fc-s1").append("<br>").append($("#fc-s1 a").clone().css("background","url("+json.results[0].weather_data[0].nightPictureUrl+")").css("background-repeat","no-repeat"));
				$("#fc-s1 a").attr("title",json.results[0].weather_data[0].weather);
				$("#fc-s2 a").css("background","url("+json.results[0].weather_data[1].dayPictureUrl+")").css("background-repeat","no-repeat").css("width","42");
				$("#fc-s2").append("<br>").append($("#fc-s2 a").clone().css("background","url("+json.results[0].weather_data[1].nightPictureUrl+")").css("background-repeat","no-repeat"));
				$("#fc-s2 a").attr("title",json.results[0].weather_data[1].weather);
				$("#fc-s3 a").css("background","url("+json.results[0].weather_data[2].dayPictureUrl+")").css("background-repeat","no-repeat").css("width","42");
				$("#fc-s3").append("<br>").append($("#fc-s3 a").clone().css("background","url("+json.results[0].weather_data[2].nightPictureUrl+")").css("background-repeat","no-repeat"));
				$("#fc-s3 a").attr("title",json.results[0].weather_data[2].weather);
				$("#rt-wind span").html(json.results[0].weather_data[0].wind); //风力
				$("#rt-hum span").html(json.results[0].weather_data[0].temperature); // 当天温度
				// /3天的温度
				$("#fc-l1").html(json.results[0].weather_data[0].temperature);
				$("#fc-l2").html(json.results[0].weather_data[1].temperature);
				$("#fc-l3").html(json.results[0].weather_data[2].temperature);
				$("#slider").html("【PM2.5】" + json.results[0].pm25).attr("title",json.results[0].index[5].title+":"+json.results[0].index[5].zs+"\n"+json.results[0].index[5].des);

			},
			error : function() {
				//alert("获取天气数据出错！");
			}
		});*/
	}

	// /-----------------------
	o.loadTMessage = function(json) {
		username_t = json.loginbar.username;
		uname_t = json.loginbar.uname;
		ucode_t = json.loginbar.ucode;
		umobile_t = json.loginbar.umobile;
		uemail_t = json.loginbar.uemail;
		unameunid_t = json.loginbar.unid;
	}

	return o;
})(window.loadIndexData || {})
