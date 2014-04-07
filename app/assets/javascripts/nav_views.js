var files = [];
function loadNav(){
	$("#slidertwo").slider();
	$('#slidertwo').on('slide', function(ev) {
		$("#sliderValLabel1").val(ev.value[0]);
		$("#sliderValLabel2").val(ev.value[1]);
	});
	
$("#inverted_nav").on('click',function(){
	console.log("llama");
	callAjax('inverted_radial_layout');
});
$("#bundle_nav").on('click',function(){
	console.log("llama");
 	callAjax('bundle_layout');
});
$("#tree_nav").on('click',function(){
	console.log("llama");
	callAjax('tree_layout');
});
$("#rotate_nav").on('click',function(){
	console.log("llama");
	callAjax('rotate_cluster_layout');
});
$("#collapse_nav").on('click',function(){
	console.log("llama");
	callAjax('collapse_tree_layout');
});
}
function callAjax(url){
  $.ajax({
            url: url,
            type: 'GET',            
            success: function(response) {    	 
            			console.log(response);
				         $("#content").html(response);
			    },
            error: function(jqXHR, textStatus, errorThrown)
            {
            	console.log('ERRORS: ' + textStatus);
            }
        });
}
