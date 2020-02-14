'use strict';

var windowSizeHandler = function () {
	if ( $('.dynamicallyResize').length ) {			
		$('.dynamicallyResize').scaleDivMax();
	}
}	

var DSdurationTime = 1000;//div skill full size animation duration time
	
//jQuery function for scaling div
jQuery.fn.scaleDivMax = function () {
	var viewportHeight = $(window).height();
	var viewportWidth = $(window).width();
	var divCurrentHeight = $(this).outerHeight();
	var divCurrentWidth = $(this).outerWidth();	
	console.log(divCurrentWidth+' '+divCurrentHeight);
	var widhtScalePercent = $(this).attr('data');
	var divTargetWidthCoeff = viewportWidth*widhtScalePercent/divCurrentWidth;
	var divTargetHeightCoeff = viewportHeight*widhtScalePercent/divCurrentHeight;
	var divTargetCoeff;
	if (viewportWidth>viewportHeight && (viewportWidth-viewportHeight)>200) {
		divTargetCoeff = divTargetHeightCoeff;
	}
	else {
		divTargetCoeff = divTargetWidthCoeff;
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