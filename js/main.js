'use strict';
//srt named event for refresh parallax imgs
jQuery.event.special.renewPage = {
	bindType: 'resize',
	delegateType: 'resize'
};

//checking browser and platform
var platformIsMobile = false;
var orientationIsChange = false;
if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) || navigator.userAgent.match(/(Android)/)) {
	platformIsMobile = true;
	$(window).on( 'orientationchange', function( event ) {
		$('.loader-gif').css('display', 'initial');
		orientationIsChange = true;
		// console.log(orientationIsChange);
	});
}

var zoomInHeader = function () {
	//zoom in main header
	$('.headerContent').addClass('zoomIn animated');
	//hide elements which will be animated
	$('.scrollAnimate').addClass('hidden');
}
this.doAnim = false;
/*use waypoint JQuery plugin for tracking scroll elements*/
var scrollAnimate = function (offsetNum, upButOffsetNum) {	
		
	$('.scrollAnimate')
	.waypoint(
		function(direction) {
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
		{	offset: offsetNum}
	);

	$('.upButton')
	.waypoint(
		function(direction) {
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
		{	offset: upButOffsetNum}
	);
	// if (!platformIsMobile) {
	// if (true) {
		var $fluidMeterScroll = $('.fluidMeterScroll')
		//activated canvas when it is in the visible state
		$fluidMeterScroll
		.waypoint(
			function(direction) {		
				if (direction === 'up') {			
					doAnim = false;//global anim variable
					// console.log('anim stop')
				}
				else {
					doAnim = true;//global anim variable
					htmlFM.restart();
					cssFM.restart();
					jsFM.restart();
					jQueryFM.restart();
					pythonFM.restart();	
					// console.log('anim start1')				
				}			
			}, 
			{	offset: '100%'}
		);
		$fluidMeterScroll.waypoint(
			function(direction) {		
				if (direction === 'down') {			
					doAnim = false;//global anim variable
					// console.log('anim stop')
				}
				else {
					doAnim = true;//global anim variable
					htmlFM.restart();
					cssFM.restart();
					jsFM.restart();
					jQueryFM.restart();
					pythonFM.restart();
					// console.log('anim start2')						
				}	
			// console.log(direction);
			}, 
			{	offset: '-15%'}
		);
	// }		
}

/*fadingOut loader screen*/
var loaderScreen = function () {
	$('.loader-gif').css('display', 'initial').fadeOut('slow');	
}
//set parallax img attributes
var setParallaxImage = function (wSW, wDPR) {
	var pathToParllaxImg;
	var pathToThmbImg;	
	
	if ( wSW >= 1800 && wDPR >= 0.25 && wDPR < 3) {
		pathToParllaxImg = '../img/cover_bg_3.png';
		pathToThmbImg = '../img/thmb.png';
	}
	else if (wSW < 1800 && wSW >=640 && wDPR >= 3) {
		pathToParllaxImg = '../img/responsive_Img/cover_bg_3.png';
		pathToThmbImg = '../img/responsive_Img/thmb_small.png';
	}
	else {
		pathToParllaxImg = '../img/responsive_Img/cover_bg_3_small.png';
		pathToThmbImg = '../img/responsive_Img/thmb_small.png';				
	}

	$('.blizThumbnail').css('background-image', 'url('+pathToThmbImg+')');	
	$('.slider1, .slider2').attr('src', pathToParllaxImg);	
}

var $projectDiv = $('.projectDiv');	
var durationTime = 500;
var viewportWidth, viewportHeight, projectDivZoomInCoeff, projectDivWidth, projectDivHeight;
var projectDivFullSizeState = false;

var windowSizeHandler = function (viewportWidth, viewportHeight) {
	//set main elements width and height
	$('body, .headerContent, .main').width(viewportWidth);

	var FMheight = $('.fluidMeterContainer1').height();
	$('.mySkills').height(FMheight*1.2);
	
	var mySkillsDivHeight = $('.mySkills').height();
	var mySkillsDivWidth = $('.mySkills').width();
	var image1 = 0;
	var image2 = 0;
	
	//add parallax element
	//initialize parallax script	
	var $sldr1 = $('.slider1');
	var $sldr2 = $('.slider2');
	//initial parameters for sliders img
	let sldr1NW, sldr1NH, headerOverlayWidth;	
	let headerOverlayHeight, mySkillsOverlayWidth, mySkillsOverlayHeight;
	
	sldr1NW = $sldr1.get(0).naturalWidth;
	sldr1NH = $sldr1.get(0).naturalHeight;
		
	if (sldr1NH/(sldr1NW/viewportWidth) < viewportHeight){			
		headerOverlayWidth = 'auto';
		headerOverlayHeight = '100vh';		
	}
	else {
		headerOverlayWidth = '100vw';
		headerOverlayHeight = 'auto';		
	}	

	if (sldr1NH/(sldr1NW/mySkillsDivWidth) < mySkillsDivHeight){			
		mySkillsOverlayWidth = 'auto';
		mySkillsOverlayHeight = mySkillsDivHeight;
	}
	else {		
		mySkillsOverlayWidth = '100vw';
		mySkillsOverlayHeight = 'auto';
	}		
	// initialize parallax
	$sldr1
	.css({		
		width: headerOverlayWidth,
		height: headerOverlayHeight			
	});
	$sldr2
	.css({		
		width: mySkillsOverlayWidth,
		height: mySkillsOverlayHeight	
	});
	var parallaxScaleCoeff = 2; //parallax image coeff which enhances parallax effect
	image1 = document.getElementsByClassName('slider1');
	new simpleParallax(image1, {
		scale: parallaxScaleCoeff,
		delay: .6,
		transition: 'cubic-bezier(0,0,0,1)',
		overflow: false
	});
	image2 = document.getElementsByClassName('slider2');
	new simpleParallax(image2, {
		scale: parallaxScaleCoeff,
		delay: .6,
		transition: 'cubic-bezier(0,0,0,1)',
		overflow: false
	});		
		
		
	//initialize waypoints script
	Waypoint.destroyAll() //remove all waypoints	
	
	var upButOffsetNum=0, offsetNum=0;
	//offset from window top
	if (viewportHeight < 480) {
		offsetNum = '95%';
		upButOffsetNum = '60%';
	}
	else if (viewportHeight > 2000) {
		offsetNum = '100%';
		upButOffsetNum = '50%';	
	}
	else {
		offsetNum = '90%';
		upButOffsetNum = '40%';
	};
		
	scrollAnimate(offsetNum, upButOffsetNum);

	//coeefficient for zooming project divs
	if (viewportWidth>=980) {
		projectDivZoomInCoeff = 1.3/viewportWidth;
	}
	else if (viewportWidth>=350){
		projectDivZoomInCoeff = 1.4/viewportWidth;
	}		
	else {
		projectDivZoomInCoeff = 1.2/viewportWidth;			
	}	
}	


/*functions which handling MySkills areas divs
and applying zommIn animation on it*/
var DSdurationTime = 500;//div skill full size animation duration time
var projectDivSizeHandler = function (viewportWidth, viewportHeight, wDPR, windowOuterHeight, windowOuterWidth) { //function handle which window is on resize
	var fontScaleCoeff, blizThumbnailScaleCoeff;
	if (platformIsMobile){
		if (windowOuterWidth > windowOuterHeight) {
			fontScaleCoeff = windowOuterWidth;
			blizThumbnailScaleCoeff = windowOuterWidth*0.7;			
		}
		else {
			fontScaleCoeff = windowOuterHeight;
			blizThumbnailScaleCoeff = windowOuterHeight;
		}
	}
	else {
		fontScaleCoeff = windowOuterHeight;
		blizThumbnailScaleCoeff = windowOuterHeight;
	}
		

	//set thumbnail size in px;
	$('.blizThumbnail').width(blizThumbnailScaleCoeff*0.3).height(blizThumbnailScaleCoeff*0.3);	
	//set responsive size for social networks logos 
	$('.logo_prop').width(blizThumbnailScaleCoeff*0.08).height(blizThumbnailScaleCoeff*0.08);	
	//set responsive font-size
	$('h1').each(function(index) {			
		var elFontSize = fontScaleCoeff*0.025;
		$(this).css('font-size', elFontSize);	//set font size in pixels
	})
	.filter('.mainHeader')
	.css('font-size', fontScaleCoeff*0.04);

	$('h2').each(function(index) {
		var elFontSize = fontScaleCoeff*0.02;
		$(this).css('font-size', elFontSize);	//set font size in pixels
	});

	$('p, a').each(function(index) {
		var elFontSize = fontScaleCoeff*0.015;
		$(this).css('font-size', elFontSize);	//set font size in pixels
	});
	//upButton size handler
	var upButtonFontSize = fontScaleCoeff*0.045;
	$('.upButton').css({
		'font-size': upButtonFontSize,
		width: fontScaleCoeff*0.06,
		height: fontScaleCoeff*0.06,
		'padding-top': fontScaleCoeff*0.005,
		'padding-left': fontScaleCoeff*0.005,
		bottom:  fontScaleCoeff*0.04,
		right:  fontScaleCoeff*0.04
	});	

	//set project div size
	projectDivWidth = Math.pow(viewportWidth*30000, 1/3);	
	projectDivHeight = projectDivWidth*0.8;
	$projectDiv.css({
		'min-width': projectDivWidth,
		'min-height': projectDivHeight,
		width: projectDivWidth,
		height: projectDivHeight,
		'margin-left': 0.05*projectDivWidth,
		'margin-right': 0.05*projectDivWidth
	});	
	//set buttons font-size		
	$('#rmb, #vpb').css('font-size', projectDivWidth*0.06);
	//set button vpb position parameters, except project_1 and 2 divs
	$projectDiv.not('.project_1')
	.find('#vpb')
	.css({
		left: projectDivWidth*0.55,
		bottom: 0,
		'margin-bottom': projectDivWidth*0.02
	});
		
	//set paragraph size in project divs
	$('.paragraphMSD').css({
		'text-indent': projectDivWidth*0.02,
		'font-size': projectDivWidth*0.025		  
	});	
	var FMcanvasSize, FMborderSize, FMfontSize;	
	// console.log(platformIsMobile, viewportWidth, wDPR)
	if (platformIsMobile && viewportWidth < 1000 && wDPR<=3) {
		var FMScaleCoeff = 1.8;
		FMcanvasSize = (projectDivWidth*0.40);
		FMborderSize = (projectDivWidth*0.015);
		FMfontSize = (projectDivWidth*0.055+'px');
		// console.log('123')
	}
	else if (viewportWidth > viewportHeight) {
		FMcanvasSize = projectDivWidth*0.6;
		FMborderSize = projectDivWidth/40;
		FMfontSize = projectDivWidth/12+'px';
		// console.log('2')
	}
	else if (viewportWidth < viewportHeight) {
		FMcanvasSize = projectDivWidth*0.5;
		FMborderSize = projectDivWidth/50;
		FMfontSize = projectDivWidth/15+'px';
		// console.log('3')
	}

	$('canvas').attr({
		width: FMcanvasSize,
		height: FMcanvasSize
	});
	htmlFM.setProperties(75, FMcanvasSize, FMborderSize, FMfontSize, 'HTML');
	cssFM.setProperties(70, FMcanvasSize, FMborderSize, FMfontSize, 'CSS');
	jsFM.setProperties(25, FMcanvasSize, FMborderSize, FMfontSize, 'JavaScript');
	jQueryFM.setProperties(80, FMcanvasSize, FMborderSize, FMfontSize, 'jQuery');
	pythonFM.setProperties(35, FMcanvasSize, FMborderSize, FMfontSize, 'Python');		
	
}	

var cloneDivSizeHandler = function (viewportHeight, viewportWidth) {
	//handle clone div if it exist
	var $cloneDiv = $('#cloneDiv');
	if ( $cloneDiv.length ) {
		var divCurrentHeight = $cloneDiv.outerHeight();
		var divCurrentWidth = $cloneDiv.outerWidth();
		var vpbFontSize = divCurrentWidth*0.04;
		var vpbMarginValue = divCurrentWidth*0.03;
		// console.log(viewportWidth);
		// console.log(divCurrentWidth);
		// console.log(divCurrentHeight);
		$cloneDiv.center(viewportHeight, viewportWidth, divCurrentHeight, divCurrentWidth)
		.scaleDivMax(viewportHeight, viewportWidth, divCurrentHeight, divCurrentWidth)
		.find('#vpb')	
		.css({			
			'font-size': vpbFontSize					
		});
		//set close button font-size
		$('.closeButton').scaleCloseButton(divCurrentHeight, divCurrentWidth);
		// console.log('rescaling is happened')
		$cloneDiv
		.find('.paragraphMSD')		
		.css({
			'text-indent': divCurrentWidth*0.02,
			'font-size': divCurrentWidth*0.025		  
		});			
	}	
}

var mySkillsAnimation = function () {
	
	$($projectDiv).addClass('scrollAnimate hidden');	
	var zoomInAnimation = function (thisIs){
		durationTime=500;
		var viewportWidth = $(window).width();
		$(thisIs).removeClass('fadeInUp animated')
		.filter(':not(:animated)')
		.css({
			'z-index': 8,		 	
			'text-indent': '1px'
		})
		//using step function for animate skill boxes
		.animate(
			{  
				textIndent: viewportWidth*projectDivZoomInCoeff
			}, 
			{
				step: function(now,fx) 
				{ //animate zomm in skill box
					$(thisIs).css('-webkit-transform','scale3d('+now+', '+now+', '+now+')');
					$(thisIs).css('transform','scale3d('+now+', '+now+', '+now+')');  
				}, 
				duration:durationTime,
				complete: function(){
					$(thisIs).find('button, a')
					.rollInBtnAnimation()
					.mousedown(function(event) { //animate press button, I use this method because animate.css is a conflict with translateY
						var speed = 50;
						var currentBottomProp = parseFloat($(this).css('bottom'));
						$(this).animate({
								bottom: currentBottomProp-3+'px'
							},
							speed,
							function() {
								$(this).animate({bottom: currentBottomProp+'px'}, speed)
							}
						);
					})
					.click(function(event) {						
						if (event.currentTarget.id==='rmb') {
							/*alert('Your clicked button 'Read more'');*/
							projectDivFullSizeState = true;
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
					$(thisIs).css('z-index', '7');
				}			 				
			},'linear'
		);
	}	

	jQuery.fn.rollInBtnAnimation = function () {
		//button animated In
		this.removeClass('hidden rollOut animated faster')
		.addClass('rollIn animated faster');
		return this;
	}
	jQuery.fn.rollOutBtnAnimation = function () {
		//button animated Out
		this.removeClass('rollIn animated faster')
		.addClass('rollOut animated faster');
		return this;
	}	
	//jQuery function for centering div
	jQuery.fn.center = function (viewportHeight, viewportWidth, divCurrentHeight, divCurrentWidth) {
		var $windowScrollTo = $(window).scrollTop();
		//scrolling to current position after hiding scroll bar
		$(window).on('scroll.fixedCurrentView', function() {					
			$(window).scrollTop($windowScrollTo);
		});		
		// console.log($windowScrollTo)
		var targetTopOffset = Math.max(0, ((viewportHeight - divCurrentHeight) / 2) + $windowScrollTo);//defining the target position from the div top to the viewport
		// console.log('targetTopOffset - '+targetTopOffset)
		var targetLeftOffset = Math.max(0, ((viewportWidth - divCurrentWidth) / 2) + $(window).scrollLeft());//defining the target position from the div left to the viewport		
		// console.log(viewportHeight, viewportWidth, divCurrentHeight, divCurrentWidth, $(window).scrollTop());
		this.animate({
			top : targetTopOffset, 
			left : targetLeftOffset					
		},		 
		{
			duration: DSdurationTime, 
			queue: false,
			complete: function(){											
			}
		})
		// console.log('center finished')
		return this;
	}
	//jQuery function for scaling div
	jQuery.fn.scaleDivMax = function (viewportHeight, viewportWidth, divCurrentHeight, divCurrentWidth) {		
		var divTargetWidthCoeff = viewportWidth*0.9/divCurrentWidth;
		var divTargetHeightCoeff = viewportHeight*0.9/divCurrentHeight;
		if (viewportWidth>viewportHeight && (viewportWidth-viewportHeight)>200) {
			var divTargetCoeff = divTargetHeightCoeff;
		}
		else {
			var divTargetCoeff = divTargetWidthCoeff;
		}
		// console.log(viewportWidth);
		// console.log(viewportHeight);		
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
	jQuery.fn.scaleCloseButton = function (divCurrentHeight, divCurrentWidth) {		
		this.css({
			'font-size': divCurrentWidth*0.03,    	
			bottom: divCurrentHeight*1.02,
			left: divCurrentWidth*0.99,
			'text-indent': 0
		});		
		// console.log(this.css('font-size'))
		return this;
	}

	//scaling project div for more description
	var projectDivFullSize = function (thisIs) {
		var currentDivOffset = $(thisIs).offset();
		var viewportHeight = $(window).height();
		var viewportWidth = $(window).width();
		var divCurrentHeight = $(thisIs).outerHeight();
		var divCurrentWidth = $(thisIs).outerWidth();	
		var vpbMarginValue = projectDivWidth*0.03;
		var vpbFontSize = projectDivWidth*0.04;
		//forced triggering mouse leave handler for minimizing current div
		$(thisIs).trigger('mouseleave'); 

		//cloning current div for saving current structure flex table
		var $cloneDiv = $(thisIs).clone();

		//remove "read more" button
		$cloneDiv.removeClass('projectDiv scrollAnimate')
		.find('#rmb')
		.remove();		
		
		//roll in "view project" button		
		$cloneDiv.find('#vpb')	
		.css({
			'font-size': vpbFontSize							
		})
		.rollInBtnAnimation();
		$cloneDiv
		.find('.project_1 > .bottomPart, #vpb')		
		.css({
			margin: vpbMarginValue
		});	

		//taking current scroll pos
		var currentScroll = $(window).scrollTop();

		//add overlay div
		$('body').append('<div id="fullSizeSkillBoxOverlay"></div>');		//adding overlay div to the end main div
		$cloneDiv.attr('id', 'cloneDiv')
		.appendTo('body') //adding clone div to the end main div
		.append('<p class="closeButton hidden"><i class="far fa-times-circle"></i></p>')
		.css({
			position : 'absolute',
			top : currentDivOffset.top,
			left : currentDivOffset.left,
			'z-index' : 10,
			margin : 0,
			'border-style' : 'double',
			'border-color': 'white'  		
		})
		.center(viewportHeight, viewportWidth, divCurrentHeight, divCurrentWidth)
		.scaleDivMax(viewportHeight, viewportWidth, divCurrentHeight, divCurrentWidth)
		.find('button, a')
		.mousedown(function(event) { //animate press button, I use this method because animate.css is a conflict with translateY
			var speed = 50;
			var currentBottomProp = parseFloat($(this).css('bottom'));
			$(this).animate({
					bottom: currentBottomProp-3+'px'
				},
				speed, 
				function() {
					$(this).animate({bottom: currentBottomProp+'px'}, speed)
				}
			);
		});
					


		//show description 
		$cloneDiv.find('.paragraphMSD').removeClass('hidden')
		.hide()
		.fadeIn(DSdurationTime);

		//set close button font-size
		$('.closeButton').scaleCloseButton(divCurrentHeight, divCurrentWidth);

		//show close button
		$('.closeButton')
		.removeClass('hidden')
		.hide()
		.fadeIn(DSdurationTime)
		.hover(function() {
			$(this).find('.fa-times-circle')
			.removeClass('far')
			.addClass('fas')			
			.fadeIn(DSdurationTime);
		}, function() {
			$(this).find('.fa-times-circle')
			.removeClass('fas')
			.addClass('far')			
			.fadeIn(DSdurationTime);
		});
		
			
		//overlay click handler
		$('#fullSizeSkillBoxOverlay, .closeButton, #vpb').click(function(event) {
			/* Act on the event */
			projectDivFullSizeState = false;		
			projectDivMinimize(this, currentDivOffset);
		});		
		// $('body').css('overflow', 'hidden');//hiding scroll bar
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
		$projectDiv.filter(':not(:animated)')
		.hover(function() {
			/* Stuff to do when the mouse enters the element */
			var thisIs = this;					
			zoomInAnimation(thisIs);
			if (platformIsMobile){
				var divCurrentHeight = $(thisIs).outerHeight();
				var viewportHeight = $(window).height();
				var currentDivOffset = $(thisIs).offset();
				var windowScrollTo = currentDivOffset.top;
				var targetTopOffset = Math.max(0, (windowScrollTo - (viewportHeight - divCurrentHeight) / 2));//defining the target position from the div top to the viewport	
				$('html, body').animate({
					scrollTop: targetTopOffset
				}, 500);
				// console.log(windowScrollTo)
			}			
			
			//scrolling to current position after hiding scroll bar
			
			// $(window).on('scroll.fixedCurrentView', function() {					
			// 	$(window).scrollTop(windowScrollTo);
			// });
			//disable all scroll
			// Waypoint.disableAll()				
		}, function() {		
			/* Stuff to do when the mouse leaves the element */
			var thisIs = this;
			zoomOutAnimation(thisIs);	
			// $(window).off('scroll.fixedCurrentView');
			// Waypoint.enableAll()
		});	
	}
	//add read more button to project divs
	$projectDiv.prepend('<button class="readMoreBtn hidden" id="rmb" type="button">read more</button>');
	divHoverHandler();	
}

var resizeHandler = function () {
	//resize handler
	var resizeTimer;
	var browserInitialWidth = window.outerWidth;
	var windowOuterHeight = window.outerHeight;	
	$(window).on('renewPage', function(event) {
		if (!platformIsMobile) {
			$('.loader-gif').css('display', 'initial');
		}		
		//refresh parallax script			
		clearTimeout(resizeTimer);	
		//main resize part		
		resizeTimer = setTimeout(function() {				
			var viewportWidth = $(window).width();
			var viewportHeight = $(window).height();
			var wSW = window.screen.width;
			var wDPR = window.devicePixelRatio;
			doAnim = false;//fluid meters state variable
			// console.log(wDPR);
			// console.log(viewportHeight);			
			var currBrowserWidth = window.outerWidth;
			var currBrowserHeight = window.outerHeight;			
			var bWratio = browserInitialWidth/currBrowserWidth;
			var bHratio = 1;
			if (!platformIsMobile){			
				var bHratio = windowOuterHeight/currBrowserHeight;
			}			
			// console.log('viewportHeight' + viewportHeight);
			// console.log('windowOuterHeight'+windowOuterHeight, 'currBrowserHeight'+currBrowserHeight);
			// console.log(bWratio, bHratio);
			if(orientationIsChange || bWratio !== 1 || bHratio !== 1){
				browserInitialWidth = currBrowserWidth;
				windowOuterHeight = currBrowserHeight;
				projectDivSizeHandler(viewportWidth, viewportHeight, wDPR, windowOuterHeight, browserInitialWidth);
				cloneDivSizeHandler(viewportHeight, viewportWidth);
				// console.log('font and divs resize is happend');				
			}				
			setParallaxImage(wSW, wDPR);
			$('.slider1').one('load', function(event) {
				if (!platformIsMobile || orientationIsChange) {
					loaderScreen();
					orientationIsChange = false;
				}				
				windowSizeHandler(viewportWidth, viewportHeight);	
				// console.log('windowSizeHandler finished');
				$(window)
				.off('renewPage')
				.trigger('resize');
				resizeHandler();				
				// console.log('renewPage is finished');	
			});
		}, 250 );							
	});		
}
//initialize my skills fluid meter
{
	//initialization HTML fluid meter
	var FMfont = 'Big Shoulders Display';
	var htmlFM = new FluidMeter();
		htmlFM.init({
			targetContainer: document.getElementById('HTML-fluid-meter'),
			fillPercentage: 75,
			options: {
				fontFamily: FMfont,
				drawPercentageSign: true,
				drawBubbles: true,
				drawShadow: false,
				size: 300,
				borderWidth: 15,
				backgroundColor: "#e2e2e2",
				foregroundColor: "#fafafa",
				foregroundFluidLayer: {
					fillStyle: "red",
					angularSpeed: 100,
					maxAmplitude: 12,
					frequency: 30,
					horizontalSpeed: -75
				},
				backgroundFluidLayer: {
					fillStyle: "pink",
					angularSpeed: 100,
					maxAmplitude: 15,
					frequency: 30,
					horizontalSpeed: 75
				}
			}
		});

	//initialization CSS fluid meter
	var cssFM = new FluidMeter();
		cssFM.init({
			targetContainer: document.getElementById('CSS-fluid-meter'),
			fillPercentage: 75,
			options: {
				fontFamily: FMfont,
				drawPercentageSign: true,
				drawBubbles: true,
				drawShadow: false,
				size: 300,
				borderWidth: 15,
				backgroundColor: "#e2e2e2",
				foregroundColor: "#fafafa",
				foregroundFluidLayer: {
					fillStyle: "#563d7c",
					angularSpeed: 100,
					maxAmplitude: 12,
					frequency: 30,
					horizontalSpeed: -75
				},
				backgroundFluidLayer: {
					fillStyle: "#ae7bfb",
					angularSpeed: 100,
					maxAmplitude: 15,
					frequency: 30,
					horizontalSpeed: 75
				}
			}
		});

	//initialization JS fluid meter
	var jsFM = new FluidMeter();
		jsFM.init({
			targetContainer: document.getElementById('JS-fluid-meter'),
			fillPercentage: 75,
			options: {
				fontFamily: FMfont,
				drawPercentageSign: true,
				drawBubbles: true,
				drawShadow: false,
				size: 300,
				borderWidth: 15,
				backgroundColor: "#e2e2e2",
				foregroundColor: "#fafafa",
				foregroundFluidLayer: {
					fillStyle: "#f1e05a",
					angularSpeed: 100,
					maxAmplitude: 12,
					frequency: 30,
					horizontalSpeed: -75
				},
				backgroundFluidLayer: {
					fillStyle: "#f2e68d",
					angularSpeed: 100,
					maxAmplitude: 15,
					frequency: 30,
					horizontalSpeed: 75
				}
			}
		});

	//initialization jQuery fluid meter
	var jQueryFM = new FluidMeter();
		jQueryFM.init({
			targetContainer: document.getElementById('jQuery-fluid-meter'),
			fillPercentage: 75,
			options: {
				fontFamily: FMfont,
				drawPercentageSign: true,
				drawBubbles: true,
				drawShadow: false,
				size: 300,
				borderWidth: 15,
				backgroundColor: "#e2e2e2",
				foregroundColor: "#fafafa",
				foregroundFluidLayer: {
					fillStyle: "#ff9000",
					angularSpeed: 100,
					maxAmplitude: 12,
					frequency: 30,
					horizontalSpeed: -75
				},
				backgroundFluidLayer: {
					fillStyle: "#ffc880",
					angularSpeed: 100,
					maxAmplitude: 15,
					frequency: 30,
					horizontalSpeed: 75
				}
			}
		});

	//initialization python fluid meter
	var pythonFM = new FluidMeter();
		pythonFM.init({
			targetContainer: document.getElementById('python-fluid-meter'),
			fillPercentage: 75,
			options: {
				fontFamily: FMfont,
				drawPercentageSign: true,
				drawBubbles: true,
				drawShadow: false,
				size: 300,
				borderWidth: 15,
				backgroundColor: "#e2e2e2",
				foregroundColor: "#fafafa",
				foregroundFluidLayer: {
					fillStyle: "#3572a5",
					angularSpeed: 100,
					maxAmplitude: 12,
					frequency: 30,
					horizontalSpeed: -75
				},
				backgroundFluidLayer: {
					fillStyle: "#70b5ef",
					angularSpeed: 100,
					maxAmplitude: 15,
					frequency: 30,
					horizontalSpeed: 75
				}
			}
		});
}

var scrollTop = function () {
	if (platformIsMobile){
		$('.upButton')	
		.mousedown(function(event) { //animate press button, I use this method because animate.css is a conflict with translateY
			var $this = $(this);
			var speed = 50;
			var currentBottomProp = parseFloat($(this).css('bottom'));			
			
			$this
			.animate(
				{
					bottom: currentBottomProp-3+'px'
				},
				speed,
				function() {					
					$this.animate({bottom: currentBottomProp+'px'}, speed)
				}
			);
		})
		.click(function() {
			event.preventDefault();		
			$('html, body').animate({
				scrollTop: $('.header').offset().top
			}, 900);		
		});
	}
	else {
		$('.upButton')
		.hover(function() {
			$(this)
			.addClass('upButton-hover')
			.find('.fa-arrow-alt-circle-up')
			.removeClass('far')
			.addClass('fas');
		}, function() {
			$(this)
			.removeClass('upButton-hover')
			.find('.fa-arrow-alt-circle-up')
			.removeClass('fas')
			.addClass('far');
		})
		.click(function() {
			event.preventDefault();		
			$('html, body').animate({
				scrollTop: $('.header').offset().top
			}, 900);		
		});
	}	
}

/**************main block*******************/
$(window).on( 'load', function() {	
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();	
	var wSW = window.screen.width;
	var wDPR = window.devicePixelRatio;
	var windowOuterWidth = window.outerWidth;
	var windowOuterHeight = window.outerHeight;
	scrollTop();//handler for up button			
	mySkillsAnimation();
	projectDivSizeHandler(viewportWidth, viewportHeight, wDPR, windowOuterHeight, windowOuterWidth); //resize MySkills divs from window size	
	setParallaxImage(wSW, wDPR);
	$('.slider1').one('load', function(event) {
		windowSizeHandler(viewportWidth, viewportHeight); //resize main blocks according to window width	
		resizeHandler();
	  loaderScreen();
	 	zoomInHeader();	
		console.log( 'document loaded' );		
	});
});
