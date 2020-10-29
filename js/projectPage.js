'use strict';

jQuery.event.special.renewPage = {
  bindType: 'resize',
  delegateType: 'resize'
};

/*fadingOut loader screen*/
var loaderScreen = function () {
	$('.loader-gif').fadeOut('slow');
}


/**************main block*******************/
$( window ).on( 'load', function() {
  console.log( 'document loaded' );
  loaderScreen();  
});

$('.smallCanvas').prepend('<div class="home_container"><a href="../index.html"><div class="go_home"></div></a></div>');
$('.home_container').css({
	'z-index': '3',
	position: 'absolute',
  top: '10px',
  right: '10px'
});


var windowSizeHandler = function () {
	var $wWidth = $(window).width();		
	//add parallax element	
	var pathToParllaxImg;
	if ($wWidth>0 && $wWidth<480){
		pathToParllaxImg = '../img/responsive_Img/cover_bg_3-small_size.png';
		$('body').css('width', '440px');
	}
	else if ($wWidth>=480 && $wWidth<=1500) {
		pathToParllaxImg = '../img/responsive_Img/cover_bg_3.png';
		$('body').css('width', $wWidth);
	}
	else {
		pathToParllaxImg = '../img/cover_bg_3.svg';
		$('body').css('width', $wWidth);
	}
	
	//initialize parallax script
	$('.smallCanvas').parallax({
		imageSrc: pathToParllaxImg,
		zIndex: 1
	});

};



windowSizeHandler(); //resize main blocks according to window width

//resize handler
var resizeHandler = function () {	
	//resize handler
	var resizeTimer;
	$(window).on('renewPage', function() {		
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			windowSizeHandler();			
			//refresh parallax script
			$(window)
			.off('renewPage')
			.trigger('resize')			
			.trigger('scroll');			 	
			resizeHandler();	
		}, 250);
	});	
}

resizeHandler();


