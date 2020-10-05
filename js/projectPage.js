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
	'z-index': '2',
	position: 'absolute',
  top: '10px',
  right: '10px'
});




