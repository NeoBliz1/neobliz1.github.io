'use strict';

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
	var viewportWidth =  $(window).width();
	if (viewportWidth>=440) {
		$('body').css('width', viewportWidth);
	} 
	else {
		$('body').css('width', '440px');
	}	
}	



windowSizeHandler(); //resize main blocks according to window width
//resize handler
var resizeTimer;
$(window).resize(function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		windowSizeHandler();		
	}, 250);
});



