'use strict';
//srt named event for refresh parallax imgs
jQuery.event.special.renewPage = {
	bindType: 'resize',
	delegateType: 'resize'
};

//checking browser and platform
var platformIsMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));})(navigator.userAgent||navigator.vendor||window.opera);
var orientationIsChange = false;
if (platformIsMobile) {
	$(window).on( 'orientationchange', function( event ) {
		$('.loader-gif').css('display', 'initial');
		orientationIsChange = true;
		// console.log(orientationIsChange);
	});
}

var zoomInHeader = function () {
	//zoom in main header
	$('.headerContent').addClass('zoomIn animated');
	//hide are elements which will be animated
	$('.scrollAnimate').addClass('hidden'); 
}
var fluidMeterRestart = function () {
	doAnim = true;//global anim variable
	htmlFM.restart();
	cssFM.restart();
	jsFM.restart();
	jQueryFM.restart();
	pythonFM.restart();
	// console.log('anim start')
}

this.doAnim = false;
/*use waypoint JQuery plugin for tracking scroll elements*/
var controller = [];
var scenesArr = [];
var iScrollArr = [];
var upButtonScene;
var scrollAnimate = function (viewportHeight, refreshOffset) {  
	// console.log(viewportHeight*0.48*(-1))
	var scrollEventOffset = viewportHeight*0.48*(-1); 
	if (!refreshOffset){
		// console.log('magick scroll initialize');     
		$('.scrollAnimate, .fluidMeter').addClass('animated')
		.each(function(index, el) {
			var stickyId = 'myStickyEl'+index;
			// scenesArr.push('scene'+index);   
			var $this = $(this);
			$this.attr('id', stickyId);

			controller[index] = new ScrollMagic.Controller();
			// create a scene 
			scenesArr[index] = new ScrollMagic.Scene()
			.addTo(controller[index]);

			scenesArr[index].triggerElement('#'+stickyId)
			.offset(scrollEventOffset)
			.duration(100)
			.on('start', function (event) {       
				if (event.scrollDirection === 'FORWARD') {
					if ($this.hasClass('hidden')){
						$('#'+stickyId)
						.removeClass('hidden fadeOutDown')
						.addClass('fadeInUp slow');
					}       
					if ($this.hasClass('fluidMeter') && !doAnim) {
						fluidMeterRestart();
					}
				}
				else {        
					if ($this.hasClass('fluidMeter') && doAnim) {
						doAnim = false;//global anim variable
						// console.log('anim end')
					}
				}     
			});
			if ($this.hasClass('fluidMeter')) {
				var FMsceneDuration = $(window).height() + $this.height();
				scenesArr[index]
				.duration(FMsceneDuration)
				.on('end', function(event) {        
					if (doAnim && event.scrollDirection === 'FORWARD'){
						doAnim = false;//global anim variable       
						// console.log('anim end')
					}
					else if (!doAnim) {
						fluidMeterRestart();
					}       
				});
			}       
		});

		// init controller
		var upButtonController = new ScrollMagic.Controller();
			// create a scene 
		upButtonScene = new ScrollMagic.Scene() 
		.addTo(upButtonController);
		
		var $upButton = $('.upButton');
		upButtonScene
		.triggerElement(window)
		.offset($(window).height() + $upButton.height())
		.duration(100)
		.on('start', function (event) {         
			if (event.scrollDirection === 'FORWARD') {
				// console.log(event.scrollDirection);  
				$upButton
				.removeClass('hidden fadeOutDown')
				.addClass('fadeInUp slow');     
			}
			else {
				// console.log(event.scrollDirection);  
				$upButton
				.removeClass('fadeInUp slow')
				.addClass('fadeOutDown');     
			}     
		}); 
	}
	else if (refreshOffset) {       
		for(var i = 0, length1 = scenesArr.length; i < length1; i++){
			scenesArr[i].offset(scrollEventOffset);     
		}
		upButtonScene.offset(scrollEventOffset);
		// console.log('offset is update');
	}
}

/*fadingOut loader screen*/
var loaderScreen = function () {
	$('.loader-gif').css('display', 'initial').fadeOut('slow'); 
}

