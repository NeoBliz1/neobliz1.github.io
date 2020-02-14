'use strict';

/*fadingOut loader screen*/
var loaderScreen = function () {
	$('.loader-gif').fadeOut('slow');
}

var createCodeSnippet = function () {
	var scriptText;
	$.get('https://res.cloudinary.com/deah4rwon/raw/upload/v1581477877/js/code_project3_xurmh5.txt', function (response) {
    scriptText = response;

    $('.snippetWrapper').html(scriptText);
	});	
}
/**************main block*******************/
$( window ).on( 'load', function() {
  console.log( 'document loaded' );
  loaderScreen();
  createCodeSnippet();	
});
