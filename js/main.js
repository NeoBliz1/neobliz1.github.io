'use strict';
var zoomInHeader = function () {
	//zoom in main header
	$('.headerContent').addClass('zoomIn animated');
	//hide elements which will be animated
	$('.scrollAnimate').addClass('hidden');
}
/*use waypoint JQuery plugin for tracking scroll elements*/
var scrollAnimate = function () {
	$('.scrollAnimate').waypoint(function(direction) {		
		if (direction === 'up') {			
			//animated fadeOut elements when their are scrolling 
			$(this.element)			
			.removeClass('fadeInUp animated slow')
			.addClass('fadeOutDown animated');
		}
		else {			
			//animated fadIn elements when their are scrolling 
			$(this.element)
			.removeClass('hidden fadeOutDown animated')
			.addClass('fadeInUp animated slow');			
		}		
	}, 
	{	
		//offset from window top
	  offset: '85%'
	});
}
/*fadingOut loader screen*/
var loaderScreen = function () {
	$('.loader-gif').fadeOut('slow');
}
/*functions which handle MySkills areas divs
and applying zommIn animation on it*/
var mySkillsAnimation = function () {
	var $projectDiv = $('.projectDiv');
	var durationTime = 500;
	var viewportWidth, projectDivZoomInCoeff, projectDivWidthCoeff, projectDivHeightCoeff;
	$($projectDiv).addClass('scrollAnimate hidden');
	var windowSizeHandler = function () { //function handle which window is on resize
		viewportWidth = $(window).width();
		if (viewportWidth>=1024){
			projectDivZoomInCoeff = 1.4/viewportWidth;
			projectDivWidthCoeff = 0.18;
			projectDivHeightCoeff = 0.14;
		}
		else if (viewportWidth>=500) {			
			projectDivZoomInCoeff = 1.4/viewportWidth;
			projectDivWidthCoeff = 0.27;
			projectDivHeightCoeff = 0.2;
		}
		else {
			projectDivZoomInCoeff = 1.4/viewportWidth;
			projectDivWidthCoeff = 0.37;
			projectDivHeightCoeff = 0.29;
		}
		
		if ( $('#cloneDiv').length ) {			
			$('#cloneDiv').center()
			.scaleDivMax();
		}
	}	
	
	var zoomInAnimation = function (thisIs){
		durationTime=500;
		$(thisIs).removeClass('fadeInUp animated')
		.filter(':not(:animated)')
		.css({
		 	'z-index': 4,		 	
  		'text-indent': '1px'
		})
		//using step function for animate skill boxes
		.animate(
			{  
				textIndent: viewportWidth*projectDivZoomInCoeff
			}, 
			{
				step: function(now,fx) 
				{
					$(thisIs).css('-webkit-transform','scale3d('+now+', '+now+', '+now+')');
					$(thisIs).css('transform','scale3d('+now+', '+now+', '+now+')');  
				}, 
				duration:durationTime,
				complete: function(){
					$(thisIs).find('button, a')
					.rollInBtnAnimation()
					.click(function(event) {		
						if (event.currentTarget.id==='rmb') {
							/*alert('Your clicked button 'Read more'');*/
							projectDivFullSize(thisIs);
						}			
					});
				}
			},
		'linear');				
	}
	var zoomOutAnimation = function (thisIs) {
		durationTime=500;
		$(thisIs).animate(
			{  
				textIndent: 1.0 
			}, 
			{
				step: function(now,fx) 
				{
					$(thisIs).css('-webkit-transform','scale3d('+now+', '+now+', '+now+')'); 
					$(thisIs).css('transform','scale3d('+now+', '+now+', '+now+')');  					
					$(thisIs).find('button, a')
					.rollOutBtnAnimation()
					.off('click');
				}, 
				duration: durationTime,
				complete: function() {
  				$(thisIs).css('z-index', '3');
  			}			 				
			},'linear'
		);
	}
	//adding buttons to the project div in skills section
	var addButtonsToDiv = function (thisIs) {
		$projectDiv.prepend('<button class="readMoreBtn btnResponsiveSize hidden" id="rmb" type="button">read more</button>');
	}

	jQuery.fn.rollInBtnAnimation = function () {
		//button animated In
		this.removeClass('hidden rollOut animated')
		.addClass('rollIn animated');
		return this;
	}
	jQuery.fn.rollOutBtnAnimation = function () {
		//button animated Out
		this.removeClass('rollIn animated')
		.addClass('rollOut animated');
		return this;
	}
	var DSdurationTime = 1000;//div skill full size animation duration time
	//jQuery function for centering div
	jQuery.fn.center = function () {
		var viewportHeight = $(window).height();
		var viewportWidth = $(window).width();
		var divCurrentHeight = $(this).outerHeight();
		var divCurrentWidth = $(this).outerWidth();				
		var targetTopOffset = Math.max(0, ((viewportHeight - divCurrentHeight) / 2) + $(window).scrollTop());//defining the target position from the div top to the viewport
		var targetLeftOffset = Math.max(0, ((viewportWidth - divCurrentWidth) / 2) + $(window).scrollLeft());//defining the target position from the div left to the viewport		
		this.animate({
			top : targetTopOffset, 
			left : targetLeftOffset					
		},		 
		{
			duration: DSdurationTime, 
			queue: false
		})
		return this;
	}
	//jQuery function for scaling div
	jQuery.fn.scaleDivMax = function () {
		var viewportHeight = $(window).height();
		var viewportWidth = $(window).width();
		var divCurrentHeight = $(this).outerHeight();
		var divCurrentWidth = $(this).outerWidth();
		var divTargetWidthCoeff = viewportWidth*0.9/divCurrentWidth;
		var divTargetHeightCoeff = viewportHeight*0.9/divCurrentHeight;
		if (viewportWidth>viewportHeight && (viewportWidth-viewportHeight)>200) {
			var divTargetCoeff = divTargetHeightCoeff;
		}
		else {
			var divTargetCoeff = divTargetWidthCoeff;
		}
		console.log(viewportWidth);
		console.log(viewportHeight);
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
	jQuery.fn.backToStartPosition = function (currentDivOffset) {
		this.animate({
			top : currentDivOffset.top, 
			left : currentDivOffset.left					
		},		 
		{
			duration: DSdurationTime, 
			queue: false
		})
		return this;
	}
	//jQuery function for scaling div
	jQuery.fn.scaleDivMin = function () {		
		this.animate(
			{  
				textIndent: 1
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
	//scaling project div for more description
	var projectDivFullSize = function (thisIs) {
		var currentDivOffset = $(thisIs).offset();
		//forced triggering mouse leave handler for minimizing current div
		$(thisIs).trigger('mouseleave'); 
		//cloning current div for saving current structure flex table
		var $cloneDiv = $(thisIs).clone();
		//remove "read more" button
		$($cloneDiv).find('#rmb')
		.remove();
		//roll in "view project" button
		$($cloneDiv).find('#vpb')
		.removeClass('btnResponsiveSize')
		.addClass('butInScale')
		.rollInBtnAnimation();
		//taking current scroll pos
		var currentScroll = $(window).scrollTop();
		//add overlay div
		$('main .flex_box').append('<div id="fullSizeSkillBoxOverlay"></div>');		
		$($cloneDiv).attr('id', 'cloneDiv')
		.appendTo('main .flex_box') //adding clone div to the end main div
		.append('<div class="outerCloseButton hidden"><div class="innerCloseButton hidden"><label class="closeButton hidden">Back</label></div></div>')//adding overlay div to the end main div
		.css({
			position : 'absolute',
			top : currentDivOffset.top,
			left : currentDivOffset.left,
			'z-index' : 10,
    	margin : 0,
    	'border-style' : 'double',
  		'border-color': 'white'  		
		})
		.center()
		.scaleDivMax();
		//show description 
		$($cloneDiv).find('.paragraphMSD').removeClass('hidden')
		.hide()
		.fadeIn(DSdurationTime);
		//show close button
		$('.outerCloseButton, .innerCloseButton, .closeButton').removeClass('hidden')
		.hide()
		.fadeIn(DSdurationTime);
		//overlay click handler
		$('#fullSizeSkillBoxOverlay, .closeButton').click(function(event) {
			/* Act on the event */			
			projectDivMinimize(this, currentDivOffset);
		});
		//scrolling to current position after hiding scroll bar
		$(window).on('scroll.fixedCurrentView', function() {					
			$(window).scrollTop(currentScroll);
		});
		$('body').css('overflow', 'hidden');//hiding scroll bar
		$projectDiv.off('mouseenter mouseleave');//shutdown mouse event handler from skills divs
	}
	//minimize fullSize div
	var projectDivMinimize = function (thisIs, currentDivOffset) {		
		$(thisIs).off('click');
		$('#fullSizeSkillBoxOverlay').fadeOut(DSdurationTime, function() {
			$(this).remove();
		});
		$('#cloneDiv')
		.scaleDivMin()
		.backToStartPosition(currentDivOffset)
		.fadeOut(DSdurationTime, function() {
			$(this).remove();
		});
		$('body').css('overflow', 'visible');
		divHoverHandler();
		$(window).off('scroll.fixedCurrentView');
	}
	var divHoverHandler = function () {
		//mouse in and out handler
		$projectDiv.hover(function() {
			/* Stuff to do when the mouse enters the element */
			var thisIs = this;					
			zoomInAnimation(thisIs);			
		}, function() {		
			/* Stuff to do when the mouse leaves the element */
			var thisIs = this;
			zoomOutAnimation(thisIs);			
		});	
	}
	/**************My skills animation main block*******************/
	windowSizeHandler(); //resize MySkills divs from window size
	addButtonsToDiv(); // adding buttons to divs
	divHoverHandler();
	//size MySkills divs handler
	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			windowSizeHandler();
		}, 250);
	})
	
}
var scrollTop = function () {
	$("#button").click(function() {
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#elementtoScrollToID").offset().top
		}, 2000);
	});
}

/**************main block*******************/
$( window ).on( 'load', function() {
  console.log( 'document loaded' );
  loaderScreen();
 	zoomInHeader();			
	mySkillsAnimation();
	scrollAnimate();
});
