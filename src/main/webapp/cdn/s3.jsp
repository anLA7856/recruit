<%@page language="java" pageEncoding="UTF-8" %>
    <!--[if lt IE 9]>
    <script type="text/javascript">
	    //alert('您使用的浏览器版本太低，请使用IE9+，或者FireFox，Chrome浏览。');
	</script>
    <![endif]-->

    <link rel="shortcut icon" type="image/x-icon" href="${cdnPrefix}/favicon.ico" />
    <!-- bootstrap -->
    <link rel='stylesheet' href='${cdnPrefix}/bootstrap/3.3.7/css/bootstrap.min.css' type='text/css' media='screen' />
	<style type="text/css">
.navbar-search .search-query {
  -webkit-border-radius: 15px;
     -moz-border-radius: 15px;
          border-radius: 15px;
}

.navbar .navbar-search .search-query {
    border-radius: 15px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.15);
    color: gray;
    transition: width 0.3s ease 0s;
    width: 100px;
}

.navbar .navbar-search .search-query:focus {
    transition: width 0.3s ease 0s;
    width: 200px;
}
	</style>

    <!-- html5 -->
    <!--[if lt IE 9]>
	<script src="${cdnPrefix}/respond/1.4.2/respond.min.js"></script>
    <script type="text/javascript" src="${cdnPrefix}/html5/html5shiv.js"></script>
    <![endif]-->

    <!-- jquery -->
    <script type='text/javascript' src='${cdnPrefix}/jquery/1.11.3/jquery.min.js'></script>
    <script type="text/javascript" src="${cdnPrefix}/jquery/jquery-migrate-1.2.1.min.js"></script>
	<!-- bootstrap -->
    <script type='text/javascript' src='${cdnPrefix}/bootstrap/3.3.6/js/bootstrap.min.js'></script>
	<!-- bootbox -->
    <script type="text/javascript" src="${cdnPrefix}/bootbox/bootbox.min.js"></script>

    <!-- message -->
    <script type="text/javascript" src="${cdnPrefix}/jquery-sliding-message/jquery.slidingmessage.min.js"></script>
    <script type="text/javascript" src="${cdnPrefix}/mossle/js/table.js"></script>

    <!-- table and pager -->
    <script type="text/javascript" src="${cdnPrefix}/pagination/pagination.js"></script>
    <script type="text/javascript" src="${cdnPrefix}/table/table.js"></script>
    <script type="text/javascript" src="${cdnPrefix}/table/messages_${locale}.js"></script>

    <!-- validater -->
    <script type="text/javascript" src="${cdnPrefix}/jquery-validation/jquery.validate.min.js"></script>
    <script type="text/javascript" src="${cdnPrefix}/jquery-validation/additional-methods.min.js"></script>
    <script type="text/javascript" src="${cdnPrefix}/jquery-validation/localization/messages_${locale}.js"></script>
    <link type="text/css" rel="stylesheet" href="${cdnPrefix}/jquery-validation/jquery.validate.css" />

    <!-- datepicker -->
    <link type="text/css" rel="stylesheet" href="${cdnPrefix}/bootstrap-datepicker/datepicker.css">
    <script type="text/javascript" src="${cdnPrefix}/bootstrap-datepicker/bootstrap-datepicker.js"></script>
    <script type="text/javascript" src="${cdnPrefix}/bootstrap-datepicker/locales/bootstrap-datepicker.${locale}.js"></script>
    <link href="${cdnPrefix}/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css" rel="stylesheet">
    <script type="text/javascript" src="${cdnPrefix}/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
    <script type="text/javascript" src="${cdnPrefix}/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.${locale}.js"></script>

	<!-- tree -->
    <link rel="stylesheet" href="${cdnPrefix}/ztree/zTreeStyle/zTreeStyle.css" type="text/css" />
    <script type="text/javascript" src="${cdnPrefix}/ztree/jquery.ztree.all-3.5.min.js"></script>

    <!-- ckeditor -->
    <script type="text/javascript" src="${cdnPrefix}/ckeditor/ckeditor.js"></script>
    <script type="text/javascript" src="${cdnPrefix}/ckfinder/ckfinder.js"></script>

	<!-- tablednd -->
    <script type="text/javascript" src="${cdnPrefix}/jquery-tablednd/jquery.tablednd.min.js"></script>
    <style type="text/css">
#accordion .panel-heading {
	cursor: pointer;
}
#accordion .panel-body {
	padding:0px;
}
    </style>
    <script type="text/javascript">
$(function() {
    $.showMessage($('#m-success-message').html(), {
        position: 'top',
        size: '55',
        fontSize: '20px'
    });

    $('.datepicker').datepicker({
		language: '${locale}',
		format: 'yyyy-mm-dd',
        autoclose: true
	});

    $('.datetimepicker').datetimepicker({
		language: '${locale}',
        format: "yyyy-mm-dd hh:ii",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left"
    });

    function widgetToggleContent() {
        var self = $(this);
        self.toggleClass('glyphicon-chevron-up');
        self.toggleClass('glyphicon-chevron-down');
        var widget = self.parents('.panel');
        var content = widget.find('.panel-body');
        content.toggle(200);
    }

    $(document).delegate('.panel .panel-heading .ctrl .glyphicon-chevron-up', 'click', widgetToggleContent);
    $(document).delegate('.panel .panel-heading .ctrl .glyphicon-chevron-down', 'click', widgetToggleContent);

    //判断浏览器
    if(typeof navigator == 'undefined'){ return; }
    var ua = navigator.userAgent;
    if(typeof ua != 'string' || !ua){ return; }

    var ie = /msie\s+([\d]+)/i.exec(ua);
    var ie = ie ? parseInt(ie[1]) : null;

    if(ie && ie <= 8){
        $('<div></div>').appendTo($('body')).css({
            'position': 'fixed',
            'left': '0px',
            'bottom': '0px',
            'padding': '.5em',
            'background-color': '#c03030',
            'color': 'White',
            'font-size': '10pt',
            'width': '280px',
            'z-index': '2000'
        }).text('您正在使用低版本的浏览器，部分OA的功能可能无法正常使用。推荐使用Chrome浏览器或升级您的浏览器至IE9以上。');
    }
});
    </script>
