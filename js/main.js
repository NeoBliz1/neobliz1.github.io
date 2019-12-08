'use strict';

function zoomInHeader () {
	//zoom in main header
	$(".headerContent").addClass('zoomIn animated');
	//hide elements which will be animated
	$('.scrollAnimate').addClass('hidden');
}
function scrollAnimate () {
	//use waypoint JQuery plugin for tracking scroll elements
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
function loaderScreen() {
	$('.loader-gif').fadeOut('slow');
}
$( document ).on('click','.123', function () {
		alert( "clicked" );
	});
/*main block */
$( window ).on( "load", function() {
  console.log( "document loaded" );
  loaderScreen();
  zoomInHeader();
	scrollAnimate ();
});
