/*! Claremont McKenna College - v0.1.0 - 2015-05-22
* http://www.claremontmckenna.edu/
* Copyright (c) 2015 Claremont McKenna College;*/
var cmc = {};

!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSIBLE DATA-API
  * ==================== */

  $(function () {
    $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
      $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
      $(target).collapse(option)
    })
  })

}(window.jQuery);
/*!
 * Fresco - A Beautiful Responsive Lightbox - v1.1.2
 * (c) 2012 Nick Stakenburg
 *
 * http://www.frescojs.com
 *
 * License: http://www.frescojs.com/license
 */
;var Fresco = {
  version: '1.1.2'
};

Fresco.skins = {
   // Don't modify! Its recommended to use custom skins for customization,
   // see: http://www.frescojs.com/documentation/skins
  'base': {
    effects: {
      content: { show: 0, hide: 0, sync: true },
      loading: { show: 0,  hide: 300, delay: 250 },
      thumbnails: { show: 200, slide: 0, load: 300, delay: 250 },
      window:  { show: 440, hide: 300, position: 180 },
      ui:      { show: 250, hide: 200, delay: 3000 }
    },
    touchEffects: {
      ui: { show: 175, hide: 175, delay: 5000 }
    },
    fit: 'both',
    keyboard: {
      left:  true,
      right: true,
      esc:   true
    },
    loop: false,
    onClick: 'previous-next',
    overlay: { close: true },
    position: false,
    preload: true,
    spacing: {
      both: { horizontal: 20, vertical: 20 },
      width: { horizontal: 0, vertical: 0 },
      height: { horizontal: 0, vertical: 0 },
      none: { horizontal: 0, vertical: 0 }
    },
    thumbnails: true,
    ui: 'outside',
    vimeo: {
      autoplay: 1,
      title: 1,
      byline: 1,
      portrait: 0,
      loop: 0
    },
    youtube: {
      autoplay: 1,
      controls: 1,
      enablejsapi: 1,
      hd: 1,
      iv_load_policy: 3,
      loop: 0,
      modestbranding: 1,
      rel: 0
    },

    initialTypeOptions: {
      'image': { },
      'youtube': {
        width: 640,
        height: 360
      },
      'vimeo': {
        width: 640,
        height: 360
      }
    }
  },

  // reserved for resetting options on the base skin
  'reset': { },

  // the default skin
  'fresco': { },

  // IE6 fallback skin
  'IE6': { }
};

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(D($){D 17(a){E b={};2f(E c 4n a)b[c]=a[c]+"17";M b}D 7V(a){M 6g.7W.2g(6g,a.3N(","))}D 4o(a){15.5b&&5b[5b.4o?"4o":"7X"](a)}D 4p(a,b){2f(E c 4n b)b[c]&&b[c].6h&&b[c].6h===7Y?(a[c]=$.13({},a[c])||{},4p(a[c],b[c])):a[c]=b[c];M a}D 2S(a,b){M 4p($.13({},a),b)}D 5c(){C.1n.2g(C,t.1W(1x))}D 3x(){C.1n.2g(C,t.1W(1x))}D 5d(){C.1n.2g(C,t.1W(1x))}D 5e(){C.1n.2g(C,t.1W(1x))}D 5f(){C.1n.2g(C,t.1W(1x))}D 3y(){C.1n.2g(C,t.1W(1x))}D 5g(){C.1n.2g(C,t.1W(1x))}D 4q(a){E b={V:"1o"};M $.1c(B,D(c,d){E e=d.1e(a);e&&(b=e,b.V=c,b.1p=a)}),b}D 4r(a){E b=(a||"").7Z(/\\?.*/g,"").5h(/\\.([^.]{3,4})$/);M b?b[1].5i():1i}(D(){D a(a){E b;R(a.2T.6i?b=a.2T.6i/80:a.2T.6j&&(b=-a.2T.6j/3),b){E c=$.81("1C:4s");$(a.2U).82(c,b),c.83()&&a.2a(),c.84()&&a.2V()}}$(24.3O).1y("4s 85",a)})();E t=86.2q.87,2h={4t:D(a){M a&&a.6k==1},P:{88:D(){D a(a){E b=a;4u(b&&b.6l)b=b.6l;M b}M D(b){E c=a(b);M!(!c||!c.3P)}}()}},Y=D(a){D b(b){E c=89(b+"([\\\\d.]+)").4v(a);M c?5j(c[1]):!0}M{19:!(!15.8a||a.2W("5k")!==-1)&&b("8b "),5k:a.2W("5k")>-1&&(!!15.5l&&5l.6m&&5j(5l.6m())||7.55),4w:a.2W("6n/")>-1&&b("6n/"),6o:a.2W("6o")>-1&&a.2W("8c")===-1&&b("8d:"),4x:!!a.5h(/8e.*8f.*8g/),5m:a.2W("5m")>-1&&b("5m/"),3z:a.2W("3z")>-1&&b("3z "),4y:a.2W("4y")>-1&&b("4y/")}}(6p.8h),3b={};(D(){E a={};$.1c(["8i","8j","8k","8l","8m"],D(b,c){a[c]=D(a){M Z.6q(a,b+2)}}),$.13(a,{8n:D(a){M 1-Z.8o(a*Z.8p/2)}}),$.1c(a,D(a,b){3b["8q"+a]=b,3b["8r"+a]=D(a){M 1-b(1-a)},3b["8s"+a]=D(a){M.5>a?b(a*2)/2:1-b(a*-2+2)/2}}),$.1c(3b,D(a,b){$.3b[a]||($.3b[a]=b)})})();E u={3c:{1D:{5n:"1.4.4",5o:15.1D&&1D.8t.8u}},6r:D(){D b(b){2f(E c=b.5h(a),d=c&&c[1]&&c[1].3N(".")||[],e=0,f=0,g=d.1g;g>f;f++)e+=3Q(d[f]*Z.6q(10,6-f*2));M c&&c[3]?e-1:e}E a=/^(\\d+(\\.?\\d+){0,3})([A-6s-8v-]+[A-6s-8w-9]+)?/;M D(a){(!C.3c[a].5o||b(C.3c[a].5n)>b(C.3c[a].5o)&&!C.3c[a].6t)&&(C.3c[a].6t=!0,4o("1M 8x "+a+" >= "+C.3c[a].5n))}}()},1X=D(){M{6u:D(){E a=24.8y("6u");M!(!a.6v||!a.6v("2d"))}(),3d:D(){6w{M!!("8z"4n 15||15.6x&&24 8A 6x)}6y(a){M!1}}()}}();1X.2i=1X.3d&&(Y.4x||Y.3z||Y.4y||!/^(8B|8C|8D)/.6z(6p.8E));E v;(D(a){D j(c,d){a(c).1e("1C-3A"+b)||a(c).1e("1C-3A",d),k(c)}D k(b){a(b).1y(e,l)}D l(e){D r(){R(l.6A(d),j&&q&&i>q-j&&Z.5p(m-o)>f&&g>Z.5p(n-p)){E b=l.1e("1C-3A");m>o?b&&b("1l"):b&&b("4z")}j=q=1i}D s(a){j&&(k=a.2T.4A?a.2T.4A[0]:a,q=(1N 6B).6C(),o=k.3e,p=k.3f,Z.5p(m-o)>h&&a.2V())}R(!a(C).3B("F-5q-3A")){E o,p,q,j=(1N 6B).6C(),k=e.2T.4A?e.2T.4A[0]:e,l=a(C).1y(d,s).8F(c,r),m=k.3e,n=k.3f;l.1e("2a"+b)&&e.8G()}}E b=".1C",c="8H",d="8I",e="8J",f=30,g=75,h=10,i=8K;M 1X.2i?(v=D(c,d,e){e&&a(c).1e("2a"+b,!0),d&&j(c,d)},2X 0):(v=D(){},2X 0)})(1D);E w=D(){D c(c,d,e){c=c||{},e=e||{},c.3g=c.3g||(1M.3C[x.3D]?x.3D:"1C"),Y.19&&7>Y.19&&(c.3g="8L");E f=c.3g?$.13({},1M.3C[c.3g]||1M.3C[x.3D]):{},g=2S(b,f);d&&g.5r[d]&&(g=2S(g.5r[d],g),3E g.5r);E h=2S(g,c);R(h.2j?$.V(h.2j)=="5s"&&(h.2j="6D"):h.2j="4B",h.2C&&(h.2C=$.V(h.2C)=="3R"?2S(g.2C||b.2C||a.2C,{V:h.2C}):2S(a.2C,h.2C)),!h.1j||1X.2i&&!h.5t?(h.1j={},$.1c(a.1j,D(a,b){$.1c(h.1j[a]=$.13({},b),D(b){h.1j[a][b]=0})})):1X.2i&&h.5t&&(h.1j=2S(h.1j,h.5t)),Y.19&&9>Y.19&&4p(h.1j,{1m:{1f:0,12:0},W:{2D:0},15:{1f:0,12:0},U:{1f:0,12:0}}),Y.19&&7>Y.19&&(h.W=!1),h.5u&&d!="1o"&&$.13(h.5u,{1l:!1,4z:!1}),!h.X&&$.V(h.X)!="5s"){E i=!1;2E(d){1I"1Y":i="4C://5v.1Y.3h/5w/"+e.3i+"/0.6E";3S;1I"1o":i=!0}h.X=i}M h}E a=1M.3C.8M,b=2S(a,1M.3C.8N);M{5x:c}}();$.13(5c.2q,{1n:D(a){C.J=$.13({1S:"F-1E"},1x[1]||{}),C.2F=a,C.2b(),Y.19&&9>Y.19&&$(15).1y("1O",$.Q(D(){C.P&&C.P.25(":1z")&&C.1q()},C)),C.5y()},2b:D(){R(C.P=$("<O>").K(C.J.1S).N(C.2r=$("<O>").K(C.J.1S+"-2r")),$(24.3P).3T(C.P),Y.19&&7>Y.19){C.P.16({1h:"5z"});E a=C.P[0].5A;a.3F("1t","((!!15.1D ? 1D(15).4D() : 0) + \'17\')"),a.3F("1l","((!!15.1D ? 1D(15).4E() : 0) + \'17\')")}C.P.12(),C.P.1y("1P",$.Q(D(){C.2F.I&&C.2F.I.J&&C.2F.I.J.1E&&!C.2F.I.J.1E.2c||C.2F.12()},C)),C.P.1y("1C:4s",D(a){a.2V()})},3G:D(a){C.P[0].1S=C.J.1S+" "+C.J.1S+"-"+a},8O:D(a){C.J=a,C.5y()},5y:D(){C.1q()},1f:D(a){C.1q(),C.P.1v(1,0);E b=L.T&&L.T[L.11-1];M C.3H(1,b?b.I.J.1j.15.1f:0,a),C},12:D(a){E b=L.T&&L.T[L.11-1];M C.P.1v(1,0).3U(b?b.I.J.1j.15.12||0:0,"6F",a),C},3H:D(a,b,c){C.P.3j(b||0,a,"6F",c)},6G:D(){E a={};M $.1c(["G","H"],D(b,c){E d=c.6H(0,1).8P()+c.6H(1),e=24.3O;a[c]=(Y.19?Z.1q(e["4F"+d],e["4G"+d]):Y.4w?24.3P["4G"+d]:e["4G"+d])||0}),a},1q:D(){Y.4x&&Y.4w&&8Q.18>Y.4w&&C.P.16(17(6G())),Y.19&&C.P.16(17({H:$(15).H(),G:$(15).G()}))}}),$.13(3x.2q,{1n:D(a){C.2F=a,C.J=$.13({W:z,1S:"F-1J"},1x[1]||{}),C.J.W&&(C.W=C.J.W),C.2b(),C.2Y()},2b:D(){R($(24.3P).N(C.P=$("<O>").K(C.J.1S).12().N(C.4F=$("<O>").K(C.J.1S+"-4F").N($("<O>").K(C.J.1S+"-2r")).N($("<O>").K(C.J.1S+"-2s")))),Y.19&&7>Y.19){E a=C.P[0].5A;a.1h="5z",a.3F("1t","((!!15.1D ? 1D(15).4D() + (.5 * 1D(15).H()) : 0) + \'17\')"),a.3F("1l","((!!15.1D ? 1D(15).4E() + (.5 * 1D(15).G()): 0) + \'17\')")}},3G:D(a){C.P[0].1S=C.J.1S+" "+C.J.1S+"-"+a},2Y:D(){C.P.1y("1P",$.Q(D(){C.2F.12()},C))},6I:D(a){C.5B();E b=L.T&&L.T[L.11-1];C.P.1v(1,0).3j(b?b.I.J.1j.1J.1f:0,1,a)},1v:D(a,b){E c=L.T&&L.T[L.11-1];C.P.1v(1,0).3k(b?0:c?c.I.J.1j.1J.8R:0).3U(c.I.J.1j.1J.12,a)},5B:D(){E a=0;R(C.W){C.W.2t();E a=C.W.1Q.W.H}C.4F.16({"2k-1t":(C.2F.I.J.W?a*-.5:0)+"17"})}});E x={3D:"1C",1n:D(){C.2Z=[],C.2Z.5C=$({}),C.2Z.6J=$({}),C.2l=1N 5f,C.31=1N 5e,C.2b(),C.2Y(),C.3G(C.3D)},2b:D(){R(C.1E=1N 5c(C),$(24.3P).3T(C.P=$("<O>").K("F-15").N(C.2u=$("<O>").K("F-2u").12().N(C.32=$("<O>").K("F-32")).N(C.W=$("<O>").K("F-W")))),C.1J=1N 3x(C),Y.19&&7>Y.19){E a=C.P[0].5A;a.1h="5z",a.3F("1t","((!!15.1D ? 1D(15).4D() : 0) + \'17\')"),a.3F("1l","((!!15.1D ? 1D(15).4E() : 0) + \'17\')")}R(Y.19){9>Y.19&&C.P.K("F-8S");2f(E b=6;9>=b;b++)b>Y.19&&C.P.K("F-8T"+b)}1X.3d&&C.P.K("F-3d-1K"),1X.2i&&C.P.K("F-8U-3d-1K"),C.P.1e("6K-6L",C.P[0].1S),z.1n(C.P),L.1n(C.P),3V.1n(),C.P.12()},3G:D(a,b){b=b||{},a&&(b.3g=a),C.1E.3G(a);E c=C.P.1e("6K-6L");M C.P[0].1S=c+" F-15-"+a,C},5D:D(a){1M.3C[a]&&(C.3D=a)},2Y:D(){$(24.3O).2G(".1C[3W]","1P",D(a,b){a.2a(),a.2V();E b=a.8V;L.33({x:a.3e,y:a.3f}),A.1f(b)}),$(24.3O).1y("1P",D(a){L.33({x:a.3e,y:a.3f})}),C.P.2G(".F-U-1R, .F-1F-1R","1P",$.Q(D(a){a.2a()},C)),$(24.3O).2G(".F-1E, .F-U, .F-1b, .F-2u","1P",$.Q(D(a){x.I&&x.I.J&&x.I.J.1E&&!x.I.J.1E.2c||(a.2V(),a.2a(),x.12())},C)),C.P.1y("1C:4s",D(a){a.2V()})},26:D(a,b){E c=$.13({},1x[2]||{});C.3I();E d=!1;R($.1c(a,D(a,b){M b.J.X?2X 0:(d=!0,!1)}),d&&$.1c(a,D(a,b){b.J.X=!1,b.J.W=!1}),2>a.1g){E e=a[0].J.3X;e&&e!="2c"&&(a[0].J.3X="2c")}C.4H=a,z.26(a),L.26(a),b&&C.2v(b,D(){c.3Y&&c.3Y()})},6M:D(){R(!C.2l.1A("3Z")){E a=$("4I, 5E, 8W"),b=[];a.1c(D(a,c){E d;$(c).25("5E, 4I")&&(d=$(c).3l(\'5F[8X="6N"]\')[0])&&d.6O&&d.6O.5i()=="6P"||$(c).25("[6N=\'6P\']")||b.22({P:c,2H:$(c).16("2H")})}),$.1c(b,D(a,b){$(b.P).16({2H:"8Y"})}),C.2l.1T("3Z",b)}},6Q:D(){E a=C.2l.1A("3Z");a&&a.1g>0&&$.1c(a,D(a,b){$(b.P).16({2H:b.2H})}),C.2l.1T("3Z",1i)},8Z:D(){E a=C.2l.1A("3Z");a&&$.1c(a,$.Q(D(a,b){E c;(c=$(b.P).5G(".90-1m")[0])&&c==C.1m[0]&&$(b.P).16({2H:b.2H})},C))},1f:D(){E a=D(){};M D(b){E c=L.T&&L.T[L.11-1],d=C.2Z.5C,e=c&&c.I.J.1j.15.12||0;R(C.2l.1A("1z"))M $.V(b)=="D"&&b(),2X 0;C.2l.1T("1z",!0),d.3m([]),C.6M(),c&&$.V(c.I.J.6R)=="D"&&c.I.J.6R.1W(1M);E f=2;d.3m($.Q(D(a){c.I.J.1E&&C.1E.1f($.Q(D(){1>--f&&a()},C)),C.31.1T("1f-15",$.Q(D(){C.6S(D(){1>--f&&a()})},C),e>1?Z.1Z(e*.5,50):1)},C)),a(),d.3m($.Q(D(a){3V.4J(),a()},C)),$.V(b)=="D"&&d.3m($.Q(D(a){b(),a()}),C)}}(),6S:D(a){L.1O(),C.P.1f(),C.2u.1v(!0);E b=L.T&&L.T[L.11-1];M C.3H(1,b.I.J.1j.15.1f,$.Q(D(){a&&a()},C)),C},12:D(){E a=L.T&&L.T[L.11-1],b=C.2Z.5C;b.3m([]),C.5H(),C.1J.1v(1i,!0);E c=1;b.3m($.Q(D(b){E d=a.I.J.1j.15.12||0;C.2u.1v(!0,!0).3U(d,"5I",$.Q(D(){C.P.12(),L.6T(),1>--c&&(C.5J(),b())},C)),a.I.J.1E&&(c++,C.31.1T("12-1E",$.Q(D(){C.1E.12($.Q(D(){1>--c&&(C.5J(),b())},C))},C),d>1?Z.1Z(d*.5,91):1))},C))},5J:D(){C.2l.1T("1z",!1),C.6Q(),3V.40();E a=L.T&&L.T[L.11-1];a&&$.V(a.I.J.6U)=="D"&&a.I.J.6U.1W(1M),C.31.2e(),C.3I()},3I:D(){E a=$.13({5K:!1,5L:!1},1x[0]||{});$.V(a.5L)=="D"&&a.5L.1W(1M),C.5H(),C.31.2e(),C.1h=-1,C.92=!1,x.2l.1T("41",!1),C.41&&($(C.41).1v().1G(),C.41=1i),C.5M&&($(C.5M).1v().1G(),C.5M=1i),$.V(a.5K)=="D"&&a.5K.1W(1M)},3H:D(a,b,c){C.2u.1v(!0,!0).3j(b||0,a||1,"5N",c)},5H:D(){C.2Z.6J.3m([]),C.2u.1v(!0)},2v:D(a,b){a&&C.1h!=a&&(C.31.2e("41"),C.11,C.1h=a,C.I=C.4H[a-1],C.3G(C.I.J&&C.I.J.3g,C.I.J),L.2v(a,b))}},2I={2J:D(){E a={H:$(15).H(),G:$(15).G()};M Y.4x&&(a.G=15.93,a.H=15.4K),a}},3n={3o:D(a){E b=$.13({2j:"6D",U:"2K"},1x[1]||{});b.2w||(b.2w=$.13({},L.28));E c=b.2w,d=$.13({},a),e=1,f=5;b.2L&&(c.G-=2*b.2L,c.H-=2*b.2L);E g={H:!0,G:!0};2E(b.2j){1I"4B":g={};1I"G":1I"H":g={},g[b.2j]=!0}4u(f>0&&(g.G&&d.G>c.G||g.H&&d.H>c.H)){E h=1,i=1;g.G&&d.G>c.G&&(h=c.G/d.G),g.H&&d.H>c.H&&(i=c.H/d.H);E e=Z.1Z(h,i);d={G:Z.42(a.G*e),H:Z.42(a.H*e)},f--}M d.G=Z.1q(d.G,0),d.H=Z.1q(d.H,0),d}},3V={1K:!1,43:{1l:37,4z:39,6V:27},4J:D(){C.5O()},40:D(){C.1K=!1},1n:D(){C.5O(),$(24).94($.Q(C.6W,C)).95($.Q(C.6X,C)),3V.40()},5O:D(){E a=L.T&&L.T[L.11-1];C.1K=a&&a.I.J.5u},6W:D(a){R(C.1K&&x.P.25(":1z")){E b=C.5P(a.43);R(b&&(!b||!C.1K||C.1K[b]))2E(a.2V(),a.2a(),b){1I"1l":L.1H();3S;1I"4z":L.1w()}}},6X:D(a){R(C.1K&&x.P.25(":1z")){E b=C.5P(a.43);R(b&&(!b||!C.1K||C.1K[b]))2E(b){1I"6V":x.12()}}},5P:D(a){2f(E b 4n C.43)R(C.43[b]==a)M b;M 1i}},L={1n:D(a){a&&(C.P=a,C.11=-1,C.2M=[],C.2m=0,C.2n=[],C.2Z=[],C.2Z.2x=$({}),C.32=C.P.3l(".F-32:4L"),C.6Y=C.P.3l(".F-6Y:4L"),C.4M(),C.2Y())},2Y:D(){$(15).1y("1O 96",$.Q(D(){x.2l.1A("1z")&&C.1O()},C)),C.32.2G(".F-1d","1P",$.Q(D(a){a.2a(),C.33({x:a.3e,y:a.3f});E b=$(a.2U).5G(".F-1d").1e("1d");C[b]()},C))},26:D(a){C.T&&($.1c(C.T,D(a,b){b.1G()}),C.T=1i,C.2n=[]),C.2m=0,C.T=[],$.1c(a,$.Q(D(a,b){C.T.22(1N 5d(b,a+1))},C)),C.4M()},6Z:D(a){Y.19&&9>Y.19?(C.33({x:a.3e,y:a.3f}),C.1h()):C.4N=44($.Q(D(){C.33({x:a.3e,y:a.3f}),C.1h()},C),30)},70:D(){C.4N&&(46(C.4N),C.4N=1i)},71:D(){1X.2i||C.47||C.P.1y("5Q",C.47=$.Q(C.6Z,C))},72:D(){!1X.2i&&C.47&&(C.P.6A("5Q",C.47),C.47=1i,C.70())},2v:D(a,b){C.73(),C.11=a;E c=C.T[a-1];C.32.N(c.1b),z.2v(a),c.26($.Q(D(){C.1f(a,D(){b&&b(),$.V(c.I.J.74)=="D"&&c.I.J.74.1W(1M,a)})},C)),C.76()},76:D(){R(C.T&&C.T.1g>1){E a=C.48(),b=a.1H,c=a.1w,d={1H:b!=C.11&&C.T[b-1].I,1w:c!=C.11&&C.T[c-1].I};C.11==1&&(d.1H=1i),C.11==C.T.1g&&(d.1w=1i),$.1c(d,D(a,b){b&&b.V=="1o"&&b.J.49&&y.49(d[a].1p,{5R:!0})})}},48:D(){R(!C.T)M{};E a=C.11,b=C.T.1g,c=1>=a?b:a-1,d=a>=b?1:a+1;M{1H:c,1w:d}},77:D(){E a=L.T&&L.T[L.11-1];M a&&a.I.J.34&&C.T&&C.T.1g>1||C.11!=1},1H:D(a){(a||C.77())&&x.2v(C.48().1H)},78:D(){E a=L.T&&L.T[L.11-1];M a&&a.I.J.34&&C.T&&C.T.1g>1||C.T&&C.T.1g>1&&C.48().1w!=1},1w:D(a){(a||C.78())&&x.2v(C.48().1w)},79:D(a){C.7a(a)||C.2M.22(a)},7b:D(a){C.2M=$.7c(C.2M,D(b){M b!=a})},7a:D(a){M $.7d(a,C.2M)>-1},1O:D(){Y.19&&7>Y.19||z.1O(),C.4M(),C.32.16(17(C.1r)),$.1c(C.T,D(a,b){b.1O()})},1h:D(){1>C.2n.1g||$.1c(C.2n,D(a,b){b.1h()})},33:D(a){a.y-=$(15).4D(),a.x-=$(15).4E();E b={y:Z.1Z(Z.1q(a.y/C.1r.H,0),1),x:Z.1Z(Z.1q(a.x/C.1r.G,0),1)},c=20,d={x:"G",y:"H"},e={};$.1c("x y".3N(" "),$.Q(D(a,f){e[f]=Z.1Z(Z.1q(c/C.1r[d[f]],0),1),b[f]*=1+2*e[f],b[f]-=e[f],b[f]=Z.1Z(Z.1q(b[f],0),1)},C)),C.7e(b)},7e:D(a){C.5S=a},4M:D(){E b=2I.2J();z.1z()&&(z.2t(),b.H-=z.1Q.W.H),C.2m=0,C.T&&$.1c(C.T,$.Q(D(a,b){R(b.I.J.U=="1U"){E c=b.2c;C.T.1g>1&&(b.5T&&(c=c.1B(b.5T)),b.3J&&(c=c.1B(b.3J)));E d=0;b.4O(D(){$.1c(c,D(a,b){d=Z.1q(d,$(b).2o(!0))})}),C.2m=Z.1q(C.2m,d)||0}},C));E c=$.13({},b,{G:b.G-2*(C.2m||0)});C.1r=b,C.28=c},97:D(){M{1H:C.11-1>0,1w:C.T.1g>=C.11+1}},1f:D(a,b){E c=[];$.1c(C.T,D(b,d){d.11!=a&&c.22(d)});E d=c.1g+1,e=C.T[C.11-1];z[e.I.J.W?"1f":"12"](),C.1O();E f=e.I.J.1j.1m.5U;$.1c(c,$.Q(D(c,e){e.12($.Q(D(){f?b&&1>=d--&&b():2>=d--&&C.T[a-1].1f(b)},C))},C)),f&&C.T[a-1].1f(D(){b&&1>=d--&&b()})},6T:D(){$.1c(C.2M,$.Q(D(a,b){C.T[b-1].12()},C)),z.12(),C.33({x:0,y:0})},98:D(a){$.1c(C.T,$.Q(D(b,c){c.1h!=a&&c.12()},C))},7f:D(a){C.7g(a)||(C.2n.22(C.T[a-1]),C.2n.1g==1&&C.71())},99:D(){C.2n=[]},5V:D(a){C.2n=$.7c(C.2n,D(b){M b.11!=a}),1>C.2n.1g&&C.72()},7g:D(a){E b=!1;M $.1c(C.2n,D(c,d){M d.11==a?(b=!0,!1):2X 0}),b},2w:D(){E a=C.1r;M x.9a&&(a.G-=9b),a},73:D(){$.1c(C.T,$.Q(D(a,b){b.7h()},C))}};$.13(5d.2q,{1n:D(a,b){C.I=a,C.11=b,C.1r={},C.2b()},1G:D(){C.4P(),C.4a&&(L.5V(C.11),C.4a=!1),C.1b.1G(),C.1b=1i,C.U.1G(),C.U=1i,C.I=1i,C.1r={},C.3I(),C.5W&&(9c(C.5W),C.5W=1i)},2b:D(){E a=C.I.J.U,b=x.4H.1g;L.32.N(C.1b=$("<O>").K("F-1b").N(C.1F=$("<O>").K("F-1F").K("F-1F-2y-U-"+C.I.J.U)).12());E c=C.I.J.3X;R(C.I.V=="1o"&&(c=="1w"&&(C.I.J.34||!C.I.J.34&&C.11!=x.4H.1g)||c=="2c")&&C.1b.K("F-1b-35-"+c.5i()),C.I.J.U=="1U"?C.1b.3T(C.U=$("<O>").K("F-U F-U-1U")):C.1b.N(C.U=$("<O>").K("F-U F-U-2K")),C.1F.N(C.3p=$("<O>").K("F-1F-1R").N(C.4Q=$("<O>").K("F-1F-2N").N(C.4R=$("<O>").K("F-1F-7i-2L").N(C.2O=$("<O>").K("F-1F-1k"))))),1X.2i&&v(C.1F,D(a){L[a=="1l"?"1w":"1H"]()},!1),C.3p.1y("1P",$.Q(D(a){a.2U==C.3p[0]&&C.I.J.1E&&C.I.J.1E.2c&&x.12()},C)),C.5X=C.3p,C.7j=C.2O,C.5Y=C.4Q,C.I.J.U=="1U"?C.U.N(C.1V=$("<O>").K("F-U-1k-1U")):(C.U.N(C.4S=$("<O>").K("F-U-1R").N(C.4b=$("<O>").K("F-U-2N").N(C.5Z=$("<O>").K("F-U-7i-2L").N(C.7k=$("<O>").K("F-U-9d").N(C.1V=$("<O>").K("F-U-1k")))))),C.5X=C.5X.1B(C.4S),C.1k=C.7j.1B(C.1V),C.5Y=C.5Y.1B(C.4b)),b>1&&(C.1V.N(C.3q=$("<O>").K("F-1d F-1d-1w").N(C.3J=$("<O>").K("F-1d-21").N($("<O>").K("F-1d-21-2s"))).1e("1d","1w")),C.11!=b||C.I.J.34||(C.3q.K("F-1d-4c"),C.3J.K("F-1d-21-4c")),C.1V.N(C.3r=$("<O>").K("F-1d F-1d-1H").N(C.4T=$("<O>").K("F-1d-21").N($("<O>").K("F-1d-21-2s"))).1e("1d","1H")),C.11!=1||C.I.J.34||(C.3r.K("F-1d-4c"),C.4T.K("F-1d-21-4c"))),C.1b.K("F-2p-1a"),(C.I.1a||C.I.J.U=="2K"&&!C.I.1a)&&(C[C.I.J.U=="2K"?"1V":"1b"].N(C.1u=$("<O>").K("F-1u F-1u-"+C.I.J.U).N(C.9e=$("<O>").K("F-1u-2r")).N(C.60=$("<O>").K("F-1u-2N"))),C.1u.1y("1P",D(a){a.2a()})),C.I.1a&&(C.1b.2P("F-2p-1a").K("F-2y-1a"),C.60.N(C.1a=$("<O>").K("F-1a").7l(C.I.1a))),b>1&&C.I.J.1h){E d=C.11+" / "+b;C.1b.K("F-2y-1h");E a=C.I.J.U;C[a=="2K"?"60":"1V"][a=="2K"?"3T":"N"](C.5T=$("<O>").K("F-1h").N($("<O>").K("F-1h-2r")).N($("<61>").K("F-1h-9f").7l(d)))}C.1V.N(C.2c=$("<O>").K("F-2c").1y("1P",D(){x.12()}).N($("<61>").K("F-2c-2r")).N($("<61>").K("F-2c-2s"))),C.I.V=="1o"&&C.I.J.3X=="2c"&&C[C.I.J.U=="1U"?"2O":"4b"].1y("1P",D(a){a.2V(),a.2a(),x.12()}),C.1b.12()},62:D(a){R(!C.I.1a)M 0;C.I.J.U=="1U"&&(a=Z.1Z(a,L.28.G));E b,c=C.1u.16("G");M C.1u.16({G:a+"17"}),b=5j(C.1u.16("H")),C.1u.16({G:c}),b},4O:D(a,b){E c=[],d=x.P.1B(x.2u).1B(C.1b).1B(C.U);b&&(d=d.1B(b)),$.1c(d,D(a,b){c.22({1z:$(b).25(":1z"),P:$(b).1f()})}),a(),$.1c(c,D(a,b){b.1z||b.P.12()})},3s:D(){C.2t();E a=C.1r.1q,b=C.I.J.U,c=C.63,d=C.7m,e=C.4U,f=3n.3o(a,{2j:c,U:b,2L:e}),g=$.13({},f);R(e&&(g=3n.3o(g,{2w:f,U:b}),f.G+=2*e,f.H+=2*e),d.7n||d.4V){E i=$.13({},L.28);e&&(i.G-=2*e,i.H-=2*e),i={G:Z.1q(i.G-2*d.7n,0),H:Z.1q(i.H-2*d.4V,0)},g=3n.3o(g,{2j:c,2w:i,U:b})}E j={1a:!0},k=!1;R(b=="1U"){E d={H:f.H-g.H,G:f.G-g.G},l=$.13({},g);C.1a&&C.1b.3B("F-2p-1a");E n;R(C.1a){n=C.1a,C.1u.2P("F-2p-1a");E o=C.1b.3B("F-2p-1a");C.1b.2P("F-2p-1a");E p=C.1b.3B("F-2y-1a");C.1b.K("F-2y-1a")}x.P.16({2H:"1z"}),C.4O($.Q(D(){E a=0,f=2;4u(f>a){j.H=C.62(g.G);E h=.5*(L.28.H-2*e-(d.4V?d.4V*2:0)-g.H);j.H>h&&(g=3n.3o(g,{2w:$.13({},{G:g.G,H:Z.1q(g.H-j.H,0)}),2j:c,U:b})),a++}j.H=C.62(g.G);E i=2I.2J();(4W>=i.H&&4X>=i.G||4W>=i.G&&4X>=i.H||j.H>=.5*g.H||j.H>=.6*g.G)&&(j.1a=!1,j.H=0,g=l)},C),n),x.P.16({2H:"1z"}),o&&C.1b.K("F-2p-1a"),p&&C.1b.K("F-2y-1a");E q={H:f.H-g.H,G:f.G-g.G};f.H+=d.H-q.H,f.G+=d.G-q.G,g.H!=l.H&&(k=!0)}29 j.H=0;E r={G:g.G+2*e,H:g.H+2*e};j.H&&(f.H+=j.H),b=="2K"&&(j.H=0);E s={1R:{14:f},2N:{14:r},1k:{14:g,2w:r,2k:{1t:.5*(f.H-r.H)-.5*j.H,1l:.5*(f.G-r.G)}},1m:{14:g},1u:j};b=="1U"&&(s.1u.1t=s.1k.2k.1t,j.G=Z.1Z(g.G,L.28.G));E i=$.13({},L.28);M b=="1U"&&(s.1F={14:{G:L.28.G},1h:{1l:.5*(L.1r.G-L.28.G)}}),s.U={1R:{14:{G:Z.1Z(f.G,i.G),H:Z.1Z(f.H,i.H)}},2N:{14:r},1k:{14:{G:Z.1Z(s.1k.14.G,i.G-2*e),H:Z.1Z(s.1k.14.H,i.H-2*e)},2k:{1t:s.1k.2k.1t+e,1l:s.1k.2k.1l+e}}},s},2t:D(){E a=$.13({},C.1r.1q),b=3Q(C.4R.16("2L-1t-G"));C.4U=b,b&&(a.G-=2*b,a.H-=2*b);E c=C.I.J.2j;c=="9g"?c=a.G>a.H?"H":a.H>a.G?"G":"4B":c||(c="4B"),C.63=c;E d=C.I.J.9h[C.63];C.7m=d},64:D(){C.4d&&(46(C.4d),C.4d=1i)},7h:D(){C.4d&&C.2z&&!C.36&&(C.64(),C.2z=!1)},26:D(a){M C.36||C.2z?(C.36&&C.4Y(a),2X 0):(y.1s.1A(C.I.1p)||y.38.7o(C.I.1p)||x.1J.6I(),C.2z=!0,C.4d=44($.Q(D(){2E(C.64(),C.I.V){1I"1o":y.1A(C.I.1p,$.Q(D(b){C.1r.7p=b,C.1r.1q=b,C.36=!0,C.2z=!1,C.2t();E d=C.3s();C.1r.1R=d.1R.14,C.1r.1m=d.1m.14,C.1m=$("<5v>").2A({3t:C.I.1p}),C.2O.N(C.1m.K("F-1m F-1m-1o")),C.2O.N($("<O>").K("F-1m-1o-1E "));E e;C.I.J.U=="1U"&&((e=C.I.J.3X)&&e=="1w"||e=="1H-1w")&&(C.I.J.34||C.11==L.T.1g||C.2O.N($("<O>").K("F-35-1d F-35-1w").1e("1d","1w")),e!="1H-1w"||C.I.J.34||C.11==1||C.2O.N($("<O>").K("F-35-1d F-35-1H").1e("1d","1H")),C.1b.2G(".F-35-1d","1P",$.Q(D(a){E b=$(a.2U).1e("1d");L[b]()},C)),C.1b.2G(".F-35-1d","7q",$.Q(D(a){E b=$(a.2U).1e("1d"),c=b&&C["2h"+b+"4Z"];c&&C["2h"+b+"4Z"].K("F-1d-21-51")},C)),C.1b.2G(".F-35-1d","7r",$.Q(D(a){E b=$(a.2U).1e("1d"),c=b&&C["2h"+b+"4Z"];c&&C["2h"+b+"4Z"].2P("F-1d-21-51")},C))),C.4Y(a)},C));3S;1I"1Y":1I"2Q":E b={G:C.I.J.G,H:C.I.J.H};C.I.V=="1Y"&&C.I.J.1Y&&C.I.J.1Y.7s&&(C.I.2B.7t=b.G>9i?"9j":"9k"),C.1r.7p=b,C.1r.1q=b,C.36=!0,C.2z=!1,C.2t();E c=C.3s();C.1r.1R=c.1R.14,C.1r.1m=c.1m.14,C.2O.N(C.1m=$("<O>").K("F-1m F-1m-"+C.I.V)),C.4Y(a)}},C),10),2X 0)},4Y:D(a){C.1O(),C.I.J.U=="2K"&&C.5Z.1y("7q",$.Q(C.4e,C)).1y("7r",$.Q(C.52,C)),1X.2i?C.1F.1y("1P",$.Q(D(){C.1V.25(":1z")||C.4e(),C.4f()},C)):C.U.2G(".F-U-2N","5Q",$.Q(D(){C.1V.25(":1z")||C.4e(),C.4f()},C));E b;L.T&&(b=L.T[L.11-1])&&b.I.1p==C.I.1p&&x.1J.1v(),a&&a()},1O:D(){R(C.1m){E a=C.3s();C.1r.1R=a.1R.14,C.1r.1m=a.1m.14,C.3p.16(17(a.1R.14)),C.I.J.U=="2K"&&C.4S.16(17(a.U.1R.14)),C.2O.1B(C.4R).16(17(a.1k.14));E b=0;R(C.I.J.U=="1U"&&a.1u.1a&&(b=a.1u.H),C.4R.16({"65-7u":b+"17"}),C.4Q.16(17({G:a.2N.14.G,H:a.2N.14.H+b})),a.1R.14.G>(C.I.J.U=="1U"?a.1F.14.G:2I.2J().G)?C.1F.K("F-5q-3A"):C.1F.2P("F-5q-3A"),C.I.J.U=="1U")C.1a&&C.1u.16(17({G:a.1u.G}));29{C.1V.1B(C.5Z).1B(C.7k).16(17(a.U.1k.14)),C.4b.16(17(a.U.2N.14));E c=0;R(C.1a){E d=C.1b.3B("F-2p-1a"),e=C.1b.3B("F-2y-1a");C.1b.2P("F-2p-1a"),C.1b.K("F-2y-1a");E c=0;C.4O($.Q(D(){c=C.1u.9l()},C),C.1V.1B(C.1a));E f=2I.2J();(c>=.45*a.1k.14.H||4W>=f.H&&4X>=f.G||4W>=f.G&&4X>=f.H)&&(a.1u.1a=!1),d&&C.1b.K("F-2p-1a"),e||C.1b.2P("F-2y-1a")}}R(C.1a){E g=a.1u.1a;C.1a[g?"1f":"12"](),C.1b[(g?"1G":"1B")+"53"]("F-2p-1a"),C.1b[(g?"1B":"1G")+"53"]("F-2y-1a")}C.4Q.1B(C.4b).16(17(a.1k.2k));E h=L.28,i=C.1r.1R;R(C.54={y:i.H-h.H,x:i.G-h.G},C.4a=C.54.x>0||C.54.y>0,L[(C.4a?"1T":"1G")+"9m"](C.11),Y.19&&8>Y.19&&C.I.V=="1o"&&C.1m.16(17(a.1k.14)),/^(2Q|1Y)$/.6z(C.I.V)){E j=a.1k.14;C.3u?C.3u.9n(j.G,j.H):C.3v&&C.3v.2A(j)}}C.1h()},1h:D(){R(C.1m){E a=L.5S,b=L.28,c=C.1r.1R,d={1t:0,1l:0},e=C.54;C.1b.2P("F-1b-3d"),(e.x||e.y)&&1X.4G&&C.1b.K("F-1b-3d"),d.1t=e.y>0?0-a.y*e.y:b.H*.5-c.H*.5,d.1l=e.x>0?0-a.x*e.x:b.G*.5-c.G*.5,1X.2i&&(e.y>0&&(d.1t=0),e.x>0&&(d.1l=0),C.3p.16({1h:"9o"})),C.9p=d,C.3p.16({1t:d.1t+"17",1l:d.1l+"17"});E f=$.13({},d);R(0>f.1t&&(f.1t=0),0>f.1l&&(f.1l=0),C.I.J.U=="1U"){E g=C.3s();R(C.1F.16(17(g.1F.14)).16(17(g.1F.1h)),C.I.1a){E h=d.1t+g.1k.2k.1t+g.1k.14.H+C.4U;h>L.28.H-g.1u.H&&(h=L.28.H-g.1u.H);E i=L.2m+d.1l+g.1k.2k.1l+C.4U;L.2m>i&&(i=L.2m),i+g.1u.G>L.2m+g.1F.14.G&&(i=L.2m),C.1u.16({1t:h+"17",1l:i+"17"})}}29 C.4S.16({1l:f.1l+"17",1t:f.1t+"17"})}},9q:D(a){C.14=a},7v:D(){2E(C.I.V){1I"1Y":E a=Y.19&&8>Y.19,b=C.3s(),c=b.1k.14;R(15.7w){E d;C.1m.N(C.56=$("<O>").N(d=$("<O>")[0])),C.3u=1N 7w.9r(d,{H:c.H,G:c.G,9s:C.I.2B.3i,9t:C.I.J.1Y,9u:a?{}:{9v:$.Q(D(a){R(C.I.J.1Y.7s)6w{a.2U.9w(C.I.2B.7t)}6y(b){}C.1O()},C)}})}29{E e=$.5F(C.I.J.1Y||{});C.1m.N(C.3v=$("<7x 7y 7z 7A>").2A({3t:"4C://9x.1Y.3h/4I/"+C.I.2B.3i+"?"+e,H:c.H,G:c.G,7B:0}))}3S;1I"2Q":E b=C.3s(),c=b.1k.14,e=$.5F(C.I.J.2Q||{});C.1m.N(C.3v=$("<7x 7y 7z 7A>").2A({3t:"4C://3u.2Q.3h/7C/"+C.I.2B.3i+"?"+e,H:c.H,G:c.G,7B:0}))}},1f:D(a){Y.19&&8>Y.19,C.7v(),L.79(C.11),C.1b.1v(1,0),C.U.1v(1,0),C.4e(1i,!0),C.4a&&L.7f(C.11),C.3H(1,Z.1q(C.I.J.1j.1m.1f,Y.19&&9>Y.19?0:10),$.Q(D(){a&&a()},C))},7D:D(){C.3v&&(C.3v.1G(),C.3v=1i),C.3u&&(C.3u.9y(),C.3u=1i),C.56&&(C.56.1G(),C.56=1i)},3I:D(){L.5V(C.11),L.7b(C.11),C.7D()},12:D(a){E b=Z.1q(C.I.J.1j.1m.12||0,Y.19&&9>Y.19?0:10),c=C.I.J.1j.1m.5U?"9z":"5N";C.1b.1v(1,0).3U(b,c,$.Q(D(){C.3I(),a&&a()},C))},3H:D(a,b,c){E d=C.I.J.1j.1m.5U?"9A":"5I";C.1b.1v(1,0).3j(b||0,a,d,c)},4e:D(a,b){b?(C.1V.1f(),C.4f(),$.V(a)=="D"&&a()):C.1V.1v(1,0).3j(b?0:C.I.J.1j.U.1f,1,"5I",$.Q(D(){C.4f(),$.V(a)=="D"&&a()},C))},52:D(a,b){C.I.J.U!="1U"&&(b?(C.1V.12(),$.V(a)=="D"&&a()):C.1V.1v(1,0).3U(b?0:C.I.J.1j.U.12,"5N",D(){$.V(a)=="D"&&a()}))},4P:D(){C.4g&&(46(C.4g),C.4g=1i)},4f:D(){C.4P(),C.4g=44($.Q(D(){C.52()},C),C.I.J.1j.U.3k)},9B:D(){C.4P(),C.4g=44($.Q(D(){C.52()},C),C.I.J.1j.U.3k)}}),$.13(5e.2q,{1n:D(){C.23={},C.57=0},1T:D(a,b,c){R($.V(a)=="3R"&&C.2e(a),$.V(a)=="D"){c=b,b=a;4u(C.23["7E"+C.57])C.57++;a="7E"+C.57}C.23[a]=15.44($.Q(D(){b&&b(),C.23[a]=1i,3E C.23[a]},C),c)},1A:D(a){M C.23[a]},2e:D(a){a||($.1c(C.23,$.Q(D(a,b){15.46(b),C.23[a]=1i,3E C.23[a]},C)),C.23={}),C.23[a]&&(15.46(C.23[a]),C.23[a]=1i,3E C.23[a])}}),$.13(5f.2q,{1n:D(){C.66={}},1T:D(a,b){C.66[a]=b},1A:D(a){M C.66[a]||!1}}),$.13(3y.2q,{1n:D(a){E b=1x[1]||{},d={};R($.V(a)=="3R")a={1p:a};29 R(a&&a.6k==1){E c=$(a);a={P:c[0],1p:c.2A("3W"),1a:c.1e("1C-1a"),3K:c.1e("1C-3K"),4h:c.1e("1C-4h"),V:c.1e("1C-V"),J:c.1e("1C-J")&&67("({"+c.1e("1C-J")+"})")||{}}}R(a&&(a.4h||(a.4h=4r(a.1p)),!a.V)){E d=4q(a.1p);a.2B=d,a.V=d.V}M a.2B||(a.2B=4q(a.1p)),a.J=a&&a.J?$.13(!0,$.13({},b),$.13({},a.J)):$.13({},b),a.J=w.5x(a.J,a.V,a.2B),$.13(C,a),C}});E y={1A:D(a,b,c){$.V(b)=="D"&&(c=b,b={}),b=$.13({58:!0,V:!1,9C:9D},b||{});E d=y.1s.1A(a),e=b.V||4q(a).V,f={V:e,3Y:c};R(!d&&e=="1o"){E g;(g=y.38.1A(a))&&g.14&&(d=g,y.1s.1T(a,g.14,g.1e))}R(d)c&&c($.13({},d.14),d.1e);29 2E(b.58&&y.1J.2e(a),e){1I"1o":E h=1N 7F;h.3L=D(){h.3L=D(){},d={14:{G:h.G,H:h.H}},f.1o=h,y.1s.1T(a,d.14,f),b.58&&y.1J.2e(a),c&&c(d.14,f)},h.3t=a,b.58&&y.1J.1T(a,{1o:h,V:e})}}};y.68=D(){M C.1n.2g(C,t.1W(1x))},$.13(y.68.2q,{1n:D(){C.1s=[]},1A:D(a){2f(E b=1i,c=0;C.1s.1g>c;c++)C.1s[c]&&C.1s[c].1p==a&&(b=C.1s[c]);M b},1T:D(a,b,c){C.1G(a),C.1s.22({1p:a,14:b,1e:c})},1G:D(a){2f(E b=0;C.1s.1g>b;b++)C.1s[b]&&C.1s[b].1p==a&&3E C.1s[b]},9E:D(a){E b=1A(a.1p);b?$.13(b,a):C.1s.22(a)}}),y.1s=1N y.68,y.3x=D(){M C.1n.2g(C,t.1W(1x))},$.13(y.3x.2q,{1n:D(){C.1s=[]},1T:D(a,b){C.2e(a),C.1s.22({1p:a,1e:b})},1A:D(a){2f(E b=1i,c=0;C.1s.1g>c;c++)C.1s[c]&&C.1s[c].1p==a&&(b=C.1s[c]);M b},2e:D(a){2f(E b=C.1s,c=0;b.1g>c;c++)R(b[c]&&b[c].1p==a&&b[c].1e){E d=b[c].1e;2E(d.V){1I"1o":d.1o&&d.1o.3L&&(d.1o.3L=D(){})}3E b[c]}}}),y.1J=1N y.3x,y.49=D(a,b,c){R($.V(b)=="D"&&(c=b,b={}),b=$.13({5R:!1},b||{}),!b.5R||!y.38.1A(a)){E d;R((d=y.38.1A(a))&&d.14)M $.V(c)=="D"&&c($.13({},d.14),d.1e),2X 0;E e={1p:a,1e:{V:"1o"}},f=1N 7F;e.1e.1o=f,f.3L=D(){f.3L=D(){},e.14={G:f.G,H:f.H},$.V(c)=="D"&&c(e.14,e.1e)},y.38.1s.1B(e),f.3t=a}},y.38={1A:D(a){M y.38.1s.1A(a)},7o:D(a){E b=C.1A(a);M b&&b.14}},y.38.1s=D(){D b(b){2f(E c=1i,d=0,e=a.1g;e>d;d++)a[d]&&a[d].1p&&a[d].1p==b&&(c=a[d]);M c}D c(b){a.22(b)}E a=[];M{1A:b,1B:c}}();E z={1n:D(a){C.P=a,C.1L=[],C.1Q={X:{H:0,2o:0},W:{H:0}},C.W=C.P.3l(".F-W:4L"),C.2b(),C.12(),C.2Y()},2b:D(){C.W.N(C.1k=$("<O>").K("F-W-1k").N(C.4i=$("<O>").K("F-W-4i").N(C.3r=$("<O>").K("F-W-1d F-W-1d-1H").N(C.4T=$("<O>").K("F-W-1d-21").N($("<O>").K("F-W-1d-21-2r")).N($("<O>").K("F-W-1d-21-2s")))).N(C.3w=$("<O>").K("F-W-9F").N(C.2D=$("<O>").K("F-W-2D"))).N(C.3q=$("<O>").K("F-W-1d F-W-1d-1w").N(C.3J=$("<O>").K("F-W-1d-21").N($("<O>").K("F-W-1d-21-2r")).N($("<O>").K("F-W-1d-21-2s")))))),C.1O()},2Y:D(){C.4i.2G(".F-X","1P",$.Q(D(a){a.2a();E b=$(a.2U).5G(".F-X")[0],c=-1;C.4i.3l(".F-X").1c(D(a,d){d==b&&(c=a+1)}),c&&(C.69(c),x.2v(c))},C)),C.4i.1y("1P",D(a){a.2a()}),C.3r.1y("1P",$.Q(C.7G,C)),C.3q.1y("1P",$.Q(C.7H,C)),1X.2i&&v(C.1k,$.Q(D(a){C[(a=="1l"?"1w":"1H")+"9G"]()},C),!1)},26:D(a){C.2e(),C.1L=[],$.1c(a,$.Q(D(a,b){C.1L.22(1N 5g(C.2D,b,a+1))},C)),Y.19&&7>Y.19||C.1O()},2e:D(){$.1c(C.1L,D(a,b){b.1G()}),C.1L=[],C.11=-1,C.2R=-1},2t:D(){E a=x.P,b=x.2u,c=C.1Q,d=a.25(":1z");d||a.1f();E e=b.25(":1z");e||b.1f();E f=C.W.4K()-(3Q(C.W.16("65-1t"))||0)-(3Q(C.W.16("65-7u"))||0);c.X.H=f;E g=C.2D.3l(".F-X:4L"),h=!!g[0],i=0;h||C.3w.N(g=$("<O>").K("F-X").N($("<O>").K("F-X-1k"))),i=3Q(g.16("2k-1l")),h||g.1G(),c.X.2o=f+i*2,c.W.H=C.W.4K(),c.2x={1H:C.3r.2o(!0),1w:C.3q.2o(!0)};E j=2I.2J().G,k=c.X.2o,l=C.1L.1g;c.2x.1K=l*k/j>1;E m=j,n=c.2x.1H+c.2x.1w;c.2x.1K&&(m-=n),m=Z.7I(m/k)*k;E o=l*k;m>o&&(m=o);E p=m+(c.2x.1K?n:0);c.3a=m/k,C.4j="59",1>=c.3a&&(m=j,p=j,c.2x.1K=!1,C.4j="5B"),c.6a=Z.4k(l*k/m),c.W.G=m,c.1k={G:p},e||b.12(),d||a.12()},40:D(){C.6b=!0},4J:D(){C.6b=!1},1K:D(){M!C.6b},1f:D(){2>C.1L.1g||(C.4J(),C.W.1f(),C.2M=!0)},12:D(){C.40(),C.W.12(),C.2M=!1},1z:D(){M!!C.2M},1O:D(){C.2t();E a=C.1Q;$.1c(C.1L,D(a,b){b.1O()}),C.3r[a.2x.1K?"1f":"12"](),C.3q[a.2x.1K?"1f":"12"]();E b=a.W.G;Y.19&&9>Y.19&&(x.31.2e("7J-7K-W"),x.31.1T("7J-7K-W",$.Q(D(){C.2t();E b=a.W.G;C.3w.16({G:b+"17"}),C.2D.16({G:C.1L.1g*a.X.2o+1+"17"})},C),9H)),C.3w.16({G:b+"17"}),C.2D.16({G:C.1L.1g*a.X.2o+1+"17"});E c=a.1k.G+1;R(C.1k.16({G:c+"17","2k-1l":-.5*c+"17"}),C.3r.1B(C.3q).16({H:a.X.H+"17"}),C.11&&C.5a(C.11,!0),Y.19&&9>Y.19){E d=x.P,e=x.2u,f=d.25(":1z");f||d.1f();E g=e.25(":1z");g||e.1f(),C.3w.H("9I%"),C.3w.16({H:C.3w.4K()+"17"}),C.W.3l(".F-X-1E-2L").12(),g||e.12(),f||d.12()}},6c:D(a){R(!(1>a||a>C.1Q.6a||a==C.2R)){E b=C.1Q.3a*(a-1)+1;C.5a(b)}},7G:D(){C.6c(C.2R-1)},7H:D(){C.6c(C.2R+1)},9J:D(){E a=2I.2J();M a},2v:D(a){R(!(Y.19&&7>Y.19)){E b=0>C.11;1>a&&(a=1);E c=C.1L.1g;a>c&&(a=c),C.11=a,C.69(a),(C.4j!="59"||C.2R!=Z.4k(a/C.1Q.3a))&&C.5a(a,b)}},5a:D(a,b){C.2t();E c,d=2I.2J().G,e=d*.5,f=C.1Q.X.2o;R(C.4j=="59"){E g=Z.4k(a/C.1Q.3a);C.2R=g,c=-1*f*(C.2R-1)*C.1Q.3a;E h="F-W-1d-21-4c";C.4T[(2>g?"1B":"1G")+"53"](h),C.3J[(g>=C.1Q.6a?"1B":"1G")+"53"](h)}29 c=e+-1*(f*(a-1)+f*.5);E i=L.T&&L.T[L.11-1];C.2D.1v(1,0).9K({1l:c+"17"},b?0:i?i.I.J.1j.W.2D:0,$.Q(D(){C.7L()},C))},7L:D(){E a,b;R(C.11&&C.1Q.X.2o&&!(1>C.1L.1g)){R(C.4j=="59"){R(1>C.2R)M;a=(C.2R-1)*C.1Q.3a+1,b=Z.1Z(a-1+C.1Q.3a,C.1L.1g)}29{E c=Z.4k(2I.2J().G/C.1Q.X.2o);a=Z.1q(Z.7I(Z.1q(C.11-c*.5,0)),1),b=Z.4k(Z.1Z(C.11+c*.5)),b>C.1L.1g&&(b=C.1L.1g)}2f(E d=a;b>=d;d++)C.1L[d-1].26()}},69:D(a){$.1c(C.1L,D(a,b){b.7M()});E b=a&&C.1L[a-1];b&&b.7N()},9L:D(){C.11&&C.2v(C.11)}};$.13(5g.2q,{1n:D(a,b,c){C.P=a,C.I=b,C.9M={},C.11=c,C.2b()},2b:D(){E a=C.I.J;C.P.N(C.X=$("<O>").K("F-X").N(C.7O=$("<O>").K("F-X-1k"))),C.I.V=="1o"&&C.X.K("F-26-X").1e("X",{I:C.I,3t:a.X||C.I.1p});E b=a.X&&a.X.2s;b&&C.X.N($("<O>").K("F-X-2s F-X-2s-"+b));E c;C.X.N(c=$("<O>").K("F-X-1E").N($("<O>").K("F-X-1E-2r")).N(C.1J=$("<O>").K("F-X-1J").N($("<O>").K("F-X-1J-2r")).N($("<O>").K("F-X-1J-2s"))).N($("<O>").K("F-X-1E-2L"))),C.X.N($("<O>").K("F-X-9N"))},1G:D(){C.X.1G(),C.X=1i,C.9O=1i},26:D(){R(!C.36&&!C.2z&&z.1z()){C.2z=!0;E a=C.I.J.X,b=a&&$.V(a)=="5s"?C.I.1p:a||C.I.1p;C.4l=b,b&&(C.I.V=="2Q"?$.9P("4C://2Q.3h/9Q/9R/7C/"+C.I.2B.3i+".9S?3Y=?",$.Q(D(a){a&&a[0]&&a[0].7P?(C.4l=a[0].7P,y.49(C.4l,{V:"1o"},$.Q(C.6d,C))):(C.36=!0,C.2z=!1,C.1J.1v(1,0).3k(C.I.J.1j.W.3k).3j(C.I.J.1j.W.26,0))},C)):y.49(C.4l,{V:"1o"},$.Q(C.6d,C)))}},6d:D(a){C.X&&(C.36=!0,C.2z=!1,C.1r=a,C.1o=$("<5v>").2A({3t:C.4l}),C.7O.3T(C.1o),C.1O(),C.1J.1v(1,0).3k(C.I.J.1j.W.3k).3j(C.I.J.1j.W.26,0))},1O:D(){E a=z.1Q.X.H;R(C.X.16({G:a+"17",H:a+"17"}),C.1o){E d,b={G:a,H:a},c=Z.1q(b.G,b.H),e=$.13({},C.1r);R(e.G>b.G&&e.H>b.H){d=3n.3o(e,{2w:b});E f=1,g=1;b.G>d.G&&(f=b.G/d.G),b.H>d.H&&(g=b.H/d.H);E h=Z.1q(f,g);h>1&&(d.G*=h,d.H*=h),$.1c("G H".3N(" "),D(a,b){d[b]=Z.42(d[b])})}29 d=3n.3o(b.G>e.G||b.H>e.H?{G:c,H:c}:b,{2w:C.1r});E i=Z.42(b.G*.5-d.G*.5),j=Z.42(b.H*.5-d.H*.5);C.1o.16(17(d)).16(17({1t:j,1l:i}))}},7N:D(){C.X.K("F-X-51")},7M:D(){C.X.2P("F-X-51")}});E A={1f:D(d){E e=1x[1]||{},1h=1x[2];1x[1]&&$.V(1x[1])=="9T"&&(1h=1x[1],e=w.5x({}));E f=[],7Q;2E(7Q=$.V(d)){1I"3R":1I"5E":E g=1N 3y(d,e),4m="1e-1C-3K-J";R(g.3K){R(2h.4t(d)){E h=$(\'.1C[1e-1C-3K="\'+$(d).1e("1C-3K")+\'"]\'),j={};h.9U("["+4m+"]").1c(D(i,a){$.13(j,67("({"+($(a).2A(4m)||"")+"})"))}),h.1c(D(a,b){1h||b!=d||(1h=a+1),f.22(1N 3y(b,$.13({},j,e)))})}}29{E j={};2h.4t(d)&&$(d).25("["+4m+"]")&&($.13(j,67("({"+($(d).2A(4m)||"")+"})")),g=1N 3y(d,$.13({},j,e))),f.22(g)}3S;1I"7R":$.1c(d,D(a,b){E c=1N 3y(b,e);f.22(c)})}(!1h||1>1h)&&(1h=1),1h>f.1g&&(1h=f.1g),L.5S||L.33({x:0,y:0}),x.26(f,1h,{3Y:D(){x.1f(D(){})}})}};$.13(1M,{1n:D(){u.6r("1D"),x.1n()},1f:D(){A.1f.2g(A,t.1W(1x))},12:D(){x.12()},5D:D(a){x.5D(a)}});E B={1o:{7S:"9V 9W 9X 6E 9Y",3M:D(a){M $.7d(4r(a),C.7S.3N(" "))>-1},1e:D(a){M C.3M()?{4h:4r(a)}:!1}},1Y:{3M:D(a){E b=/(1Y\\.3h|7T\\.7U)\\/9Z\\?(?=.*5w?=([a-6e-6f-9-2h]+))(?:\\S+)?$/.4v(a);M b&&b[2]?b[2]:(b=/(1Y\\.3h|7T\\.7U)\\/(5w?\\/|u\\/|4I\\/)?([a-6e-6f-9-2h]+)(?:\\S+)?$/i.4v(a),b&&b[3]?b[3]:!1)},1e:D(a){E b=C.3M(a);M b?{3i:b}:!1}},2Q:{3M:D(a){E b=/(2Q\\.3h)\\/([a-6e-6f-9-2h]+)(?:\\S+)?$/i.4v(a);M b&&b[2]?b[2]:!1},1e:D(a){E b=C.3M(a);M b?{3i:b}:!1}}};Y.3z&&3>Y.3z&&($.1c(x,D(a,b){$.V(b)=="D"&&(x[a]=D(){M C})}),1M.1f=D(){D a(b){E c,d=$.V(b);R(d=="3R")c=b;29 R(d=="7R"&&b[0])c=a(b[0]);29 R(2h.4t(b)&&$(b).2A("3W"))E c=$(b).2A("3W");29 c=b.1p?b.1p:!1;M c}M D(b){E c=a(b);c&&(15.a0.3W=c)}}()),15.1M=1M,$(24).a1(D(){1M.1n()})})(1D)',62,622,'||||||||||||||||||||||||||||||||||||||this|function|var|fr|width|height|view|options|addClass|Frames|return|append|div|element|proxy|if||_frames|ui|type|thumbnails|thumbnail|Browser|Math||_position|hide|extend|dimensions|window|css|px||IE|caption|frame|each|side|data|show|length|position|null|effects|wrapper|left|content|initialize|image|url|max|_dimensions|cache|top|info|stop|next|arguments|bind|visible|get|add|fresco|jQuery|overlay|box|remove|previous|case|loading|enabled|_thumbnails|Fresco|new|resize|click|_vars|spacer|className|set|outside|ui_wrapper|call|Support|youtube|min||button|push|_timeouts|document|is|load||_boxDimensions|else|stopPropagation|build|close||clear|for|apply|_|mobileTouch|fit|margin|states|_sideWidth|_tracking|outerWidth|no|prototype|background|icon|updateVars|bubble|setPosition|bounds|sides|has|_loading|attr|_data|controls|slide|switch|Window|delegate|visibility|Bounds|viewport|inside|border|_visible|padder|box_wrapper|removeClass|vimeo|_page|deepExtendClone|originalEvent|target|preventDefault|indexOf|void|startObserving|queues||timeouts|frames|setXY|loop|onclick|_loaded||preloaded||ipp|easing|scripts|touch|pageX|pageY|skin|com|id|fadeTo|delay|find|queue|Fit|within|box_spacer|_next|_previous|getLayout|src|player|player_iframe|_thumbs|Loading|View|Android|swipe|hasClass|skins|defaultSkin|delete|setExpression|setSkin|setOpacity|_reset|_next_button|group|onload|detect|split|documentElement|body|parseInt|string|break|prepend|fadeOut|Keyboard|href|onClick|callback|overlapping|disable|_m|round|keyCode|setTimeout||clearTimeout|_handleTracking|getSurroundingIndexes|preload|_track|ui_padder|disabled|_loadTimer|showUI|startUITimer|_ui_timer|extension|slider|_mode|ceil|_url|_dgo|in|warn|deepExtend|getURIData|detectExtension|mousewheel|isElement|while|exec|WebKit|MobileSafari|IEMobile|right|touches|none|http|scrollTop|scrollLeft|offset|scroll|views|embed|enable|innerHeight|first|updateDimensions|_tracking_timer|_whileVisible|clearUITimer|box_padder|box_outer_border|ui_spacer|_previous_button|_border|vertical|320|568|afterLoad|_button||active|hideUI|Class|overlap||player_div|_count|track|page|moveTo|console|Overlay|Frame|Timeouts|States|Thumbnail|match|toLowerCase|parseFloat|Opera|opera|Chrome|required|available|abs|prevent|initialTypeOptions|boolean|touchEffects|keyboard|img|vi|create|draw|absolute|style|center|showhide|setDefaultSkin|object|param|closest|stopQueues|easeInSine|_hide|after|before|_s|easeOutSine|fetchOptions|getKeyByKeyCode|mousemove|once|_xyp|_pos|sync|removeTracking|_interval_load|spacers|padders|ui_outer_border|info_padder|span|_getInfoHeight|_fit|clearLoadTimer|padding|_states|eval|Cache|setActive|pages|_disabled|moveToPage|_afterLoad|zA|Z0|String|constructor|wheelDelta|detail|nodeType|parentNode|version|AppleWebKit|Gecko|navigator|pow|check|Za|notified|canvas|getContext|try|DocumentTouch|catch|test|unbind|Date|getTime|both|jpg|easeInOutSine|getScrollDimensions|substr|start|update|class|skinless|hideOverlapping|wmode|value|transparent|restoreOverlapping|onShow|_show|hideAll|afterHide|esc|onkeydown|onkeyup|uis|handleTracking|clearTrackingTimer|startTracking|stopTracking|clearLoads|afterPosition||preloadSurroundingImages|mayPrevious|mayNext|setVisible|isVisible|setHidden|grep|inArray|setXYP|setTracking|isTracking|clearLoad|outer|wrappers|ui_toggle|html|_spacing|horizontal|getDimensions|_max|mouseenter|mouseleave|hd|quality|bottom|_preShow|YT|iframe|webkitAllowFullScreen|mozallowfullscreen|allowFullScreen|frameborder|video|_postHide|timeout_|Image|previousPage|nextPage|floor|ie|resizing|loadCurrentPage|deactivate|activate|thumbnail_wrapper|thumbnail_medium|object_type|array|extensions|youtu|be|sfcc|fromCharCode|log|Object|replace|120|Event|trigger|isPropagationStopped|isDefaultPrevented|DOMMouseScroll|Array|slice|isAttached|RegExp|attachEvent|MSIE|KHTML|rv|Apple|Mobile|Safari|userAgent|Quad|Cubic|Quart|Quint|Expo|Sine|cos|PI|easeIn|easeOut|easeInOut|fn|jquery|z_|z0|requires|createElement|ontouchstart|instanceof|Win|Mac|Linux|platform|one|stopImmediatePropagation|touchend|touchmove|touchstart|1e3|IE6|base|reset|setOptions|toUpperCase|533|dela|oldIE|ltIE|mobile|currentTarget|select|name|hidden|restoreOverlappingWithinContent|fs|150|_pinchZoomed|innerWidth|keydown|keyup|orientationchange|pn|hideAllBut|clearTracking|_scrollbarWidth|scrollbarWidth|clearInterval|toggle|info_background|text|smart|spacing|720|hd1080|hd720|outerHeight|Tracking|setSize|relative|_style|setDimensions|Player|videoId|playerVars|events|onReady|setPlaybackQuality|www|destroy|easeInQuad|easeOutQuart|hideUIDelayed|lifetime|3e5|inject|thumbs|Page|500|100|adjustToViewport|animate|refresh|_dimension|state|thumbnail_image|getJSON|api|v2|json|number|filter|bmp|gif|jpeg|png|watch|location|ready'.split('|'),0,{}));

// Generated by CoffeeScript 1.3.3

/*

  Harvey, A Second Face for Your Application's JavaScript

  Copyright 2012, Joschka Kintscher
  Released under the MIT License

  https://github.com/harvesthq/harvey/
*/


(function() {
  var State, _mediaQueryList;

  this.Harvey = (function() {

    function Harvey() {}

    Harvey.states = {};

    /*
        Creates a new State object for the given media query using the passed hash
        of callbacks and stores it in @states. The passed hash may contain up to
        three callbacks. See documentation of the State class for more information.
    */


    Harvey.attach = function(mediaQuery, callbacks) {
      var state;
      if (!this.states.hasOwnProperty(mediaQuery)) {
        this.states[mediaQuery] = [];
        this._add_css_for(mediaQuery);
      }
      state = new State(mediaQuery, callbacks != null ? callbacks.setup : void 0, callbacks != null ? callbacks.on : void 0, callbacks != null ? callbacks.off : void 0);
      if (!this.states[mediaQuery].length) {
        this._watch_query(mediaQuery);
      }
      this.states[mediaQuery].push(state);
      if (this._window_matchmedia(mediaQuery).matches) {
        this._update_states([state], true);
      }
      return state;
    };

    /*
        Removes a given State object from the @states hash.

        @param  object  state  A valid state object
    */


    Harvey.detach = function(state) {
      var i, s, _i, _len, _ref, _results;
      _ref = this.states[state.condition];
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        s = _ref[i];
        if (state === s) {
          _results.push(this.states[s.condition][i] = void 0);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    /*
        Create a new matchMediaListener for the passed media query.

        @param  string  mediaQuery  A valid CSS media query to watch
    */


    Harvey._watch_query = function(mediaQuery) {
      var _this = this;
      return this._window_matchmedia(mediaQuery).addListener(function(mql) {
        return _this._update_states(_this.states[mediaQuery], mql.matches);
      });
    };

    /*
        Activates/Deactivates every State object in the passed list.

        @param  array   states  A list of State objects to update
        @param  boolean active Whether to activate or deactivate the given states
    */


    Harvey._update_states = function(states, active) {
      var state, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = states.length; _i < _len; _i++) {
        state = states[_i];
        if (active) {
          _results.push(state.activate());
        } else {
          _results.push(state.deactivate());
        }
      }
      return _results;
    };

    /*
        BEWARE: You're at the edge of the map, mate. Here there be monsters!

        ------------------------------------------------------------------------------------

        Private methods to fix and polyfill the matchMedia interface for several engines

        * Inspired by Nicholas C. Zakas' article on the different problems with matchMedia
          http://www.nczonline.net/blog/2012/01/19/css-media-queries-in-javascript-part-2/

        * Implementing a modified coffeescript version of Scott Jehl's and Paul Irish's matchMedia.js polyfill
          https://github.com/paulirish/matchMedia.js
    */


    /*
        [FIX] for Firefox/Gecko browsers that lose reference to the
              MediaQueryList object unless it's being stored for runtime.
    */


    Harvey._mediaList = {};

    /*
        @param  string  mediaQuery      A valid CSS media query to monitor for updates
        @Return object  MediaQueryList  Depending on the browser and matchMedia support either a native
                                        mediaQueryList object or an instance of _mediaQueryList
    */


    Harvey._window_matchmedia = function(mediaQuery) {
      if (window.matchMedia && 'addListener' in window.matchMedia('all')) {
        if (!(mediaQuery in this._mediaList)) {
          this._mediaList[mediaQuery] = window.matchMedia(mediaQuery);
        }
        return this._mediaList[mediaQuery];
      }
      /*
            [POLYFILL] for all browsers that don't support matchMedia() at all (CSS media query support
                       is still mandatory though).
      */

      if (!this._listening) {
        this._listen();
      }
      if (!(mediaQuery in this._mediaList)) {
        this._mediaList[mediaQuery] = new _mediaQueryList(mediaQuery);
      }
      return this._mediaList[mediaQuery];
    };

    /*
        Add resize and orientationChange event listeners to the window element
        to monitor updates to the viewport
    */


    Harvey._listen = function() {
      var evt,
        _this = this;
      evt = window.addEventListener || window.attachEvent;
      evt('resize', function() {
        var mediaList, mediaQuery, _ref, _results;
        _ref = _this._mediaList;
        _results = [];
        for (mediaQuery in _ref) {
          mediaList = _ref[mediaQuery];
          _results.push(mediaList._process());
        }
        return _results;
      });
      evt('orientationChange', function() {
        var mediaList, mediaQuery, _ref, _results;
        _ref = _this._mediaList;
        _results = [];
        for (mediaQuery in _ref) {
          mediaList = _ref[mediaQuery];
          _results.push(mediaList._process());
        }
        return _results;
      });
      return this._listening = true;
    };

    /*
        [FIX] for Webkit engines that only trigger the MediaQueryListListener
              when there is at least one CSS selector for the respective media query

        @param  string  MediaQuery  The media query to inject CSS for
    */


    Harvey._add_css_for = function(mediaQuery) {
      if (!this.style) {
        this.style = document.createElement('style');
        this.style.setAttribute('type', 'text/css');
        document.getElementsByTagName('head')[0].appendChild(this.style);
      }
      mediaQuery = "@media " + mediaQuery + " {.harvey-test{}}";
      if (!this.style.styleSheet) {
        return this.style.appendChild(document.createTextNode(mediaQuery));
      }
    };

    return Harvey;

  })();

  /*
    A State allows to execute a set of callbacks for the given valid CSS media query.

    Callbacks are executed in the context of their state object to allow access to the
    corresponding media query of the State.

    States are not exposed to the global namespace. They can be used by calling the
    static Harvey.attach() and Harvey.detach() methods.
  */


  State = (function() {

    State.prototype.active = false;

    State.prototype.is_setup = false;

    /*
        Creates a new State object

        @param  string    condition The media query to check for
        @param  function  setup     Called the first time `condition` becomes valid
        @param  function  on        Called every time `condition` becomes valid
        @param  function  off       Called every time `condition` becomes invalid
    */


    function State(condition, setup, on, off) {
      this.condition = condition;
      this.setup = setup;
      this.on = on;
      this.off = off;
    }

    /*
        Activate this State object if it is currently deactivated. Also perform all
        set up tasks if this is the first time the State is activated
    */


    State.prototype.activate = function() {
      if (this.active) {
        return;
      }
      if (!this.is_setup) {
        if (typeof this.setup === "function") {
          this.setup();
        }
        this.is_setup = true;
      }
      if (typeof this.on === "function") {
        this.on();
      }
      return this.active = true;
    };

    /*
        Deactive this State object if it is currently active
    */


    State.prototype.deactivate = function() {
      if (!this.active) {
        return;
      }
      if (typeof this.off === "function") {
        this.off();
      }
      return this.active = false;
    };

    return State;

  })();

  /*
    [FIX] simple implemenation of the matchMedia interface to mimic the native
          matchMedia interface behaviour to work as a polyfill for Harvey
  */


  _mediaQueryList = (function() {
    /*
        Creates a new _mediaQueryList object

        @param  string  media  A valid CSS media query
    */

    function _mediaQueryList(media) {
      this.media = media;
      this._listeners = [];
      this.matches = this._matches();
    }

    /*
        Add a new listener to this mediaQueryList that will be called every time
        the media query becomes valid
    */


    _mediaQueryList.prototype.addListener = function(listener) {
      this._listeners.push(listener);
      return void 0;
    };

    /*
        Evaluate the media query of this mediaQueryList object and notify
        all registered listeners if the state has changed
    */


    _mediaQueryList.prototype._process = function() {
      var callback, current, _i, _len, _ref, _results;
      current = this._matches();
      if (this.matches === current) {
        return;
      }
      this.matches = current;
      _ref = this._listeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback(this));
      }
      return _results;
    };

    /*
        Check whether the media query is currently valid
    */


    _mediaQueryList.prototype._matches = function() {
      if (!this._tester) {
        this._get_tester();
      }
      this._tester.innerHTML = '&shy;<style media="' + this.media + '">#harvey-mq-test{width:42px;}</style>';
      this._tester.removeChild(this._tester.firstChild);
      return this._tester.offsetWidth === 42;
    };

    /*
        Retrieve the element to test the media query on from the DOM or create
        it if it has not been injected into the page yet
    */


    _mediaQueryList.prototype._get_tester = function() {
      this._tester = document.getElementById('harvey-mq-test');
      if (!this._tester) {
        return this._build_tester();
      }
    };

    /*
        Create a new div with a unique id, move it outsite of the viewport and inject it into the DOM.
        This element will be used to check whether the registered media query is currently valid.
    */


    _mediaQueryList.prototype._build_tester = function() {
      this._tester = document.createElement('div');
      this._tester.id = 'harvey-mq-test';
      this._tester.style.cssText = 'position:absolute;top:-100em';
      return document.body.insertBefore(this._tester, document.body.firstChild);
    };

    return _mediaQueryList;

  })();

}).call(this);

// Create a jquery plugin that prints the given element.
jQuery.fn.print = function(){
// NOTE: We are trimming the jQuery collection down to the
// first element in the collection.
if (this.size() > 1){
this.eq( 0 ).print();
return;
} else if (!this.size()){
return;
}

// ASSERT: At this point, we know that the current jQuery
// collection (as defined by THIS), contains only one
// printable element.

// Create a random name for the print frame.
var strFrameName = ("printer-" + (new Date()).getTime());

// Create an iFrame with the new name.
var jFrame = $( "<iframe name='" + strFrameName + "'>" );

// Hide the frame (sort of) and attach to the body.
jFrame
.css( "width", "1px" )
.css( "height", "1px" )
.css( "position", "absolute" )
.css( "left", "-9999px" )
.appendTo( $( "body:first" ) )
;

// Get a FRAMES reference to the new frame.
var objFrame = window.frames[ strFrameName ];

// Get a reference to the DOM in the new frame.
var objDoc = objFrame.document;

// Grab all the style tags and copy to the new
// document so that we capture look and feel of
// the current document.

// Create a temp document DIV to hold the style tags.
// This is the only way I could find to get the style
// tags into IE.
var jStyleDiv = $( "<div>" ).append(
$( "style" ).clone()
);

// Write the HTML for the document. In this, we will
// write out the HTML of the current element.
objDoc.open();
objDoc.write( "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">" );
objDoc.write( "<html>" );
objDoc.write( "<body>" );
objDoc.write( "<head>" );
objDoc.write( "<title>" );
objDoc.write( document.title );
objDoc.write( "</title>" );
objDoc.write( jStyleDiv.html() );
objDoc.write( "</head>" );
objDoc.write( this.html() );
objDoc.write( "</body>" );
objDoc.write( "</html>" );
objDoc.close();

// Print the document.
objFrame.focus();
objFrame.print();

// Have the frame remove itself in about a minute so that
// we don't build up too many of these frames.
setTimeout(
function(){
jFrame.remove();
},
(60 * 1000)
);
}
/*!
 * jQuery corner plugin: simple corner rounding
 * Examples and documentation at: http://jquery.malsup.com/corner/
 * version 2.12 (23-MAY-2011)
 * Requires jQuery v1.3.2 or later
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Dave Methvin and Mike Alsup
 */

/**
 *  corner() takes a single string argument:  $('#myDiv').corner("effect corners width")
 *
 *  effect:  name of the effect to apply, such as round, bevel, notch, bite, etc (default is round).
 *  corners: one or more of: top, bottom, tr, tl, br, or bl.  (default is all corners)
 *  width:   width of the effect; in the case of rounded corners this is the radius.
 *           specify this value using the px suffix such as 10px (yes, it must be pixels).
 */
;(function($) {

var style = document.createElement('div').style,
    moz = style['MozBorderRadius'] !== undefined,
    webkit = style['WebkitBorderRadius'] !== undefined,
    radius = style['borderRadius'] !== undefined || style['BorderRadius'] !== undefined,
    mode = document.documentMode || 0,
    noBottomFold = typeof $.browser !== 'undefined' && $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8),

    expr = typeof $.browser !== 'undefined' && $.browser.msie && (function() {
        var div = document.createElement('div');
        try { div.style.setExpression('width','0+0'); div.style.removeExpression('width'); }
        catch(e) { return false; }
        return true;
    })();

$.support = $.support || {};
$.support.borderRadius = moz || webkit || radius; // so you can do:  if (!$.support.borderRadius) $('#myDiv').corner();

function sz(el, p) {
    return parseInt($.css(el,p))||0;
};
function hex2(s) {
    s = parseInt(s).toString(16);
    return ( s.length < 2 ) ? '0'+s : s;
};
function gpc(node) {
    while(node) {
        var v = $.css(node,'backgroundColor'), rgb;
        if (v && v != 'transparent' && v != 'rgba(0, 0, 0, 0)') {
            if (v.indexOf('rgb') >= 0) {
                rgb = v.match(/\d+/g);
                return '#'+ hex2(rgb[0]) + hex2(rgb[1]) + hex2(rgb[2]);
            }
            return v;
        }
        if (node.nodeName.toLowerCase() == 'html')
            break;
        node = node.parentNode; // keep walking if transparent
    }
    return '#ffffff';
};

function getWidth(fx, i, width) {
    switch(fx) {
    case 'round':  return Math.round(width*(1-Math.cos(Math.asin(i/width))));
    case 'cool':   return Math.round(width*(1+Math.cos(Math.asin(i/width))));
    case 'sharp':  return width-i;
    case 'bite':   return Math.round(width*(Math.cos(Math.asin((width-i-1)/width))));
    case 'slide':  return Math.round(width*(Math.atan2(i,width/i)));
    case 'jut':    return Math.round(width*(Math.atan2(width,(width-i-1))));
    case 'curl':   return Math.round(width*(Math.atan(i)));
    case 'tear':   return Math.round(width*(Math.cos(i)));
    case 'wicked': return Math.round(width*(Math.tan(i)));
    case 'long':   return Math.round(width*(Math.sqrt(i)));
    case 'sculpt': return Math.round(width*(Math.log((width-i-1),width)));
    case 'dogfold':
    case 'dog':    return (i&1) ? (i+1) : width;
    case 'dog2':   return (i&2) ? (i+1) : width;
    case 'dog3':   return (i&3) ? (i+1) : width;
    case 'fray':   return (i%2)*width;
    case 'notch':  return width;
    case 'bevelfold':
    case 'bevel':  return i+1;
    case 'steep':  return i/2 + 1;
    case 'invsteep':return (width-i)/2+1;
    }
};

$.fn.corner = function(options) {
    // in 1.3+ we can fix mistakes with the ready state
    if (this.length == 0) {
        if (!$.isReady && this.selector) {
            var s = this.selector, c = this.context;
            $(function() {
                $(s,c).corner(options);
            });
        }
        return this;
    }

    return this.each(function(index){
        var $this = $(this),
            // meta values override options
            o = [$this.attr($.fn.corner.defaults.metaAttr) || '', options || ''].join(' ').toLowerCase(),
            keep = /keep/.test(o),                       // keep borders?
            cc = ((o.match(/cc:(#[0-9a-f]+)/)||[])[1]),  // corner color
            sc = ((o.match(/sc:(#[0-9a-f]+)/)||[])[1]),  // strip color
            width = parseInt((o.match(/(\d+)px/)||[])[1]) || 10, // corner width
            re = /round|bevelfold|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dogfold|dog|invsteep|steep/,
            fx = ((o.match(re)||['round'])[0]),
            fold = /dogfold|bevelfold/.test(o),
            edges = { T:0, B:1 },
            opts = {
                TL:  /top|tl|left/.test(o),       TR:  /top|tr|right/.test(o),
                BL:  /bottom|bl|left/.test(o),    BR:  /bottom|br|right/.test(o)
            },
            // vars used in func later
            strip, pad, cssHeight, j, bot, d, ds, bw, i, w, e, c, common, $horz;

        if ( !opts.TL && !opts.TR && !opts.BL && !opts.BR )
            opts = { TL:1, TR:1, BL:1, BR:1 };

        // support native rounding
        if ($.fn.corner.defaults.useNative && fx == 'round' && (radius || moz || webkit) && !cc && !sc) {
            if (opts.TL)
                $this.css(radius ? 'border-top-left-radius' : moz ? '-moz-border-radius-topleft' : '-webkit-border-top-left-radius', width + 'px');
            if (opts.TR)
                $this.css(radius ? 'border-top-right-radius' : moz ? '-moz-border-radius-topright' : '-webkit-border-top-right-radius', width + 'px');
            if (opts.BL)
                $this.css(radius ? 'border-bottom-left-radius' : moz ? '-moz-border-radius-bottomleft' : '-webkit-border-bottom-left-radius', width + 'px');
            if (opts.BR)
                $this.css(radius ? 'border-bottom-right-radius' : moz ? '-moz-border-radius-bottomright' : '-webkit-border-bottom-right-radius', width + 'px');
            return;
        }

        strip = document.createElement('div');
        $(strip).css({
            overflow: 'hidden',
            height: '1px',
            minHeight: '1px',
            fontSize: '1px',
            backgroundColor: sc || 'transparent',
            borderStyle: 'solid'
        });

        pad = {
            T: parseInt($.css(this,'paddingTop'))||0,     R: parseInt($.css(this,'paddingRight'))||0,
            B: parseInt($.css(this,'paddingBottom'))||0,  L: parseInt($.css(this,'paddingLeft'))||0
        };

        if (typeof this.style.zoom != undefined) this.style.zoom = 1; // force 'hasLayout' in IE
        if (!keep) this.style.border = 'none';
        strip.style.borderColor = cc || gpc(this.parentNode);
        cssHeight = $(this).outerHeight();

        for (j in edges) {
            bot = edges[j];
            // only add stips if needed
            if ((bot && (opts.BL || opts.BR)) || (!bot && (opts.TL || opts.TR))) {
                strip.style.borderStyle = 'none '+(opts[j+'R']?'solid':'none')+' none '+(opts[j+'L']?'solid':'none');
                d = document.createElement('div');
                $(d).addClass('jquery-corner');
                ds = d.style;

                bot ? this.appendChild(d) : this.insertBefore(d, this.firstChild);

                if (bot && cssHeight != 'auto') {
                    if ($.css(this,'position') == 'static')
                        this.style.position = 'relative';
                    ds.position = 'absolute';
                    ds.bottom = ds.left = ds.padding = ds.margin = '0';
                    if (expr)
                        ds.setExpression('width', 'this.parentNode.offsetWidth');
                    else
                        ds.width = '100%';
                }
                else if (!bot && typeof $.browser !== undefined && $.browser.msie) {
                    if ($.css(this,'position') == 'static')
                        this.style.position = 'relative';
                    ds.position = 'absolute';
                    ds.top = ds.left = ds.right = ds.padding = ds.margin = '0';

                    // fix ie6 problem when blocked element has a border width
                    if (expr) {
                        bw = sz(this,'borderLeftWidth') + sz(this,'borderRightWidth');
                        ds.setExpression('width', 'this.parentNode.offsetWidth - '+bw+'+ "px"');
                    }
                    else
                        ds.width = '100%';
                }
                else {
                    ds.position = 'relative';
                    ds.margin = !bot ? '-'+pad.T+'px -'+pad.R+'px '+(pad.T-width)+'px -'+pad.L+'px' :
                                        (pad.B-width)+'px -'+pad.R+'px -'+pad.B+'px -'+pad.L+'px';
                }

                for (i=0; i < width; i++) {
                    w = Math.max(0,getWidth(fx,i, width));
                    e = strip.cloneNode(false);
                    e.style.borderWidth = '0 '+(opts[j+'R']?w:0)+'px 0 '+(opts[j+'L']?w:0)+'px';
                    bot ? d.appendChild(e) : d.insertBefore(e, d.firstChild);
                }

                if (fold && $.support.boxModel) {
                    if (bot && noBottomFold) continue;
                    for (c in opts) {
                        if (!opts[c]) continue;
                        if (bot && (c == 'TL' || c == 'TR')) continue;
                        if (!bot && (c == 'BL' || c == 'BR')) continue;

                        common = { position: 'absolute', border: 'none', margin: 0, padding: 0, overflow: 'hidden', backgroundColor: strip.style.borderColor };
                        $horz = $('<div/>').css(common).css({ width: width + 'px', height: '1px' });
                        switch(c) {
                        case 'TL': $horz.css({ bottom: 0, left: 0 }); break;
                        case 'TR': $horz.css({ bottom: 0, right: 0 }); break;
                        case 'BL': $horz.css({ top: 0, left: 0 }); break;
                        case 'BR': $horz.css({ top: 0, right: 0 }); break;
                        }
                        d.appendChild($horz[0]);

                        var $vert = $('<div/>').css(common).css({ top: 0, bottom: 0, width: '1px', height: width + 'px' });
                        switch(c) {
                        case 'TL': $vert.css({ left: width }); break;
                        case 'TR': $vert.css({ right: width }); break;
                        case 'BL': $vert.css({ left: width }); break;
                        case 'BR': $vert.css({ right: width }); break;
                        }
                        d.appendChild($vert[0]);
                    }
                }
            }
        }
    });
};

$.fn.uncorner = function() {
    if (radius || moz || webkit)
        this.css(radius ? 'border-radius' : moz ? '-moz-border-radius' : '-webkit-border-radius', 0);
    $('div.jquery-corner', this).remove();
    return this;
};

// expose options
$.fn.corner.defaults = {
    useNative: true, // true if plugin should attempt to use native browser support for border radius rounding
    metaAttr:  'data-corner' // name of meta attribute to use for options
};

})(jQuery);

;(function(d){d.flexslider=function(i,k){var a=d(i),c=d.extend({},d.flexslider.defaults,k),e=c.namespace,p="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,t=p?"touchend":"click",l="vertical"===c.direction,m=c.reverse,h=0<c.itemWidth,r="fade"===c.animation,s=""!==c.asNavFor,f={};d.data(i,"flexslider",a);f={init:function(){a.animating=!1;a.currentSlide=c.startAt;a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=c.selector.substr(0,
 c.selector.search(" "));a.slides=d(c.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(c.sync).length;"slide"===c.animation&&(c.animation="swing");a.prop=l?"top":"marginLeft";a.args={};a.manualPause=!1;var b=a,g;if(g=!c.video)if(g=!r)if(g=c.useCSS)a:{g=document.createElement("div");var n=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],e;for(e in n)if(void 0!==g.style[n[e]]){a.pfx=n[e].replace("Perspective","").toLowerCase();
 a.prop="-"+a.pfx+"-transform";g=!0;break a}g=!1}b.transitions=g;""!==c.controlsContainer&&(a.controlsContainer=0<d(c.controlsContainer).length&&d(c.controlsContainer));""!==c.manualControls&&(a.manualControls=0<d(c.manualControls).length&&d(c.manualControls));c.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();s&&f.asNav.setup();a.setup("init");c.controlNav&&f.controlNav.setup();c.directionNav&&f.directionNav.setup();c.keyboard&&
 (1===d(a.containerSelector).length||c.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;if(!a.animating&&(39===b||37===b))b=39===b?a.getTarget("next"):37===b?a.getTarget("prev"):!1,a.flexAnimate(b,c.pauseOnAction)});c.mousewheel&&a.bind("mousewheel",function(b,g){b.preventDefault();var d=0>g?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(d,c.pauseOnAction)});c.pausePlay&&f.pausePlay.setup();c.slideshow&&(c.pauseOnHover&&a.hover(function(){!a.manualPlay&&!a.manualPause&&a.pause()},
 function(){!a.manualPause&&!a.manualPlay&&a.play()}),0<c.initDelay?setTimeout(a.play,c.initDelay):a.play());p&&c.touch&&f.touch();(!r||r&&c.smoothHeight)&&d(window).bind("resize focus",f.resize);setTimeout(function(){c.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");a.slides.click(function(b){b.preventDefault();var b=d(this),g=b.index();
 !d(c.asNavFor).data("flexslider").animating&&!b.hasClass("active")&&(a.direction=a.currentItem<g?"next":"prev",a.flexAnimate(g,c.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var b=1,g;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===c.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var n=0;n<a.pagingCount;n++)g="thumbnails"===c.controlNav?
 '<img src="'+a.slides.eq(n).attr("data-thumb")+'"/>':"<a>"+b+"</a>",a.controlNavScaffold.append("<li>"+g+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):a.append(a.controlNavScaffold);f.controlNav.set();f.controlNav.active();a.controlNavScaffold.delegate("a, img",t,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(a.direction=g>a.currentSlide?"next":"prev",a.flexAnimate(g,c.pauseOnAction))});p&&a.controlNavScaffold.delegate("a",
 "click touchstart",function(a){a.preventDefault()})},setupManual:function(){a.controlNav=a.manualControls;f.controlNav.active();a.controlNav.live(t,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(g>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(g,c.pauseOnAction))});p&&a.controlNav.live("click touchstart",function(a){a.preventDefault()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===c.controlNav?"img":"a"),
 a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,c){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(c).closest("li").remove();f.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(c,b):f.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+
 e+'direction-nav"><li><a class="'+e+'prev" href="#">'+c.prevText+'</a></li><li><a class="'+e+'next" href="#">'+c.nextText+"</a></li></ul>");a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));f.directionNav.update();a.directionNav.bind(t,function(b){b.preventDefault();b=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,c.pauseOnAction)});
 p&&a.directionNav.bind("click touchstart",function(a){a.preventDefault()})},update:function(){var b=e+"disabled";1===a.pagingCount?a.directionNav.addClass(b):c.animationLoop?a.directionNav.removeClass(b):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b):a.directionNav.removeClass(b)}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
 (a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));f.pausePlay.update(c.slideshow?e+"pause":e+"play");a.pausePlay.bind(t,function(b){b.preventDefault();d(this).hasClass(e+"pause")?(a.manualPause=!0,a.manualPlay=!1,a.pause()):(a.manualPause=!1,a.manualPlay=!0,a.play())});p&&a.pausePlay.bind("click touchstart",function(a){a.preventDefault()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+"pause").addClass(e+
 "play").text(c.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").text(c.pauseText)}},touch:function(){function b(b){j=l?d-b.touches[0].pageY:d-b.touches[0].pageX;p=l?Math.abs(j)<Math.abs(b.touches[0].pageX-e):Math.abs(j)<Math.abs(b.touches[0].pageY-e);if(!p||500<Number(new Date)-k)b.preventDefault(),!r&&a.transitions&&(c.animationLoop||(j/=0===a.currentSlide&&0>j||a.currentSlide===a.last&&0<j?Math.abs(j)/q+2:1),a.setProps(f+j,"setTouch"))}function g(){i.removeEventListener("touchmove",
 b,!1);if(a.animatingTo===a.currentSlide&&!p&&null!==j){var h=m?-j:j,l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-k&&50<Math.abs(h)||Math.abs(h)>q/2)?a.flexAnimate(l,c.pauseOnAction):r||a.flexAnimate(a.currentSlide,c.pauseOnAction,!0)}i.removeEventListener("touchend",g,!1);f=j=e=d=null}var d,e,f,q,j,k,p=!1;i.addEventListener("touchstart",function(j){a.animating?j.preventDefault():1===j.touches.length&&(a.pause(),q=l?a.h:a.w,k=Number(new Date),f=h&&m&&a.animatingTo===
 a.last?0:h&&m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+c.itemMargin)*a.move*a.currentSlide:m?(a.last-a.currentSlide+a.cloneOffset)*q:(a.currentSlide+a.cloneOffset)*q,d=l?j.touches[0].pageY:j.touches[0].pageX,e=l?j.touches[0].pageX:j.touches[0].pageY,i.addEventListener("touchmove",b,!1),i.addEventListener("touchend",g,!1))},!1)},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),r?f.smoothHeight():h?(a.slides.width(a.computedW),
 a.update(a.pagingCount),a.setProps()):l?(a.viewport.height(a.h),a.setProps(a.h,"setTotal")):(c.smoothHeight&&f.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!l||r){var c=r?a:a.viewport;b?c.animate({height:a.slides.eq(a.animatingTo).height()},b):c.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var g=d(c.sync).data("flexslider"),e=a.animatingTo;switch(b){case "animate":g.flexAnimate(e,c.pauseOnAction,!1,!0);break;case "play":!g.playing&&
 !g.asNav&&g.play();break;case "pause":g.pause()}}};a.flexAnimate=function(b,g,n,i,k){s&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,k)||n)&&a.is(":visible")){if(s&&i)if(n=d(c.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,n.flexAnimate(b,!0,!1,!0,k),a.direction=a.currentItem<b?"next":"prev",n.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+
 "active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;c.before(a);g&&a.pause();a.syncExists&&!k&&f.sync("animate");c.controlNav&&f.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;c.directionNav&&f.directionNav.update();b===a.last&&(c.end(a),c.animationLoop||a.pause());if(r)p?(a.slides.eq(a.currentSlide).css({opacity:0}),
 a.slides.eq(b).css({opacity:1}),a.animating=!1,a.currentSlide=a.animatingTo):(a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed,c.easing),a.slides.eq(b).fadeIn(c.animationSpeed,c.easing,a.wrapup));else{var q=l?a.slides.filter(":first").height():a.computedW;h?(b=c.itemWidth>a.w?2*c.itemMargin:c.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&c.animationLoop&&"next"!==a.direction?m?(a.count+a.cloneOffset)*q:0:a.currentSlide===
 a.last&&0===b&&c.animationLoop&&"prev"!==a.direction?m?0:(a.count+1)*q:m?(a.count-1-b+a.cloneOffset)*q:(b+a.cloneOffset)*q;a.setProps(b,"",c.animationSpeed);if(a.transitions){if(!c.animationLoop||!a.atEnd)a.animating=!1,a.currentSlide=a.animatingTo;a.container.unbind("webkitTransitionEnd transitionend");a.container.bind("webkitTransitionEnd transitionend",function(){a.wrapup(q)})}else a.container.animate(a.args,c.animationSpeed,c.easing,function(){a.wrapup(q)})}c.smoothHeight&&f.smoothHeight(c.animationSpeed)}};
 a.wrapup=function(b){!r&&!h&&(0===a.currentSlide&&a.animatingTo===a.last&&c.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===a.last&&(0===a.animatingTo&&c.animationLoop)&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;c.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=function(){clearInterval(a.animatedSlides);a.playing=!1;c.pausePlay&&f.pausePlay.update("play");a.syncExists&&f.sync("pause")};a.play=function(){a.animatedSlides=
 setInterval(a.animateSlides,c.slideshowSpeed);a.playing=!0;c.pausePlay&&f.pausePlay.update("pause");a.syncExists&&f.sync("play")};a.canAdvance=function(b,g){var d=s?a.pagingCount-1:a.last;return g?!0:s&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:s&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b===a.currentSlide&&!s?!1:c.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===d&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===d&&0===b&&"next"===a.direction?!1:!0};a.getTarget=
 function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-1};a.setProps=function(b,g,d){var e,f=b?b:(a.itemW+c.itemMargin)*a.move*a.animatingTo;e=-1*function(){if(h)return"setTouch"===g?b:m&&a.animatingTo===a.last?0:m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:f;switch(g){case "setTotal":return m?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;
 case "jumpEnd":return m?b:a.count*b;case "jumpStart":return m?a.count*b:b;default:return b}}()+"px";a.transitions&&(e=l?"translate3d(0,"+e+",0)":"translate3d("+e+",0,0)",d=void 0!==d?d/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",d));a.args[a.prop]=e;(a.transitions||void 0===d)&&a.container.css(a.args)};a.setup=function(b){if(r)a.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&(p?a.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+
 c.animationSpeed/1E3+"s ease"}).eq(a.currentSlide).css({opacity:1}):a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed,c.easing)),c.smoothHeight&&f.smoothHeight();else{var g,n;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=0,m&&(n=d.makeArray(a.slides).reverse(),a.slides=d(n),a.container.empty().append(a.slides)));c.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==
 b&&a.container.find(".clone").remove(),a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));a.newSlides=d(c.selector,a);g=m?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;l&&!h?(a.container.height(200*(a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(g*a.h,"init")},"init"===b?100:0)):(a.container.width(200*
 (a.count+a.cloneCount)+"%"),a.setProps(g*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,"float":"left",display:"block"});c.smoothHeight&&f.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+"active-slide")};a.doMath=function(){var b=a.slides.first(),d=c.itemMargin,e=c.minItems,f=c.maxItems;a.w=a.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=c.itemWidth+d,a.minW=e?e*a.itemT:a.w,
 a.maxW=f?f*a.itemT:a.w,a.itemW=a.minW>a.w?(a.w-d*e)/e:a.maxW<a.w?(a.w-d*f)/f:c.itemWidth>a.w?a.w:c.itemWidth,a.visible=Math.floor(a.w/(a.itemW+d)),a.move=0<c.move&&c.move<a.visible?c.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===a.pagingCount?0:c.itemWidth>a.w?(a.itemW+2*d)*a.count-a.w-d:(a.itemW+d)*a.count-a.w-d):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<
 a.currentSlide?a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(c.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)f.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>a.last&&(a.currentSlide-=1,a.animatingTo-=1),f.controlNav.update("remove",a.last);c.directionNav&&f.directionNav.update()};a.addSlide=function(b,e){var f=d(b);a.count+=1;a.last=a.count-1;l&&m?void 0!==
 e?a.slides.eq(a.count-e).after(f):a.container.prepend(f):void 0!==e?a.slides.eq(e).before(f):a.container.append(f);a.update(e,"add");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.added(a)};a.removeSlide=function(b){var e=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,a.slides).remove():l&&m?a.slides.eq(a.last).remove():a.slides.eq(b).remove();a.doMath();a.update(e,"remove");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.removed(a)};f.init()};d.flexslider.defaults=
 {namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,pauseOnAction:!0,pauseOnHover:!1,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",
 itemWidth:0,itemMargin:0,minItems:0,maxItems:0,move:0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};d.fn.flexslider=function(i){void 0===i&&(i={});if("object"===typeof i)return this.each(function(){var a=d(this),c=a.find(i.selector?i.selector:".slides > li");1===c.length?(c.fadeIn(400),i.start&&i.start(a)):void 0===a.data("flexslider")&&new d.flexslider(this,i)});var k=d(this).data("flexslider");switch(i){case "play":k.play();break;
 case "pause":k.pause();break;case "next":k.flexAnimate(k.getTarget("next"),!0);break;case "prev":case "previous":k.flexAnimate(k.getTarget("prev"),!0);break;default:"number"===typeof i&&k.flexAnimate(i,!0)}}})(jQuery);
