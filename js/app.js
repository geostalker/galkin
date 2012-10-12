(function(document){
	window.MBP=window.MBP||{};
	MBP.viewportmeta=document.querySelector&&document.querySelector('meta[name="viewport"]');
	MBP.ua=navigator.userAgent;
	MBP.scaleFix=function(){
		if(MBP.viewportmeta&&/iPhone|iPad|iPod/.test(MBP.ua)&&!/Opera Mini/.test(MBP.ua))
			{ MBP.viewportmeta.content="width=device-width, minimum-scale=1.0, maximum-scale=1.0";
			document.addEventListener("gesturestart",MBP.gestureStart,false);}
	};
	MBP.gestureStart=function(){
		MBP.viewportmeta.content="width=device-width, minimum-scale=0.25, maximum-scale=1.6";
	};
	MBP.hideUrlBar=function(){
		var win=window;if(!location.hash&&MBP.BODY_SCROLL_TOP!==false){
		win.scrollTo(0,MBP.BODY_SCROLL_TOP===1?0:1);}
	};
	
	if(document.addEventListener){
		document.addEventListener("orientationchange",MBP.hideUrlBar);
	}

	MBP.scaleFix();
	MBP.hideUrlBar();
}(document));
(function(){var cache={};this.tmpl=function tmpl(str,data){var fn=!/\W/.test(str)?cache[str]=cache[str]||tmpl(document.getElementById(str).innerHTML):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};"+"with(obj){p.push('"+
str.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")
+"');}return p.join('');");return data?fn(data):fn;};})();
var FWD=FWD||{};
FWD=(function(fwd)
{"use strict";
var offsets=[],$sections=$("section"),$nav=$("nav"),$navLinks=$(".nav-wrapper nav ul").find("li"),noOfSections=$sections.length,isIOS=(/iphone|ipad|ipod/gi).test(navigator.appVersion),isMobile=Modernizr.mq("only screen and (max-width: 767px)");
function getScrollTop(){if(typeof pageYOffset!=='undefined'){return pageYOffset;}else{var B=document.body,D=document.documentElement;D=(D.clientHeight)?D:B;return D.scrollTop;}}
function handleOffset(scrollTop){var i;if(scrollTop<offsets[0].offset||scrollTop>=offsets[noOfSections-1].offset){$navLinks.removeClass("active");}
for(i=0;i<noOfSections;i+=1){if(scrollTop>=offsets[i].offset){$navLinks.removeClass("active");$($navLinks[i]).addClass("active");}}}
function handleStickyNavi(){var currentScroll=getScrollTop();handleOffset(currentScroll);}
function initOffsets(){$sections.each(function(){var $this=$(this),section={};section.offset=$this.offset().top-1;section.name=$this.attr("id");offsets.push(section);});}
function initForm(){$("#contact-form").on('submit',function(){var $form=$(this),$submitBtn=$form.find("input[type=submit]"),data=$form.serialize();$submitBtn.attr("disabled","disabled");$.post('contact',data,function(data){if(data==="ok"){$form.fadeOut(300,function(){$(this).replaceWith("<p>Vielen Dank für deine Nachricht! Wir werden uns so schnell wie möglich bei dir melden</p>");});}else{alert("Ups, da ging was schief. Versuch's doch einfach nochmal! Nicht alle Felder ausgefüllt?");$submitBtn.removeAttr("disabled");}}).error(function(){alert("Ups, da ging was schief. Versuch's doch einfach nochmal! Nicht alle Felder ausgefüllt?");$submitBtn.removeAttr("disabled");});return false;});}
function initSmoothScroll(){$('a[href*=#]').click(function(){if(location.pathname.replace(/^\//,"")===this.pathname.replace(/^\//,"")&&location.hostname===this.hostname){var $target=$(this.hash),targetOffset;$target=$target.length&&$target||$('[name='+this.hash.slice(1)+']');if($target.length){targetOffset=$target.offset().top;$('html,body').animate({scrollTop:targetOffset},600,function(){if(isIOS){fixHeader(targetOffset);}
closeMobileNav();});return false;}}});}
function fixHeader(targetOffset){$(".nav-wrapper").css({"position":"relative"});window.scroll(0,targetOffset);$(".nav-wrapper").css({"position":"fixed"});}
function loadpolyfills(){Modernizr.load([{test:Modernizr.input.placeholder,nope:'js/jquery.placeholder-enhanced.min.js'}]);}
function initMobile(){if(isMobile){$(".mobile-navi").on("click",function(){if($nav.hasClass("open")){closeMobileNav();}else{openMobileNav();}});}}
function openMobileNav(){$nav.addClass("open");}
function closeMobileNav(){$nav.removeClass("open");}
function resetOrientationChange(){fixHeader();}
function resetResize(){if(!isMobile){isMobile=Modernizr.mq("only screen and (max-width: 767px)");initMobile();}}
fwd.init=function(){
	loadpolyfills();
	initOffsets();
	$(window).scroll(function(){handleStickyNavi();});
	initSmoothScroll();
	initForm();
	initMobile();
	if(document.addEventListener){document.addEventListener("orientationchange",resetOrientationChange);}
	$(window).on("resize",resetResize);
};
return fwd;
}(FWD));
$(function(){"use strict";FWD.init();});