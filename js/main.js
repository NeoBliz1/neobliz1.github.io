'use strict';

jQuery.event.special.renewPage = {
  bindType: 'resize',
  delegateType: 'resize'
};

var zoomInHeader = function () {
	//zoom in main header
	$('.headerContent').addClass('zoomIn animated');
	//hide elements which will be animated
	$('.scrollAnimate').addClass('hidden');
}
/*use waypoint JQuery plugin for tracking scroll elements*/
var scrollAnimate = function () {
	var offsetNum=0;
	//offset from window top
	if ($(window).height() < 480) {
		offsetNum = '110%';		
	}
	else if (($(window).height() > 2000)) {
		offsetNum = '100%';		
	}
	else {
		offsetNum = '90%';
	};
	// console.log(offsetNum);
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
}
/*fadingOut loader screen*/
var loaderScreen = function () {
	$('.loader-gif').fadeOut('slow');
}



//set main elements width and height

var windowSizeHandler = function () {
	var $wWidth = $(window).width();
	$('body, .headerContent, .main').css('width', $wWidth);	
	//add parallax element	
	var pathToParllaxImg;
	if ($wWidth>0 && $wWidth<480){
		pathToParllaxImg = '../img/responsive_Img/cover_bg_3-small_size.png';
	}
	else if ($wWidth>=480 && $wWidth<=1500) {
		pathToParllaxImg = '../img/responsive_Img/cover_bg_3.png';
	}
	else {
		pathToParllaxImg = '../img/cover_bg_3.svg';
	}

	Waypoint.destroyAll() //remove all waypoints

	//initialize parallax script
	$('header, .mySkills').parallax({
		imageSrc: pathToParllaxImg,
		zIndex: 1
	});
	//initialize waypoints script
	scrollAnimate();	
}	


/*functions which handle MySkills areas divs
and applying zommIn animation on it*/
var $projectDiv = $('.projectDiv');	
var durationTime = 500;
var viewportWidth, viewportHeight, projectDivZoomInCoeff, projectDivWidth, projectDivHeight, vpbFontSize, vpbMarginValue;

var projectDivSizeHandler = function () { //function handle which window is on resize
	viewportWidth = $(window).width();
	viewportHeight = $(window).height();
	if (viewportWidth>=980) {
		projectDivZoomInCoeff = 1.3/viewportWidth;
	}
	else if (viewportWidth>=350){
		projectDivZoomInCoeff = 1.4/viewportWidth;
	}		
	else {
		projectDivZoomInCoeff = 1.2/viewportWidth;			
	}
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
	//set font-size property for view project button in scale state
	vpbFontSize = projectDivWidth*0.04;
	vpbMarginValue = projectDivWidth*0.03;
		//set buttons font-size		
		$('#rmb, #vpb').css('font-size', projectDivWidth*0.06);
		//set button vpb position parameters, except project_1 and 2 divs
		$projectDiv.not('.project_1, .project_2')
		.find('#vpb')
		.css({
			left: projectDivWidth*0.55,
			bottom: projectDivHeight*0.08
		});
	//set button vpb position parameters in project_2 div
	$('.project_2').find('#vpb')
	.css({
		left: projectDivWidth*0.55,
		bottom: projectDivHeight*0.1
	});
	//set paragraph size in project divs
	$('.paragraphMSD').css({
		'text-indent': projectDivWidth*0.02,
		'font-size': projectDivWidth*0.025		  
	});

	//handle clone div if it exist	
	if ( $('#cloneDiv').length ) {			
		$('#cloneDiv').find('#vpb')
		.css({
			'font-size': vpbFontSize				
		});
		$('.project_1 #cloneDiv').find('#vpb')
		.css({
			margin: vpbMarginValue
		});	
		$('#cloneDiv').center().scaleDivMax();
	}
}	

var mySkillsAnimation = function () {
	
	$($projectDiv).addClass('scrollAnimate hidden');	
	
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
							speed
							, function() {
								$(this).animate({bottom: currentBottomProp+'px'}, speed)
							}
						);
					})
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
		var divCurrentOffset = $(this).offset();			
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
	jQuery.fn.scaleCloseButton = function () {		
		this.css({
			'font-size': projectDivWidth*0.03,    	
    	bottom: projectDivHeight*1.02,
    	left: projectDivWidth*0.99,
    	'text-indent': 0
		});
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
		$cloneDiv.find('#rmb')
		.remove();

		$('.project_1 #cloneDiv').find('#vpb')
		.css({
			margin: vpbMarginValue
		});	
		//roll in "view project" button		
		$cloneDiv.find('#vpb')	
		.css({
			'font-size': vpbFontSize					
		})
		.rollInBtnAnimation();

		//taking current scroll pos
		var currentScroll = $(window).scrollTop();

		//add overlay div
		$('main .flex_box').append('<div id="fullSizeSkillBoxOverlay"></div>');		//adding overlay div to the end main div
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
		.center()
		.scaleDivMax();

		//show description 
		$cloneDiv.find('.paragraphMSD').removeClass('hidden')
		.hide()
		.fadeIn(DSdurationTime);

		//set close button font-size
		$('.closeButton').scaleCloseButton();

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
		});;
		
			
		//overlay click handler
		$('#fullSizeSkillBoxOverlay, .closeButton, #vpb').click(function(event) {
			/* Act on the event */			
			projectDivMinimize(this, currentDivOffset);
		});
		//scrolling to current position after hiding scroll bar
		$(window).on('scroll.fixedCurrentView', function() {					
			$(window).scrollTop(currentScroll);
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
	//add read more button to project divs
	$projectDiv.prepend('<button class="readMoreBtn hidden" id="rmb" type="button">read more</button>');
	windowSizeHandler(); //resize main blocks according to window width
	projectDivSizeHandler(); //resize MySkills divs from window size
	divHoverHandler();
	resizeHandler();
}
var resizeHandler = function (argument) {
	//resize handler
	var resizeTimer;
	$(window).on('renewPage', function(event) {		
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			windowSizeHandler();
			projectDivSizeHandler();
			//refresh parallax script
			$(window)
			.off('renewPage')
			.trigger('resize')			
			.trigger('scroll');			 	
			resizeHandler();	
		}, 250);
	});	
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

