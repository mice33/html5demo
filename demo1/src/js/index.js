var SS = {
    imgWidth:1680,
    imgHeight:880,
    pageScale:0,
    fullBg: function(targetImg, imgwidth, imgheight) {
        var bgImg = $(targetImg);
        function resizeImg() {
            /* var imgwidth = bgImg.width();
            var imgheight = bgImg.height();*/
            var winwidth = $(window).width(),
                winheight = $(window).height(),                
                widthratio = winwidth / imgwidth,
                heightratio = winheight / imgheight,
                widthdiff = heightratio * imgwidth,
                heightdiff = widthratio * imgheight;
            if (heightdiff > winheight) {
                bgImg.css({
                    width: winwidth + 'px',
                    height: heightdiff + 'px'
                });
                //console.log(widthdiff+" "+heightdiff+" "+winwidth+" "+winheight);
            } else {
                bgImg.css({
                    width: widthdiff + 'px',
                    height: winheight + 'px'
                });
                //console.log(widthdiff+" "+heightdiff+" "+winwidth+" "+winheight);
            }
        }
        resizeImg();
        if(SS.isMobile()){
            window.addEventListener("orientationchange",function(obj){
                resizeImg();
            });
        }else{
            var resizeTimer = null;
            $(window).resize(function() {
                if (resizeTimer) {
                    clearTimeout(resizeTimer);
                }
                resizeTimer = setTimeout(function() {
                    resizeImg();
                }, 400);
            });
        }
    },
    resetImg:function(targetImg, imgwidth, imgheight){ //全屏背景(底部为主)
        var bgImg = $(targetImg);

        function rImg() {
            var winwidth = $(window).width(),
                winheight = $(window).height(),
                winScaling = winwidth/winheight,
                imgScaling = imgwidth/imgheight;

            if(imgScaling>winScaling){
                bgImg.css({"margin-left":"-"+(winwidth-imgwidth*winheight/imgheight)/2,"width":"auto","height":"100%"});
            }else{
                bgImg.css({"margin-top":"-"+(winwidth-imgwidth*winheight/imgheight)/2+"px","width":"100%","height":"auto"});
            }
        }
        rImg();
        if(SS.isMobile()){
            window.addEventListener("orientationchange",function(obj){
                rImg();
            });
        }else{
            var resizeTimer = null;
            $(window).resize(function() {
                if (resizeTimer) {
                    clearTimeout(resizeTimer);
                }
                resizeTimer = setTimeout(function() {
                    rImg();
                }, 400);
            });
        }
    },
    resetLightxy:function(){//根据屏幕重置灯光位置
        function rLight(){
            $(".lightico img").each(function(i){
                var _this = $(this), oldX, oldY, oldWidth, oldHeight;
                if (_this.attr("oldx") === undefined){
                    oldX = _this.css("left");
                    oldY = _this.css("top");
                    oldWidth = _this.width();
                    oldHeight = _this.height();
                    oldX = oldX.replace(/px/, "");
                    oldY = oldY.replace(/px/, "");
                }else{
                    oldX = _this.attr("oldx");
                    oldY = _this.attr("oldy");
                    oldWidth = _this.attr("oldwidth");
                    oldHeight = _this.attr("oldheight");
                }
                SS.pageScale = $('.pic-a .img img').width()/SS.imgWidth;
                SS.resetXYWH(_this,oldX,oldY,oldWidth,oldHeight);
            });
        }
        rLight();
        if(SS.isMobile()){
            window.addEventListener("orientationchange",function(obj){
                rLight();
            });
        }else{
            var resizeTimer = null;
            $(window).resize(function() {
                if (resizeTimer) {
                    clearTimeout(resizeTimer);
                }
                resizeTimer = setTimeout(function() {
                    rLight();
                }, 400);
            });
        }
    },
    resetXYWH:function(target,oldx,oldy,oldwidth,oldheight){//根据屏幕比例设置大小以及位置
        //console.log(" "+oldX*SS.pageScale+" "+oldY*SS.pageScale);
        if (target.attr("oldx") === undefined) {
                target.attr({oldx:oldx,oldy:oldy,oldwidth:oldwidth,oldheight:oldheight});
        }
        target.css({"width":oldwidth*SS.pageScale,"height":oldheight*SS.pageScale+"px","left":oldx*SS.pageScale+"px","top":oldy*SS.pageScale});
    },
    isMobile:function(){
        var a = navigator.userAgent.toLowerCase();
        if (a.indexOf('iphone') !== -1){ return "iphone";}
        if (a.indexOf('ipod') !== -1){ return "ipod";}
        if (a.indexOf('ipad') !== -1){ return "ipad";}
        if (a.indexOf('android') !== -1){ return "android";}
        return false;
    },
    init:function(){
        SS.fullBg($('.pic-a .img img'),SS.imgWidth,SS.imgHeight);
        SS.resetLightxy();
    }
};
$(window).load(function() {
    SS.init();
    $("#loading").fadeOut("slow");
    //$(".main").addClass("fadeIn");
});

$(function($) {

});