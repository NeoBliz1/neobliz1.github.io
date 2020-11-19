'use strict';

// jQuery.event.special.renewPage = {
//   bindType: 'resize',
//   delegateType: 'resize'
// };

/*fadingOut loader screen*/
var loaderScreen = function () {
	$('.loader-gif').fadeOut('slow');
}


$('.smallCanvas').prepend('<div class="home_container"><a href="../index.html"><div class="go_home"></div></a></div>');
$('.home_container').css({
	'z-index': '3',
	position: 'absolute',
  top: '10px',
  right: '10px'
});


var windowSizeHandler = function () {
	var $wWidth = $(window).width();
	var $canvasHSWidth = $('#canvasHolderSmall').width();		
};

//resize handler
var resizeHandler = function () {	
	//resize handler
	var resizeTimer;
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		windowSizeHandler();					
	}, 250);
	
}

/**************main block*******************/
$( window ).on( 'load', function() {
  console.log( 'document loaded' );
  loaderScreen(); 
  windowSizeHandler(); //resize main blocks according to window width
	resizeHandler();
});


