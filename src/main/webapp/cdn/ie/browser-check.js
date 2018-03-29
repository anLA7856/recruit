/* -*- coding: utf-8 -*- */

$(document).ready(function(){

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