//set parallax img attributes
var setParallaxImage = function (wSW, wDPR) { 
	var pathToParllaxImg;
	var pathToThmbImg;  
	var setImgPassway = function () {
		$('.blizThumbnail').css('background-image', 'url('+pathToThmbImg+')');  
		$('.slider1, .slider2').attr('src', pathToParllaxImg);
	}
	if (wSW >= 2400) {
		var cover_bgUrl = 'https://res.cloudinary.com/deah4rwon/image/upload/v1607826257/imgs/responsive_Img/cover_bg_3-4k_oji9x8.png';
		$.ajax({
			url:cover_bgUrl,
			type:'HEAD',
			error: function(){
				pathToParllaxImg = '../img/cover_bg_3.png';
				setImgPassway();
				console.log('img is not available');    
			},
			success: function(){
				pathToParllaxImg = cover_bgUrl;
				setImgPassway();
				console.log(' img available');
			}
		});
		pathToThmbImg = '../img/thmb.png';  
		console.log(pathToParllaxImg);
	}
	else if ( wSW >= 1800 && wDPR >= 0.25 && wDPR < 3) {
		pathToParllaxImg = '../img/cover_bg_3.png';
		pathToThmbImg = '../img/thmb.png';
		setImgPassway();
	}
	else if (wSW < 1800 && wSW >=640 && wDPR >= 3) {
		pathToParllaxImg = '../img/responsive_Img/cover_bg_3.png';
		pathToThmbImg = '../img/responsive_Img/thmb_small.png';
		setImgPassway();
	}
	else {
		pathToParllaxImg = '../img/responsive_Img/cover_bg_3_small.png';
		pathToThmbImg = '../img/responsive_Img/thmb_small.png'; 
		setImgPassway();      
	}   
}

var $projectDiv = $('.projectDiv'); 
var durationTime = 500;
var viewportWidth, viewportHeight, projectDivZoomInCoeff, projectDivWidth, projectDivHeight;
var projectDivFullSizeState = false;

/*functions which handling MySkills areas divs
and applying zommIn animation on it*/
var DSdurationTime = 500;//div skill full size animation duration time


