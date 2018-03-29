<%@page contentType="text/html;charset=UTF-8"%>
<%request.setAttribute("tenantPrefix", request.getContextPath());%>
<!doctype html>
<html >
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>广州联通</title>
    <link type="text/css" href="${tenantPrefix}/widgets/index/base.css" rel="stylesheet" />
    <link type="text/css" href="${tenantPrefix}/widgets/index/index.css" rel="stylesheet" />
    <link type="text/css" href="${tenantPrefix}/widgets/index/weather.css" rel="stylesheet" />
    <script type="text/javascript" src="${tenantPrefix}/widgets/index/jquery-1.8.0.min.js"></script>
<%--    <!--[if lte IE 6]>
    <script type="text/javascript" src="ie6png/iepngfix_tilebg.js"></script>
    <style type="text/css">
        img, div, input,a,em { behavior: url("ie6png/iepngfix.htc") }
    </style>
    <![endif]-->--%>
    <script language="JavaScript" type="text/javascript">
        ///判断是否为平板，跳转到手机版登陆页面	updated~ by guozheng 2013-06-14
        window.sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIphoneOs = sUserAgent.match(/iphone/i) == "iphone";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        if(bIsIphoneOs || bIsAndroid){
            window.parent.parent.location.href = "/oadata/MobileConfig.nsf/index?openform";
        }

        function redirectto(url){
            window.document.forms[0].method = "Post";
            window.document.forms[0].POST_OA_TXTUSERDISPLAYNAME.value=username_t;
            window.document.forms[0].uname.value=uname_t;
            window.document.forms[0].pass.value=ucode_t;
            window.document.forms[0].uemail.value=uemail_t;
            window.document.forms[0].POST_OA_MOBILENO.value = umobile_t;
            window.document.forms[0].action = url;
            window.document.forms[0].target = "_blank";
            window.document.forms[0].submit();
        }


        function ymh_login(first,other){
            var url = "";
            if(getCookie("ymh_login_c") != null){
                url = "http://www.portal.unicom.local/default/home";
            }else{
                setCookie("ymh_login_c","1");
                url = "http://gz.gd.unicom.local/services/redirect_to_gd_oa_v2?uid=" + first;
            }
            window.open(url,"","");
        }

        function setCookie(name,value)
        {
            var exp = new Date();
            exp.setTime(exp.getTime() + 10*60*1000);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        }

        //读取cookies
        function getCookie(name)
        {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }



        //---------初始化xmlhttp对象
        function createXMLHttpRequest(xmlHttp){
            if(window.XMLHttpRequest){
                xmlHttp = new XMLHttpRequest();  //创建
                //支持某些版本的Mozillar浏览器
                if(window.overrideMineType){
                    xmlHttp.overrideMineType("text/xml");
                }
            }else if(window.ActiveXObject){
                //使用一个数组来创建IE6，及其以下的ActiveXObject对象
                var names = ["microsoft.XMLHTTP","XMLMS2.XMLHTTP"];
                for(var i=0;i<names.length;i++){
                    try{
                        xmlHttp = new ActiveXObject(names[i]);
                        break;
                    }catch(e){
                    }
                }
            }
            return xmlHttp;  //返回的创建xmlhttp对象
        }

        function showapp(event){
            var e = event || window.event;
            var _this = $(".cityContent");
            e.stopPropagation();
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

        }
        var logoutFun = function(){
            var date = new Date();
            date.setTime(date.getTime() - 1000);
            document.cookie = "LtpaToken=a;domain=.gd.unicom.local; expires=" + date.toGMTString()+";path=/";
            window.top.location.href = "http://gz.gd.unicom.local/login/v2";
        }


        //立项工单
        var getLxgd = function(){
            $.ajax({
                dataType: "jsonp",
                url: "http://10.210.24.44:8000/workflow/loguser/ordercount.jsp?username=" + uname_t,
                type: "GET",
                success: function (result) {
                    var baceurl = result.url.replace("http://130.51.79.44:8000","http://10.210.24.44:8000")
                    $(".cityList li a")[3].href = baceurl;
                    //var cl = "redirecttolxgd('" + result.url  + "')";
                    //$($(".cityList li a")[3]).attr("onclick",cl);
                    $($(".cityList li span")[3]).html(result.count);
                },
                error: function () {
                    console.log('error.');
                }
                //alert();
            });
        };

        //客响
        var getKxgd = function(){
            $.ajax({
                dataType: "jsonp",
                url: "http://10.210.24.44:8000/workflow/loguser/dkhOrderCount.jsp?username=" + uname_t,
                type: "GET",
                success: function (result) {
                    var baceurl=result.url;
                    //var baceurl="http://130.51.79.113:8080/bbpmn/salary/task/list/workflow/pages/loguser/login_oa_dkh.jsp"
                    //var baceurl = result.url.replace("http://130.51.79.44:8000","http://gz.gd.unicom.local/open/oauth2/auth/?response_type=code&client_id=bpmn&redirect_uri=http://130.51.79.113:8080/bpmn/salary/task/list");
                    $(".cityList li a")[6].href = baceurl;
                    $($(".cityList li span")[6]).html(result.count);
                    $($(".cityList li")[6]).css("margin-left",(parseInt(result.count)<10?0:(parseInt(result.count)<100?5:8)) + "px");
                    $($(".cityList li a")[6]).attr("width",(parseInt(result.count)<10?($.browser.version=="6.0"?80:90):(parseInt(result.count)<100?99:105)) + "px");
                },
                error: function () {
                    console.log('error.');
                }
            });
        }
        //营业
        var getYygd = function(){
            var oauemail =uemail_t.replace("@chinaunicom.cn", "");
            $.ajax({
                dataType: "jsonp",
                url: "http://130.51.79.113:8080/bpmn/salary/task/count/" + uname_t+"?jsoncallback=?",
                //url: "http://130.51.79.113:8080/bpmn/salary/task/count/yejh92?jsoncallback=?",
                type: "GET",
                success: function (result) {
                    //var baceurl = "http://gz.gd.unicom.local/open/oauth2/auth/?response_type=code&client_id=bpmn&redirect_uri=http://130.51.79.113:8080/bpmn/salary/task/list";
                    $(".cityList li a")[7].href = result[0].url;
                    $($(".cityList li span")[7]).html(result[0].count);
                    $($(".cityList li")[7]).css("margin-left",(parseInt(result[0].count)<10?0:(parseInt(result[0].count)<100?5:8)) + "px");
                    $($(".cityList li a")[7]).attr("width",(parseInt(result[0].count)<10?($.browser.version=="6.0"?80:90):(parseInt(result[0].count)<100?99:105)) + "px");
                },
                error: function () {
                    console.log('error.');
                },
                complete:function(XMLHttpRequest, textStatus){

                }
            });
        }
        function redirecttolxgd(url){
            window.document.forms[0].uname.value=username_t;
            window.document.forms[0].action = url;
            window.document.forms[0].target = "_blank";
            window.document.forms[0].submit();
        }

        function GoToPerCon(){
            var url="/oadata/AIS_Org.nsf/fwrite/" + unameunid_t + "?EditDocument";
            window.open(url,"","");
        }
    </script>

