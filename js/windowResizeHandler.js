'use strict';
var viewportWidth;
var biggerThanFT = false;
var windowSizeHandler = function () {			
	viewportWidth = $(window).width();
	/*console.log(viewportWidth);*/
	if ($('.dynamicallyResize').length && viewportWidth < 401) {		
		$('.dynamicallyResize').scaleDivMax();	
		biggerThanFT = true;	
	}
	else {
		while (biggerThanFT){
			$('.dynamicallyResize').scaleDivMax();	
			biggerThanFT = false;			
		}	
	}	
}	

var DSdurationTime = 1000;//div skill full size animation duration time
var divTargetCoeff=1;	
//jQuery function for scaling div
jQuery.fn.scaleDivMax = function () {	
	var viewportHeight = $(window).height();	
	var divCurrentHeight = $(this).outerHeight();
	var divCurrentWidth = $(this).outerWidth();	
	/*console.log(divCurrentWidth+' '+divCurrentHeight);*/
	if (viewportWidth < 401) {
		var widhtScalePercent = $(this).attr('data');
		var divTargetWidthCoeff = viewportWidth*widhtScalePercent/divCurrentWidth;
		var divTargetHeightCoeff = viewportHeight*widhtScalePercent/divCurrentHeight;
		
		if (viewportWidth>viewportHeight && (viewportWidth-viewportHeight)>200) {
			divTargetCoeff = divTargetHeightCoeff;
		}
		else {
			divTargetCoeff = divTargetWidthCoeff;			
		}		 
	}
	else {		
		divTargetCoeff = 1;		 
	}		
	
	this.animate(
		{  
			textIndent: divTargetCoeff
		}, 
		{
			step: function(now,fx) 
		{
			$(this).css('-webkit-transform','scale3d('+now+', '+now+', '+now+')');
			$(this).css('transform','scale3d('+now+', '+now+', '+now+')');  
		}, 
		duration: DSdurationTime,
		queue: false,
		complete: function(){					
			}
		},
		'linear'
	)	
		
	
	return this;
}
	
var resizeTimer;
windowSizeHandler();//running once
$(window).resize(function() {	
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		windowSizeHandler();
	}, 250);
})