(function($) {
  $.uniform = {
    options: {
      selectClass:   'selector',
      radioClass: 'radio',
      checkboxClass: 'checker',
      fileClass: 'uploader',
      filenameClass: 'filename',
      fileBtnClass: 'action',
      fileDefaultText: 'No file selected',
      fileBtnText: 'Choose File',
      checkedClass: 'checked',
      focusClass: 'focus',
      disabledClass: 'disabled',
      buttonClass: 'button',
      activeClass: 'active',
      hoverClass: 'hover',
      useID: true,
      idPrefix: 'uniform',
      resetSelector: false,
      autoHide: true
    },
    elements: []
  };

  if(typeof $.browser !== 'undefined' && $.browser.msie && $.browser.version < 7){
    $.support.selectOpacity = false;
  }else{
    $.support.selectOpacity = true;
  }

  $.fn.uniform = function(options) {

    options = $.extend($.uniform.options, options);

    var el = this;
    //code for specifying a reset button
    if(options.resetSelector != false){
      $(options.resetSelector).mouseup(function(){
        function resetThis(){
          $.uniform.update(el);
        }
        setTimeout(resetThis, 10);
      });
    }

    function doInput(elem){
      $el = $(elem);
      $el.addClass($el.attr("type"));
      storeElement(elem);
    }

    function doTextarea(elem){
      $(elem).addClass("uniform");
      storeElement(elem);
    }

    function doButton(elem){
      var $el = $(elem);

      var divTag = $("<div>"),
          spanTag = $("<span>");

      divTag.addClass(options.buttonClass);

      if(options.useID && $el.attr("id") != "") divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));

      var btnText;

      if($el.is("a") || $el.is("button")){
        btnText = $el.text();
      }else if($el.is(":submit") || $el.is(":reset") || $el.is("input[type=button]")){
        btnText = $el.attr("value");
      }

      btnText = btnText == "" ? $el.is(":reset") ? "Reset" : "Submit" : btnText;

      spanTag.html(btnText);

      $el.css("opacity", 0);
      $el.wrap(divTag);
      $el.wrap(spanTag);

      //redefine variables
      divTag = $el.closest("div");
      spanTag = $el.closest("span");

      if($el.is(":disabled")) divTag.addClass(options.disabledClass);

      divTag.bind({
        "mouseenter.uniform": function(){
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function(){
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        },
        "mousedown.uniform touchbegin.uniform": function(){
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function(){
          divTag.removeClass(options.activeClass);
        },
        "click.uniform touchend.uniform": function(e){
          if($(e.target).is("span") || $(e.target).is("div")){
            if(elem[0].dispatchEvent){
              var ev = document.createEvent('MouseEvents');
              ev.initEvent( 'click', true, true );
              elem[0].dispatchEvent(ev);
            }else{
              elem[0].click();
            }
          }
        }
      });

      elem.bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        }
      });

      $.uniform.noSelect(divTag);
      storeElement(elem);

    }

    function doSelect(elem){
      var $el = $(elem);

      var divTag = $('<div />'),
          spanTag = $('<span />');

      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.selectClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      var selected = elem.find(":selected:first");
      if(selected.length == 0){
        selected = elem.find("option:first");
      }
      spanTag.html(selected.html());

      elem.css('opacity', 0);
      elem.wrap(divTag);
      elem.before(spanTag);

      //redefine variables
      divTag = elem.parent("div");
      spanTag = elem.siblings("span");

      elem.bind({
        "change.uniform": function() {
          spanTag.text(elem.find(":selected").html());
          divTag.removeClass(options.activeClass);
        },
        "focus.uniform": function() {
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function() {
          divTag.removeClass(options.focusClass);
          divTag.removeClass(options.activeClass);
        },
        "mousedown.uniform touchbegin.uniform": function() {
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "click.uniform touchend.uniform": function(){
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        },
        "keyup.uniform": function(){
          spanTag.text(elem.find(":selected").html());
        }
      });

      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }
      $.uniform.noSelect(spanTag);

      storeElement(elem);

    }

    function doCheckbox(elem){
      var $el = $(elem);

      var divTag = $('<div />'),
          spanTag = $('<span />');

      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.checkboxClass);

      //assign the id of the element
      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      //wrap with the proper elements
      $(elem).wrap(divTag);
      $(elem).wrap(spanTag);

      //redefine variables
      spanTag = elem.parent();
      divTag = spanTag.parent();

      //hide normal input and add focus classes
      $(elem)
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span.
            spanTag.addClass(options.checkedClass);
          }
        },
        "mousedown.uniform touchbegin.uniform": function() {
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      //handle defaults
      if($(elem).attr("checked")){
        //box is checked by default, check our box
        spanTag.addClass(options.checkedClass);
      }

      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      storeElement(elem);
    }

    function doRadio(elem){
      var $el = $(elem);

      var divTag = $('<div />'),
          spanTag = $('<span />');

      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.radioClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      //wrap with the proper elements
      $(elem).wrap(divTag);
      $(elem).wrap(spanTag);

      //redefine variables
      spanTag = elem.parent();
      divTag = spanTag.parent();

      //hide normal input and add focus classes
      $(elem)
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span
            var classes = options.radioClass.split(" ")[0];
            $("." + classes + " span." + options.checkedClass + ":has([name='" + $(elem).attr('name') + "'])").removeClass(options.checkedClass);
            spanTag.addClass(options.checkedClass);
          }
        },
        "mousedown.uniform touchend.uniform": function() {
          if(!$(elem).is(":disabled")){
            divTag.addClass(options.activeClass);
          }
        },
        "mouseup.uniform touchbegin.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform touchend.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      //handle defaults
      if($(elem).attr("checked")){
        //box is checked by default, check span
        spanTag.addClass(options.checkedClass);
      }
      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      storeElement(elem);

    }

    function doFile(elem){
      //sanitize input
      var $el = $(elem);

      var divTag = $('<div />'),
          filenameTag = $('<span>'+options.fileDefaultText+'</span>'),
          btnTag = $('<span>'+options.fileBtnText+'</span>');

      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.fileClass);
      filenameTag.addClass(options.filenameClass);
      btnTag.addClass(options.fileBtnClass);

      if(options.useID && $el.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));
      }

      //wrap with the proper elements
      $el.wrap(divTag);
      $el.after(btnTag);
      $el.after(filenameTag);

      //redefine variables
      divTag = $el.closest("div");
      filenameTag = $el.siblings("."+options.filenameClass);
      btnTag = $el.siblings("."+options.fileBtnClass);

      //set the size
      if(!$el.attr("size")){
        var divWidth = divTag.width();
        //$el.css("width", divWidth);
        $el.attr("size", divWidth/10);
      }

      //actions
      var setFilename = function()
      {
        var filename = $el.val();
        if (filename === '')
        {
          filename = options.fileDefaultText;
        }
        else
        {
          filename = filename.split(/[\/\\]+/);
          filename = filename[(filename.length-1)];
        }
        filenameTag.text(filename);
      };

      // Account for input saved across refreshes
      setFilename();

      $el
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "mousedown.uniform": function() {
          if(!$(elem).is(":disabled")){
            divTag.addClass(options.activeClass);
          }
        },
        "mouseup.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      // IE7 doesn't fire onChange until blur or second fire.
      if ($.browser.msie){
        // IE considers browser chrome blocking I/O, so it
        // suspends tiemouts until after the file has been selected.
        $el.bind('click.uniform.ie7', function() {
          setTimeout(setFilename, 0);
        });
      }else{
        // All other browsers behave properly
        $el.bind('change.uniform', setFilename);
      }

      //handle defaults
      if($el.attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      $.uniform.noSelect(filenameTag);
      $.uniform.noSelect(btnTag);

      storeElement(elem);

    }

    $.uniform.restore = function(elem){
      if(elem == undefined){
        elem = $($.uniform.elements);
      }

      $(elem).each(function(){
        if($(this).is(":checkbox")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }else if($(this).is("select")){
          //remove sibling span
          $(this).siblings("span").remove();
          //unwrap parent div
          $(this).unwrap();
        }else if($(this).is(":radio")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }else if($(this).is(":file")){
          //remove sibling spans
          $(this).siblings("span").remove();
          //unwrap parent div
          $(this).unwrap();
        }else if($(this).is("button, :submit, :reset, a, input[type='button']")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }

        //unbind events
        $(this).unbind(".uniform");

        //reset inline style
        $(this).css("opacity", "1");

        //remove item from list of uniformed elements
        var index = $.inArray($(elem), $.uniform.elements);
        $.uniform.elements.splice(index, 1);
      });
    };

    function storeElement(elem){
      //store this element in our global array
      elem = $(elem).get();
      if(elem.length > 1){
        $.each(elem, function(i, val){
          $.uniform.elements.push(val);
        });
      }else{
        $.uniform.elements.push(elem);
      }
    }

    //noSelect v1.0
    $.uniform.noSelect = function(elem) {
      function f() {
       return false;
      };
      $(elem).each(function() {
       this.onselectstart = this.ondragstart = f; // Webkit & IE
       $(this)
        .mousedown(f) // Webkit & Opera
        .css({ MozUserSelect: 'none' }); // Firefox
      });
     };

    $.uniform.update = function(elem){
      if(elem == undefined){
        elem = $($.uniform.elements);
      }
      //sanitize input
      elem = $(elem);

      elem.each(function(){
        //do to each item in the selector
        //function to reset all classes
        var $e = $(this);

        if($e.is("select")){
          //element is a select
          var spanTag = $e.siblings("span");
          var divTag = $e.parent("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          //reset current selected text
          spanTag.html($e.find(":selected").html());

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }else if($e.is(":checkbox")){
          //element is a checkbox
          var spanTag = $e.closest("span");
          var divTag = $e.closest("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          spanTag.removeClass(options.checkedClass);

          if($e.is(":checked")){
            spanTag.addClass(options.checkedClass);
          }
          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }else if($e.is(":radio")){
          //element is a radio
          var spanTag = $e.closest("span");
          var divTag = $e.closest("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          spanTag.removeClass(options.checkedClass);

          if($e.is(":checked")){
            spanTag.addClass(options.checkedClass);
          }

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
        }else if($e.is(":file")){
          var divTag = $e.parent("div");
          var filenameTag = $e.siblings(options.filenameClass);
          btnTag = $e.siblings(options.fileBtnClass);

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          filenameTag.text($e.val());

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
        }else if($e.is(":submit") || $e.is(":reset") || $e.is("button") || $e.is("a") || elem.is("input[type=button]")){
          var divTag = $e.closest("div");
          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }

      });
    };

    return this.each(function() {
      if($.support.selectOpacity){
        var elem = $(this);

        if(elem.is("select")){
          //element is a select
          if(elem.attr("multiple") != true){
            //element is not a multi-select
            if(elem.attr("size") == undefined || elem.attr("size") <= 1){
              doSelect(elem);
            }
          }
        }else if(elem.is(":checkbox")){
          //element is a checkbox
          doCheckbox(elem);
        }else if(elem.is(":radio")){
          //element is a radio
          doRadio(elem);
        }else if(elem.is(":file")){
          //element is a file upload
          doFile(elem);
        }else if(elem.is(":text, :password, input[type='email']")){
          doInput(elem);
        }else if(elem.is("textarea")){
          doTextarea(elem);
        }else if(elem.is("a") || elem.is(":submit") || elem.is(":reset") || elem.is("button") || elem.is("input[type=button]")){
          doButton(elem);
        }

      }
    });
  };
})(jQuery);

