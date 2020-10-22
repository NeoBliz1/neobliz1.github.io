'use strict';
var viewportWidth;
var locName = window.location.pathname.split('/');
console.log(locName[1])
var windowSizeHandler = function () {			
	viewportWidth = $(window).width();
	if (viewportWidth>=440) {
		$('body, .headerContent, .main').css('width', viewportWidth);
	} 
	else if (locName[1]!=='index.html') {
		$('body, .headerContent, .main').css('width', '440px');
	}
	else {
		$('body, .headerContent, .main').css('width', viewportWidth);
	}
	
}	

var resizeTimer;
windowSizeHandler();//running once
$(window).resize(function() {	
	clearTimeout(resizeTimer);//using a timer to avoid overload
	resizeTimer = setTimeout(function() {
		windowSizeHandler();
	}, 250);
})