var mySkillsAnimation = function () {
	
	$($projectDiv).addClass('scrollAnimate hidden');  
	var zoomInAnimation = function (thisIs){
		durationTime=500;
		var viewportWidth = $(window).width();
		$(thisIs).removeClass('fadeInUp')
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
					var $btns;
					if (platformIsMobile && viewportWidth < 1000) {
						$btns = $(thisIs).find('a');            
					}
					else {
						$btns = $(thisIs).find('button, a');            
					}         
					$btns
					.rollInBtnAnimation()
					.mousedown(function(event) { //animate press button, I use this method because animate.css is a conflict with translateY
						var speed = 50;
						var currentBottomProp = parseFloat($(this).css('bottom'));
						var currentBottomPropD = currentBottomProp;
						$(this).animate({
								bottom: currentBottomPropD-3+'px'
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
						if (event.currentTarget.id==='vpb') {             
							if ($(thisIs).hasClass('project_1')){
								event.preventDefault();
								$('.upButton').trigger('click');
							}             
							$('.hovered').trigger('mouseleave');              
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
					var $btns;
					if (platformIsMobile && viewportWidth < 1000) {
						$btns = $(thisIs).find('a');
					}
					else {
						$btns = $(thisIs).find('button, a');
					}
					$btns
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

	//scaling project div for more description, sensitive to resize event
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

		if ($cloneDiv.hasClass('project_1')) {
			$cloneDiv.find('#vpb').click(function(event) {
				event.preventDefault()
				$('.upButton').trigger('click');
			});     
		} 

		//add overlay div
		$('body').append('<div id="fullSizeSkillBoxOverlay"></div>');   //adding overlay div to the end main div
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
		
		$projectDiv.off('mouseenter mouseleave vmouseover vmouseout');//shutdown mouse event handler from skills divs
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
		$projectDiv
		.hover(function() {
			/* Stuff to do when the mouse enters the element */
			var thisIs = this;          
			zoomInAnimation(thisIs);
			if (platformIsMobile) {
				var divCurrentHeight = $(thisIs).outerHeight();
				var viewportHeight = $(window).height();
				var currentDivOffset = $(thisIs).offset();
				var windowScrollTo = currentDivOffset.top;
				var targetTopOffset = Math.max(0, (windowScrollTo - (viewportHeight - divCurrentHeight) / 2));//defining the target position from the div top to the viewport 
				$('html, body').animate({
					scrollTop: targetTopOffset
				}, DSdurationTime);   
				if ($(thisIs).hasClass('project_1')){
					$('.examplesContainer').css('overflow', 'visible');
				}
				$(thisIs).addClass('hovered');
				if ($(window).width() < 1000){
					$(thisIs) 
					.find('.paragraphMSD')
					.removeClass('hidden')
					.hide()
					.fadeIn(DSdurationTime);
				}       
			}                 
		}, function() {   
			/* Stuff to do when the mouse leaves the element */
			var thisIs = this;
			zoomOutAnimation(thisIs);
			if (platformIsMobile) {
				if ($(thisIs).hasClass('project_1')){
					$('.examplesContainer').css('overflow', 'hidden');
				}
				$(thisIs).removeClass('hovered')
				.find('.paragraphMSD')
				.fadeOut(DSdurationTime);
			}       
		});
		if (platformIsMobile) {
			// console.log('swipe1');
			$('.examplesContainer').on('scrollstart', function(event) {
				// console.log('swipe');
				$('.hovered').trigger('mouseleave');
			});
		}   
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
		//main resize part    
		var viewportWidth = $(window).width();
		var viewportHeight = $(window).height();
		var wSW = window.screen.width;
		var wDPR = window.devicePixelRatio;     
		// console.log(wDPR);
		// console.log(viewportHeight);     
		var currBrowserWidth = window.outerWidth;
		var currBrowserHeight = window.outerHeight;     
		var bWratio = browserInitialWidth/currBrowserWidth;
		var bHratio;
		if(platformIsMobile){
			bHratio = 1;
		}
		else {
			bHratio = windowOuterHeight/currBrowserHeight;  
		}       
		// console.log('viewportHeight' + viewportHeight);
		// console.log('windowOuterHeight'+windowOuterHeight, 'currBrowserHeight'+currBrowserHeight);
		// console.log(bWratio, bHratio);
		windowSizeHandler(viewportWidth, viewportHeight);
		scrollAnimate(viewportHeight, true);    
		if(platformIsMobile && orientationIsChange || bWratio !== 1 || bHratio !== 1){
			browserInitialWidth = currBrowserWidth;
			windowOuterHeight = currBrowserHeight;
			$('#tMessageDialog').dialog('close');//close current message dialog     
			projectDivSizeHandler(viewportWidth, viewportHeight, wDPR, windowOuterHeight, browserInitialWidth);
			cloneDivSizeHandler(viewportHeight, viewportWidth);
			tMessageDialogBox();
			// console.log('font and divs resize is happend');        
		}       
		setParallaxImage(wSW, wDPR);
		$('.slider1').one('load', function(event) {
			if (!platformIsMobile || orientationIsChange) {
				loaderScreen();
				orientationIsChange = false;
			}       
			// console.log('windowSizeHandler finished');
			$(window)
			.off('renewPage')
			.trigger('resize');
			resizeHandler();        
			// console.log('renewPage is finished');  
		});               
	});   
}
//this function is sensitive to resize event
var windowSizeHandler = function (viewportWidth, viewportHeight) {
	//set main elements width and height
	$('body, .headerContent, .main').width(viewportWidth);

	var FMheight = $('.fluidMeterContainer1').height();
	$('.mySkills').height(FMheight*1.2);
	// console.log(FMheight*1.2);
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
		height: headerOverlayHeight,
		'will-change': 'auto'     
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
//this function is sensitive to resize event
var projectDivSizeHandler = function (viewportWidth, viewportHeight, wDPR, windowOuterHeight, windowOuterWidth) { //function handle which window is on resize
	var fontScaleCoeff, blizThumbnailScaleCoeff;
	if (platformIsMobile){
		if (viewportWidth > viewportHeight) {
			fontScaleCoeff = viewportWidth*1.2;
			blizThumbnailScaleCoeff = viewportWidth*0.7;      
		}
		else {
			fontScaleCoeff = viewportHeight*1.2;
			blizThumbnailScaleCoeff = viewportHeight;
		}
	}
	else {
		if (viewportWidth > viewportHeight) {
			// console.log(viewportWidth);
			if (viewportWidth < 1000){
				fontScaleCoeff = viewportWidth;
				blizThumbnailScaleCoeff = viewportWidth;
			}
			else {
				fontScaleCoeff = 1000;
				blizThumbnailScaleCoeff = 1000;
			}           
		}
		else {
			fontScaleCoeff = viewportHeight;
			blizThumbnailScaleCoeff = viewportHeight;
		}
	}   

	//set thumbnail size in px;
	$('.blizThumbnail').width(blizThumbnailScaleCoeff*0.3).height(blizThumbnailScaleCoeff*0.3); 
	//set responsive size for social networks logos 
	$('.logo_prop').width(blizThumbnailScaleCoeff*0.08).height(blizThumbnailScaleCoeff*0.08); 
	//set responsive font-size
	$('h1').each(function(index) {      
		var elFontSize = fontScaleCoeff*0.025;
		$(this).css('font-size', elFontSize); //set font size in pixels
	})
	.filter('.mainHeader')
	.css('font-size', fontScaleCoeff*0.04);

	$('h2').each(function(index) {
		var elFontSize = fontScaleCoeff*0.02;
		$(this).css('font-size', elFontSize); //set font size in pixels
	});

	$('p, a').each(function(index) {
		var elFontSize = fontScaleCoeff*0.018;
		$(this).css('font-size', elFontSize); //set font size in pixels
	});
	//upButton size handler
	var upButtonFontSize = fontScaleCoeff*0.045;
	$('.upButton').css({
		'font-size': upButtonFontSize,    
		height: 'auto',   
		width: '-moz-min-content',
		'padding': fontScaleCoeff*0.005,        
		'padding-bottom': 'initial',    
		// bottom:  fontScaleCoeff*0.04,
		right:  fontScaleCoeff*0.04
	});
	//messageButton size handler
	var messageButtonFontSize = fontScaleCoeff*0.04;
	$('.messageButton').css({
		'font-size': messageButtonFontSize,   
		width: messageButtonFontSize*1.5,   
		height: messageButtonFontSize*1.5,
		'padding-top': fontScaleCoeff*0.005,        
		'padding-bottom': 'initial',    
		// bottom:  fontScaleCoeff*0.04,
		left:  fontScaleCoeff*0.04
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
	// console.log('project div is done');
	// console.log('platformIsMobile '+platformIsMobile);
	// console.log(fontScaleCoeff, blizThumbnailScaleCoeff);
	// console.log('viewportHeight' + viewportHeight);
	// console.log('windowOuterHeight'+windowOuterHeight);  
} 
//this function is sensitive to resize event
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
//handler for tMessage box
//this function is sensitive to resize event
var tMessageDialogBox = function () {
	var titleFontSize, messagesFontSize, robotFontsize;
	var targetWidth = $('.messageButton').width();
	var targetHeight = $('.messageButton').height();
	// console.log(targetHeight)
	if (platformIsMobile){
		targetWidth*=5;
		targetHeight*=3;        
	}
	else {
		targetWidth*=8;
		targetHeight*=7;
	}
	// console.log(targetHeight)
	titleFontSize = targetHeight*0.06;
	messagesFontSize = titleFontSize*0.8;
	robotFontsize = targetHeight*0.1;

	//initizlize dialog widget
	var $tMessageDialog = $('#tMessageDialog');	
	// console.log($tMessageDialog.dialog('instance'));
	if ($tMessageDialog.dialog('instance') === undefined) {
		// console.log('t box initialized');
		$tMessageDialog.dialog({
			position: { my: 'left bottom', at: 'left bottom-110%', of: '.messageButton' },
			width: targetWidth,
			height: targetHeight,
			resizable: true,
			autoOpen: false,
			show: {
				effect: 'blind',
				direction: 'down', 
				duration: DSdurationTime
			},
			hide: {
				effect: 'blind',
				direction: 'down',            
				duration: DSdurationTime
			}
		});		
		var chatUpdateTimer;
		var updateChat = function () {
			$.ajax({
				type: 'GET',
				url: 'https://t-msg-bot.space/get_msg',
				crossDomain:true,
				success: function(data) {
					console.log(data)
				}
			});			 
		}
		$('.ui-dialog').on( 'dialogclose', function( event, ui ) {
			clearInterval(chatUpdateTimer);//stop update chat when the dialog is closed
			console.log('clearInterval')
		} )
		.on( 'dialogopen', function( event, ui ) {
			chatUpdateTimer = setInterval( function() {
				updateChat()
			  // console.log('startInterval');
			}, 5000);
		} )		
		.on('resize', function (e) {
			// console.log('stop prop');
			$('#tMessageDialog').css('width', $(this).width());
			e.stopPropagation(); 
		});
		//toggle message box view
		$('.messageButton').click(function(event) {
			var isOpen = $tMessageDialog.dialog( "isOpen" );
			if (isOpen) {
				$tMessageDialog.dialog('close');
			}
			else {
				$tMessageDialog.dialog('open');				
			}
		});
		//send message
		$('.sendBtn').click(function(event) {
			event.preventDefault();
			var formDate = JSON.stringify($('form').serializeArray());
			// $.post('https://t-portfolio-message-bot.herokuapp.com/getmsg/', formDate);     
			$.ajax({
				type: 'POST',
				url: 'https://t-msg-bot.space/post_msg',
				data: formDate,
				crossDomain:true,
				success: function(data) {
					console.log(data)
				}
			});			 
		});		
	}
	
	$('.sendBtn').css('font-size', titleFontSize);

	// prevents triggering to resize the entire page	
	$('.ui-dialog')
	.css('position', 'fixed')
	.find('.ui-dialog-titlebar')
	.css({
		'font-size': titleFontSize,
		'margin-top': '-20px',
		'margin-left': '10px',
		'margin-right': '10px'
	});

	$('.ui-dialog').find('.thought, label, input, textarea')
	.css('font-size', messagesFontSize);

	$('.fa-robot').css({
		'font-size': robotFontsize
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
//handler for scroll top button
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
		scrollAnimate(viewportHeight, false);//scroll handler for divs
		loaderScreen();
		zoomInHeader();
		tMessageDialogBox(viewportWidth, viewportHeight);//handler for tMessage box
		console.log( 'document loaded' );   
	});
});