;window.Modernizr=function(e,t,n){function C(e){f.cssText=e}function k(e,t){return C(prefixes.join(e+";")+(t||""))}function L(e,t){return typeof e===t}function A(e,t){return!!~(""+e).indexOf(t)}function O(e,t){for(var r in e){var i=e[r];if(!A(i,"-")&&f[i]!==n)return t=="pfx"?i:!0}return!1}function M(e,t,r){for(var i in e){var s=t[e[i]];if(s!==n)return r===!1?e[i]:L(s,"function")?s.bind(r||t):s}return!1}function _(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+p.join(r+" ")+r).split(" ");return L(t,"string")||L(t,"undefined")?O(i,t):(i=(e+" "+d.join(r+" ")+r).split(" "),M(i,t,n))}var r="2.8.3",i={},s=!0,o=t.documentElement,u="modernizr",a=t.createElement(u),f=a.style,l,c={}.toString,h="Webkit Moz O ms",p=h.split(" "),d=h.toLowerCase().split(" "),v={svg:"http://www.w3.org/2000/svg"},m={},g={},y={},b=[],w=b.slice,E,S=function(e,n,r,i){var s,a,f,l,c=t.createElement("div"),h=t.body,p=h||t.createElement("body");if(parseInt(r,10))while(r--)f=t.createElement("div"),f.id=i?i[r]:u+(r+1),c.appendChild(f);return s=["&#173;",'<style id="s',u,'">',e,"</style>"].join(""),c.id=u,(h?c:p).innerHTML+=s,p.appendChild(c),h||(p.style.background="",p.style.overflow="hidden",l=o.style.overflow,o.style.overflow="hidden",o.appendChild(p)),a=n(c,e),h?c.parentNode.removeChild(c):(p.parentNode.removeChild(p),o.style.overflow=l),!!a},x=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var r;return S("@media "+t+" { #"+u+" { position: absolute; } }",function(t){r=(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle)["position"]=="absolute"}),r},T={}.hasOwnProperty,N;!L(T,"undefined")&&!L(T.call,"undefined")?N=function(e,t){return T.call(e,t)}:N=function(e,t){return t in e&&L(e.constructor.prototype[t],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(t){var n=this;if(typeof n!="function")throw new TypeError;var r=w.call(arguments,1),i=function(){if(this instanceof i){var e=function(){};e.prototype=n.prototype;var s=new e,o=n.apply(s,r.concat(w.call(arguments)));return Object(o)===o?o:s}return n.apply(t,r.concat(w.call(arguments)))};return i}),m.rgba=function(){return C("background-color:rgba(150,255,150,.5)"),A(f.backgroundColor,"rgba")},m.csscolumns=function(){return _("columnCount")},m.video=function(){var e=t.createElement("video"),n=!1;try{if(n=!!e.canPlayType)n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(r){}return n},m.svg=function(){return!!t.createElementNS&&!!t.createElementNS(v.svg,"svg").createSVGRect};for(var D in m)N(m,D)&&(E=D.toLowerCase(),i[E]=m[D](),b.push((i[E]?"":"no-")+E));return i.addTest=function(e,t){if(typeof e=="object")for(var r in e)N(e,r)&&i.addTest(r,e[r]);else{e=e.toLowerCase();if(i[e]!==n)return i;t=typeof t=="function"?t():t,typeof s!="undefined"&&s&&(o.className+=" "+(t?"":"no-")+e),i[e]=t}return i},C(""),a=l=null,function(e,t){function c(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function h(){var e=y.elements;return typeof e=="string"?e.split(" "):e}function p(e){var t=f[e[u]];return t||(t={},a++,e[u]=a,f[a]=t),t}function d(e,n,r){n||(n=t);if(l)return n.createElement(e);r||(r=p(n));var o;return r.cache[e]?o=r.cache[e].cloneNode():s.test(e)?o=(r.cache[e]=r.createElem(e)).cloneNode():o=r.createElem(e),o.canHaveChildren&&!i.test(e)&&!o.tagUrn?r.frag.appendChild(o):o}function v(e,n){e||(e=t);if(l)return e.createDocumentFragment();n=n||p(e);var r=n.frag.cloneNode(),i=0,s=h(),o=s.length;for(;i<o;i++)r.createElement(s[i]);return r}function m(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?d(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+h().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function g(e){e||(e=t);var n=p(e);return y.shivCSS&&!o&&!n.hasCSS&&(n.hasCSS=!!c(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),l||m(e,n),e}var n="3.7.0",r=e.html5||{},i=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,s=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,o,u="_html5shiv",a=0,f={},l;(function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",o="hidden"in e,l=e.childNodes.length==1||function(){t.createElement("a");var e=t.createDocumentFragment();return typeof e.cloneNode=="undefined"||typeof e.createDocumentFragment=="undefined"||typeof e.createElement=="undefined"}()}catch(n){o=!0,l=!0}})();var y={elements:r.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:n,shivCSS:r.shivCSS!==!1,supportsUnknownElements:l,shivMethods:r.shivMethods!==!1,type:"default",shivDocument:g,createElement:d,createDocumentFragment:v};e.html5=y,g(t)}(this,t),i._version=r,i._domPrefixes=d,i._cssomPrefixes=p,i.mq=x,i.testProp=function(e){return O([e])},i.testAllProps=_,i.testStyles=S,o.className=o.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(s?" js "+b.join(" "):""),i}(this,this.document),function(e,t,n){function r(e){return"[object Function]"==d.call(e)}function i(e){return"string"==typeof e}function s(){}function o(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function u(){var e=v.shift();m=1,e?e.t?h(function(){("c"==e.t?k.injectCss:k.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),u()):m=0}function a(e,n,r,i,s,a,f){function l(t){if(!d&&o(c.readyState)&&(w.r=d=1,!m&&u(),c.onload=c.onreadystatechange=null,t)){"img"!=e&&h(function(){b.removeChild(c)},50);for(var r in T[n])T[n].hasOwnProperty(r)&&T[n][r].onload()}}var f=f||k.errorTimeout,c=t.createElement(e),d=0,g=0,w={t:r,s:n,e:s,a:a,x:f};1===T[n]&&(g=1,T[n]=[]),"object"==e?c.data=n:(c.src=n,c.type=e),c.width=c.height="0",c.onerror=c.onload=c.onreadystatechange=function(){l.call(this,g)},v.splice(i,0,w),"img"!=e&&(g||2===T[n]?(b.insertBefore(c,y?null:p),h(l,f)):T[n].push(c))}function f(e,t,n,r,s){return m=0,t=t||"j",i(e)?a("c"==t?E:w,e,t,this.i++,n,r,s):(v.splice(this.i++,0,e),1==v.length&&u()),this}function l(){var e=k;return e.loader={load:f,i:0},e}var c=t.documentElement,h=e.setTimeout,p=t.getElementsByTagName("script")[0],d={}.toString,v=[],m=0,g="MozAppearance"in c.style,y=g&&!!t.createRange().compareNode,b=y?c:p.parentNode,c=e.opera&&"[object Opera]"==d.call(e.opera),c=!!t.attachEvent&&!c,w=g?"object":c?"script":"img",E=c?"script":w,S=Array.isArray||function(e){return"[object Array]"==d.call(e)},x=[],T={},N={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}},C,k;k=function(e){function t(e){var e=e.split("!"),t=x.length,n=e.pop(),r=e.length,n={url:n,origUrl:n,prefixes:e},i,s,o;for(s=0;s<r;s++)o=e[s].split("="),(i=N[o.shift()])&&(n=i(n,o));for(s=0;s<t;s++)n=x[s](n);return n}function o(e,i,s,o,u){var a=t(e),f=a.autoCallback;a.url.split(".").pop().split("?").shift(),a.bypass||(i&&(i=r(i)?i:i[e]||i[o]||i[e.split("/").pop().split("?")[0]]),a.instead?a.instead(e,i,s,o,u):(T[a.url]?a.noexec=!0:T[a.url]=1,s.load(a.url,a.forceCSS||!a.forceJS&&"css"==a.url.split(".").pop().split("?").shift()?"c":n,a.noexec,a.attrs,a.timeout),(r(i)||r(f))&&s.load(function(){l(),i&&i(a.origUrl,u,o),f&&f(a.origUrl,u,o),T[a.url]=2})))}function u(e,t){function n(e,n){if(e){if(i(e))n||(f=function(){var e=[].slice.call(arguments);l.apply(this,e),c()}),o(e,f,t,0,u);else if(Object(e)===e)for(p in h=function(){var t=0,n;for(n in e)e.hasOwnProperty(n)&&t++;return t}(),e)e.hasOwnProperty(p)&&(!n&&!--h&&(r(f)?f=function(){var e=[].slice.call(arguments);l.apply(this,e),c()}:f[p]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),c()}}(l[p])),o(e[p],f,t,p,u))}else!n&&c()}var u=!!e.test,a=e.load||e.both,f=e.callback||s,l=f,c=e.complete||s,h,p;n(u?e.yep:e.nope,!!a),a&&n(a)}var a,f,c=this.yepnope.loader;if(i(e))o(e,0,c,0);else if(S(e))for(a=0;a<e.length;a++)f=e[a],i(f)?o(f,0,c,0):S(f)?k(f):Object(f)===f&&u(f,c);else Object(e)===e&&u(e,c)},k.addPrefix=function(e,t){N[e]=t},k.addFilter=function(e){x.push(e)},k.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",C=function(){t.removeEventListener("DOMContentLoaded",C,0),t.readyState="complete"},0)),e.yepnope=l(),e.yepnope.executeStack=u,e.yepnope.injectJs=function(e,n,r,i,a,f){var l=t.createElement("script"),c,d,i=i||k.errorTimeout;l.src=e;for(d in r)l.setAttribute(d,r[d]);n=f?u:n||s,l.onreadystatechange=l.onload=function(){!c&&o(l.readyState)&&(c=1,n(),l.onload=l.onreadystatechange=null)},h(function(){c||(c=1,n(1))},i),a?l.onload():p.parentNode.insertBefore(l,p)},e.yepnope.injectCss=function(e,n,r,i,o,a){var i=t.createElement("link"),f,n=a?u:n||s;i.href=e,i.rel="stylesheet",i.type="text/css";for(f in r)i.setAttribute(f,r[f]);o||(p.parentNode.insertBefore(i,p),h(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
// Smart Resize
;(function($,sr){
	'use strict';
	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;
		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap) {
					func.apply(obj, args);
				}
				timeout = null;
			}
			if (timeout) {
				clearTimeout(timeout);
			} else if (execAsap) {
				func.apply(obj, args);
			}
			timeout = setTimeout(delayed, threshold || 100);
		};
	};
	// smartresize
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

cmc.cmc = (function($){
  'use strict';

  function init() {

    $('#tabs .tab').hide();
    $('#tabs .tab:first').show();
    $('#tabs ul li:first').addClass('active');
    $('#tabs ul li a').click(function(){
      $('#tabs ul li').removeClass('active');
      $(this).parent().addClass('active');
      var currentTab = $(this).attr('href');
      $('#tabs .tab').hide();
      $(currentTab).show();
      return false;
    });

    // Display global navigation panels on click
    $('#shortcuts-nav, #nav-search, #nav-directory').click(function(event){
      event.stopPropagation(); // Stop propagation of the click outside event
      $('.open').not($(this)).removeClass('open').find('.panel').hide();
      $(this).find('.panel').slideToggle('fast').parent().toggleClass('open');
      $('li#nav-search.open input#search-terms').focus();
    });

    // Hide panels when clicking outside
    $('html').click(function() {
      $('.open').removeClass('open').find('.panel').hide();
    });

    // Keep panels open when clicked
    $('.panel').click(function(event){
      event.stopPropagation();
    });

    // Display subsection menus on click

    // handles display of non-active clicked
    $('.main-nav .menu').on('click', '.top-level:not(.active)', function(ev) {
      $(this).addClass('active').siblings('.active').removeClass('active');
      $('.open-subnav').removeClass('open-subnav');
      $('#' + $(this).attr('id').replace('nav-','subsection-') ).addClass('open-subnav').parents('.sub-nav').slideDown('fast');
      ev.preventDefault();
    });

    // handles removal(close) when active is clicked
    $('.main-nav .menu').on('click', '.top-level.active', function(ev) {
      $('.nav-close').trigger('click');
      ev.preventDefault();
    });

    // Closes Subnav on click of close button
    $('.sub-nav').on('click', '.nav-close', function(ev) {
     $('.top-level.active').removeClass('active');
     $(this).parents('.sub-nav').slideUp('fast');
     ev.preventDefault();
    });

    // Moves Subnav from the footer to just under the header
    $('.sub-nav').insertAfter('header');

    // Notifications

    // Close button slides up notification bar
    $('#notifications .close').on('click', function() {
      $(this).parents('#notifications').slideUp('fast');
    });

    // Next button cycles through notices
    $('#notifications .next').on('click', function() {
      var notices = $(this).parents('#notifier').children('p');
      var current = $(notices).filter('.active');
      var next;
      if($(current).next('p').length) {
        next = $(current).next();
      } else {
        next = $(notices).first();
      }
      $(current).removeClass('active');
      $(next).hide().addClass('active').fadeIn('slow');
    });

    // Previous button cycles through notices
    $('#notifications .prev').on('click', function() {
      var notices = $(this).parents('#notifier').children('p');
      var current = $(notices).filter('.active');
      var prev;
      if($(current).prev('p').length) {
        prev = $(current).prev();
      } else {
        prev = $(notices).last();
      }
      $(current).removeClass('active');
      $(prev).hide().addClass('active').fadeIn('slow');
    });

    // fallback for rounded corners in ie
    if ($('.ie7').length !== 0){
      $('.ie7 .main-nav ul li a').corner('round 5px');
      $('.ie7 .button').corner('round 5px');
      $('.ie7 .btn').corner('round 3px');
      $('.ie7 .link-support').corner('round 5px');
    } else if ($('.ie8').length !== 0){
        $('.ie8 .main-nav ul li a').corner('round 5px');
        $('.ie8 .button').corner('round 5px');
        $('.ie8 .btn').corner('round 3px');
        $('.ie8 .link-support').corner('round 3px');
    }

  }

  $(document).on('ready', init);

})(jQuery);

cmc.cmcPrint = (function($){
  'user strict';

  function init() {
    // When the document is ready, initialize the link so that when it is
    // clicked, the printable area of the page will print.

    //Print the div.main-content (may use with onClick=)
    function printContent() {
        // Show print-only elements
        $('.print-only').show();
        //Print the DIV.
        $('div.main-content').print();
        // Hide print-only elements
        $('.print-only').hide();
        // Cancel click event.
        return( false );
    }

    // Hook up the print link.
    $('a#print-link').attr( 'href', 'javascript:void(0)' ).click(function(){
      //Show print-only elements
      $('.print-only').show();

      // Print the DIV.
      $('.printable').print();
      // Hide print-only elements
      $('.print-only').hide();
      // Cancel click event.
      return( false );
    });

  }

  $(document).on('ready', init);

})(jQuery);

cmc.equalHeights = (function($){
  'user strict';

  function init() {
    //NEW HOMEPAGE ADDITIONS
    function equalHeights(elm) {
      var currentTallest = 0;
      $(elm).css({'min-height': ''});
      $(elm).each(function() {
        if ($(this).height() > currentTallest) {
          currentTallest = $(this).height();
        }
      });
      $(elm).css({'min-height': currentTallest});
    }
    //ALL PAGE ELEMENTS LOADED
    window.onload = function() {
      //equalHeights($('.supplementary-section'));
    };
    // HARVEY MEDIA QUERY BASED FUNCTIONS
    function narrowOn() {
      //equalHeights($('.supplementary-section'));
    }
    function revertHeight() {
      $('.supplementary-section').css({'min-height': '0px'});
    }
    function largeOn() {
      //equalHeights($('.supplementary-section'));
    }
    Harvey.attach('screen and (min-width:640px)', {
      on: largeOn,
      off: revertHeight
    });
    Harvey.attach('screen and (min-width:768px)', {
      on: narrowOn
    });
    Harvey.attach('screen and (min-width:1060px)', {
      on: largeOn
    });
  }

  $(document).on('ready', init);

})(jQuery);

cmc.flexslider = (function($){
  'use strict';

  function init(){
    $('.front #featured').flexslider({
      animation: 'slide',             //String: Select your animation type, 'fade' or 'slide'
      easing: 'swing',                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
      direction: 'horizontal',        //String: Select the sliding direction, 'horizontal' or 'vertical'
      reverse: false,                 //{NEW} Boolean: Reverse the animation direction
      animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received 'disable' classes at either end
      smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
      slideshow: true,                //Boolean: Animate slider automatically
      slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
      animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
      initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds

      // Usability features
      pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
      pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
      useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
      touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
      video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

      // Primary Controls
      controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
      directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
      prevText: 'Previous',           //String: Set the text for the 'previous' directionNav item
      nextText: 'Next',               //String: Set the text for the 'next' directionNav item

      // Secondary Navigation
      keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
      pausePlay: false
    });

    $('.not-front #featured').flexslider({
      animation: 'slide',             //String: Select your animation type, 'fade' or 'slide'
      easing: 'swing',                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
      direction: 'horizontal',        //String: Select the sliding direction, 'horizontal' or 'vertical'
      reverse: false,                 //{NEW} Boolean: Reverse the animation direction
      animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received 'disable' classes at either end
      smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
      slideshow: true,                //Boolean: Animate slider automatically
      slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
      animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
      initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds

      // Usability features
      pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
      pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
      useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
      touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
      video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

      // Primary Controls
      controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
      directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
      prevText: 'Previous',           //String: Set the text for the 'previous' directionNav item
      nextText: 'Next',               //String: Set the text for the 'next' directionNav item

      // Secondary Navigation
      keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
      pausePlay: false
    });


  }

  $(document).on('ready', init);

})(jQuery);

cmc.section = (function($){
  'use strict';

  function init() {

    // Sets class 'current' to top header section nav item
    function navCurrent() {
      var bodyClasses = $('body').attr('class').split(' '),
          bodyClass = '';
      for (var i = 0; i < bodyClasses.length; i++){
        if ( bodyClasses[i].substr(0,8) === 'section-' ){
          bodyClass = bodyClasses[i].replace('section-','nav-');
          break;
        }
      }
      $('#' + bodyClass).addClass('current');
    }
    navCurrent();

  }

  $(document).on('ready', init);

})(jQuery);

cmc.socialShare = (function($){
  'use strict';

  function init() {

    $('.js-share_link').click(function(event){

      // Do nothing if the share link is for email
      if ( !$(this).hasClass('email') ) {

        event.preventDefault();

        var href  = $(event.target).attr('href'),
            title = 'Share on ' + $(event.target).attr('data-uwlm-share-site'),
            left  = (screen.width/2)-(550/2),
            top   = (screen.height/2)-(300/2);

        // Popup new window. Opens a new window on mobile devices.
        window.open(href, title, 'height=300, width=550, resizable=1, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,top=' + top + ', left=' + left);

      }

    });

  }

  $(document).on('ready', init);

})(jQuery);

cmc.subnav = (function($){
  'use strict';

  function init(){

    // If browser is IE
    var ie = false;
    if ( $('body').hasClass('ie') ) {
      ie = true;
    }

    // Display subsection menus on click
    // handles display of non-active clicked
    $('.main-nav .menu').on('click', '.top-level:not(.active)', function(ev) {
      $(this).addClass('active').siblings('.active').removeClass('active');
      $('.open-subnav').removeClass('open-subnav');
      if (ie) {
        $('#' + $(this).attr('id').replace('nav-','subsection-') ).addClass('open-subnav').parents('.sub-nav').show();
      } else {
        $('#' + $(this).attr('id').replace('nav-','subsection-') ).addClass('open-subnav').parents('.sub-nav').slideDown('fast');
      }
      ev.preventDefault();
    });

    // handles removal(close) when active is clicked
    $('.main-nav .menu').on('click', '.top-level.active', function(ev) {
      $('.nav-close').trigger('click');
      ev.preventDefault();
    });

    // Closes Subnav on click of close button
    $('.sub-nav').on('click', '.nav-close', function(ev) {
      $('.top-level.active').removeClass('active');
      if (ie) {
        $(this).parents('.sub-nav').hide();
      } else {
        $(this).parents('.sub-nav').slideUp('fast');
      }
      ev.preventDefault();
    });

    // Moves Subnav from the footer to just under the header
    $('.sub-nav').insertAfter('header');
  }

  $(document).on('ready', init);

})(jQuery);

cmc.uniform = (function ($) {
  'use strict';

  function init() {
    $('input, textarea, select, button, radio').uniform();
  }

  $(document).on('ready', init);

})(jQuery);

cmc.userProfiles = (function($){

  function init() {
    var link = $('.user__sideblock-website--link'),
        href = link.text();

    link.html('<a href="' + href + '">Web Site</a>');

  }

  $(document).on('ready', init);

})(jQuery);
;
