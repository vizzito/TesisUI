$("#pattern_detector .panel").on('click',function(){
		console.log("se clickeo");
		$(this).children('.panel-collapse').toggleClass('collapse');
		$(this).children('.panel-collapse').toggleClass('collapse-in');
	});