</head>
<body>
<form>
    <div style="display:none">
        <input name="uname" value="">
        <input name="uemail" value="">
        <input name="op" value="">
        <input name="pass" value="">
        <input name="POST_OA_TXTUSERDISPLAYNAME" value="">
        <input name="POST_OA_MOBILENO" value="">
    </div>
    <div class="wrapper">
        <!-- 登录条 -->
        <div class="loginbar">
            <div class="logins">
                尊敬的<a style="cursor:default"></a>
                ，您好！欢迎登入
                <span>[<a href="#" onclick="logoutFun()">退出</a>]</span>
            </div>
            <div class="times">
                [<a style="cursor:default"></a>]-[<a style="cursor:default"></a>]
                [<a style="cursor:pointer" onclick="GoToPerCon()">个人配置</a>]
                [<a style="cursor:pointer" href="${tenantPrefix}/portal/index.do">我的工作台</a>]
                <span></span>
            </div>
        </div>
        <div class="header">
            <div class="logo">
                <a href=""><img src="${tenantPrefix}/widgets/index/images/logo.jpg" alt="中国联通"></a>
            </div>
            <div class="bannerFont"><img style="height:85px;width:450px;" src="${tenantPrefix}/widgets/index/images/banner1.jpg"></div>
            <div class="search">
                <div class="characters">通讯录</div>
                <input type="text" class="text">
                <input type="button" class="button" >
                <span class="initial">请输入姓名,拼音缩写,工号...</span>
            </div>
        </div>
        <!-- 导航 -->
        <div class="nav">
            <ul class="navlist">
                <li class="click"><a href="#">首&nbsp;&nbsp&nbsp;&nbsp页</a></li>
                <li><a href="#" onclick="redirectto('http://10.210.24.50:2233/dang.asp');">党&nbsp;&nbsp&nbsp;&nbsp建</a></li>
                <li><a href="#" onclick="redirectto('http://10.210.24.50:1188/gonghui.asp');">工&nbsp;&nbsp&nbsp;&nbsp会</a></li>
                <li><a target = "_blank" href="http://10.210.24.50:1122/jiangcha.asp">纪检监察</a></li>
                <li><a href="#" onclick="redirectto('http://130.51.79.40:9003/redire.asp?sid=61');">安全生产</a></li>
                <li><a target="_blank"  href="http://10.210.24.61:8009/auth/from_oa">投票专区</a></li>
                <li><a target="_blank" href="http://gz.gd.unicom.local:82/oadata/docdata/e_jkywzsk.nsf/mainform_first?openform&id=100000000090">阳光采购</a></li>
                <li><a target="_blank" href="http://gz1.gd.unicom.local:8080">原市OA</a></li>
            </ul>
            <div id="appList" class="apply">
                <span>应用中心 </span><img src="${tenantPrefix}/widgets/index/images/apply.gif" >
                <ul class="applyList clearfix">

                </ul>
            </div>
        </div>
        <!-- 待办 -->
        <div class="backlog">
            <div class="province">省OA待办</div>
            <ul class="provinceList">
            </ul>
            <div class="city">
                <div class="cityContent">
                    <span>市OA待办</span>
                    <img src="${tenantPrefix}/widgets/index/images/city_but.jpg">
                    <div class="newImg">点此新建</div>
                </div>
                <div id="flowappList" class="newList">
                    <div class="setting"><a href="#">个人设定<img src="${tenantPrefix}/widgets/index/images/icon_setting.gif"></a></div>
                </div>
            </div>
            <ul class="cityList">
            </ul>
        </div>
        <!-- 轮播 -->
        <div class="wheels">
            <div class="news">
                <div class="title">公司要闻</div>
                <div style="position: absolute;top: 5px;left: 405px;font-size:1.2em;"><a href="/oadata/app_NewsCenter.nsf/v_f_MoreNews?openform&listType=公司要闻" target="_blank">更多内容...</a></div>
                <ul id="cpnNews" class="contents">
                </ul>
            </div>
            <div class="imgNews">
                <ul id="imgNews" class="contents">
                </ul>
                <div class="texts"></div>
                <ul id="imgSums" class="sums"></ul>
            </div>
        </div>
        <!-- 内部资源 -->
        <div class="clearfix mt10">
            <div class="resource">
                <h2>内部资源</h2>
                <dl>
                    <dt id="zdtj">
                        <a style="cursor:auto"><em class="recommend"></em><span>重点推荐</span><strong></strong></a>
                    </dt>
                    <dd><a href="http://data.gzuni.com" target = "_blank"><strong class="manage"><em></em></strong><span>经营分析系统(汇总版)</span></a></dd>
                    <dd><a onclick="redirectto('http://10.210.24.77/lg_act.asp')"><strong class="phone"><em></em></strong><span>经营分析系统(明细版)</span></a></dd>
                    <dd><a href="http://gz1.gd.unicom.local:8080/easth/e_TaskSingle.nsf/mainform?openform" target = "_blank"><strong class="video"><em></em></strong><span>SIDE安全智能提数</span></a></dd>
                    <dd><a href="http://130.51.79.61:8403/gzcourse" target = "_blank"><strong class="cost"><em></em></strong><span>“3+2”全脱产培训选课</span></a></dd>
                    <dd><a onclick="redirectto('http://gm.gz.gd.unicom.local/bs/reports');"><strong class="client"><em></em></strong><span>网络数据中心</span></a></dd>
                    <dd><a href="http://gzres.gzuni.com" target = "_blank"><strong class="video"><em></em></strong><span>固网资源查询系统</span></a></dd>
                    <dt>
                        <a href="#"><em class="production"></em><span>生产系统</span><em class="more"></em><strong></strong></a>
                    <ul>
                        <li><a onclick="redirectto('http://10.210.24.40:8888/login_cooper.asp');">销售管理系统</a></li>
                        <li><a onclick="redirectto('http://10.210.24.50:9988/job_login.asp');">营帐工号管理系统</a></li>
                        <li><a onclick="redirectto('http://10.210.24.50:8086/login_bonds_oa.asp');">报障系统</a></li>
                        <li><a href="http://hd.gzuni.com" target = "_blank">客户互动管理系统</a></li>
                        <li><a href="http://dx.gzuni.com" target = "_blank">客服互动工作平台</a></li>
                        <li><a href="http://dd.gzuni.com" target = "_blank">接入网综合调度系统</a></li>
                        <li><a href="http://3g.gzuni.com" target = "_blank">3G销售管理系统</a></li>
                        <li><a href="http://130.51.79.30:8099/mail/login.action" target = "_blank">电子帐单管理系统</a></li>
                        <li><a href="http://130.51.79.61:8102" target = "_blank">总部渠道属性导入</a></li>
                    </ul>
                    </dt>
                    <dt>
                        <a href="#"><em class="manage"></em><span>管理系统</span><em class="more"></em><strong></strong></a>
                    <ul>
                        <li><a onclick="redirectto('http://10.210.24.48:9010/login/loginlf.action');">"沃之学"能力提升平台</a></li>
                        <li><a onclick="redirectto('http://10.210.24.40:9003/redire.asp?sid=41');">道德讲堂</a></li>
                        <li><a onclick="redirectto('http://10.210.24.40:9002/config.asp');">行风评议网站</a></li>
                        <li><a onclick="redirectto('http://10.210.24.100/superv/');">网络视频会议</a></li>
                        <li><a onclick="redirectto('http://10.210.24.40:9003/redire.asp?sid=1');">服务监督专栏</a></li>
                        <li><a href="http://cost.gzuni.com/" target = "_blank">运维成本管理系统</a></li>
                        <li><a href="http://gz.gd.unicom.local:82/oadata/e_main.nsf/index?openform&leftTarget=/oadata/OAAppDBPortal.nsf/FrmAppPageLeft?openform&AppDBName=oadata/app_ywlhyzglxt.nsf" target = "_blank">业务验证系统</a></li>
                    </ul>
                    </dt>
                </dl>
            </div>
            <!-- 新闻列表 -->
            <div class="new">
                <div class="title">
                    <strong>资讯公告</strong>
                    <ul id="newsTab">
                    </ul>
                </div>
                <div class="newList" id="infoList">
                </div>
                <div id="moreTag" style="display:none;position:absolute;width:60px;_width:100%;top:888px;_top:880px;padding-left:660px;"><a href="/oadata/app_NewsCenter.nsf/v_f_MoreNews?open" target="_blank">更多内容...</a></div>
            </div>
        </div>
        <!-- 天气预报 -->
        <div class="clearfix mt10">
            <div class="weather">
                <h2>天气预报</h2>
                <div class="forecast">
                    <div style="background-color: rgb(255, 255, 255); width: 260px; height: 273px; color: rgb(51, 14, 51);">
                        <table class="container" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                            <tr height="29px">
                                <td id="city" colspan="2" class="sep"><span id="city-name"><span class="cn">广州</span><span class="en">guangzhou</span></span></td>
                                <td style="width: 20px" id="ad" class="sep"></td>
                            </tr>
                            <tr>
                                <td id="rt" class="sep" colspan="3">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td id="rt-symbol" rowspan="4"><a class="symbol-big" target="_blank"></a></td>
                                            <td colspan="2" id="rt-temp"><span id="rt-temp-value" class="temp"></span><span id="rt-temp-unit">°C</span></td>
                                        </tr>
                                        <tr>
                                            <td id="rt-scene" colspan="2"><span></span></td>
                                        </tr>
                                        <tr>
                                            <td id="rt-wind" colspan="2"><span></span></td>
                                        </tr>
                                        <tr>
                                            <td id="rt-hum" colspan="2"><span></span></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr id="fc">
                                <td class="sep" colspan="3">
                                    <table style="width: 260px;">
                                        <tbody>
                                        <tr id="symbols">
                                            <td id="fc-s1" width="33%"><a class="symbol-small"  target="_blank"></a></td>
                                            <td id="fc-s2" width="33%"><a class="symbol-small"  target="_blank"></a></td>
                                            <td id="fc-s3" width="33%"><a class="symbol-small"  target="_blank"></a></td>
                                        </tr>
                                        <tr>
                                            <td width="33%" class="p_t">今天</td>
                                            <td width="33%" class="p_m">明天</td>
                                            <td width="33%" class="p_h">后天</td>
                                        </tr>
                                        <tr>
                                            <td width="33%"><span id="fc-l1" class="l_range"></span></td>
                                            <td width="33%"><span id="fc-l2" class="l_range"></span></td>
                                            <td width="33%"><span id="fc-l3" class="l_range"></span></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td id="slider" colspan="3"><a target="_blank" style="display:inline"></a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- 内部期刊 -->
            <div class="periodical">
                <div class="title">内部期刊</div>
                <div class="periodicalContent">
                    <div class="periodicalLeft"></div>
                    <div class="periodicalRight"></div>
                    <div class="view">
                        <ul id="innerBkList" class="contents">
                        </ul>
                    </div>
                    <div class="sumsbj">
                        <ul class="sums"></ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt10"><a href="#"><img src="${tenantPrefix}/widgets/index/images/poster.jpg"></a></div>
        <div class="footer">
            <span>Copyright © 2016</span>
            <span>广州联通信息化服务中心</span>
            <span>支持电话：（020）22992498  22992499</span>
            <span>传真：22992499</span>
        </div>
    </div>

    <div class="floating_ads"><img src="${tenantPrefix}/widgets/index/images/floating_ads.png"></div>
    <!-- 建议 -->
    <div id="suggest">
        <iframe id="ssFrm" src="" style="width:790px;height:570px;" frameborder="0"></iframe>
    </div>
    <div style="position: fixed;left: 35px;top: 50%;_position: absolute;cursor: pointer;"><img src="${tenantPrefix}/widgets/index/images/baozhang.png"></div>

    <!-- 载入时显示的内容 data=名称 urldata=连接地址  -->
    <div class="loadings">
        <div id="ldInfoImgList" class="view">
            <ul></ul>
        </div>
        <div class="buttons">
            <a href="javascript:void(0)" class="loadingsClose"></a>
            <a href="javascript:void(0)" class="butLeft"></a>
            <a href="javascript:void(0)" class="butRight"></a>
        </div>
        <div class="texts">
            <label><input id="isLoading" type="checkbox" checked="checked">不再显示</label>
            <span class="loadingSum"></span>
            <span>/</span>
            <span class="loadingIndex"></span>
        </div>
    </div>
</form>
<script type="text/javascript" src="${tenantPrefix}/widgets/index/function.js"></script>
<script type="text/javascript" src="${tenantPrefix}/widgets/index/loadIndexData_src.js"></script>

<script language="JavaScript" type="text/javascript">
    //if($.getCookie("isPopWindow")!="1"){
    //	window.open("http://xcp.gz.gd.unicom.local:8009/tongbao", "", "height=300, width=750, toolbar =yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes");
    //}
    //document.cookie="isPopWindow=1";
</script>

</body>
</html>
