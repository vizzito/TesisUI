var files = [];

//initialize the view on load page
showAnimation = false;
callAjax('inverted_radial_layout');

function loadNav() {
	$("#slidertwo").slider();
	$('#slidertwo').on('slide', function(ev) {
		$("#sliderValLabel1").val(ev.value[0]);
		$("#sliderValLabel2").val(ev.value[1]);
	});

	$("#inverted_nav").on('click', function() {
		showAnimation = false;
		callAjax('inverted_radial_layout');
	});
	$("#bundle_nav").on('click', function() {
		showAnimation = false;
		callAjax('bundle_layout');
	});
	$("#tree_nav").on('click', function() {
		showAnimation = false;
		callAjax('tree_layout');
	});
	$("#rotate_nav").on('click', function() {
		showAnimation = false;
		callAjax('rotate_cluster_layout');
	});
	$("#collapse_nav").on('click', function() {
		showAnimation = false;
		callAjax('collapse_tree_layout');
	});

	$("#inverted_image").on('click', function() {
		showAnimation = false;
		callAjax('inverted_radial_layout');
	});
	$("#bundle_image").on('click', function() {
		showAnimation = false;
		callAjax('bundle_layout');
	});
	$("#tree_image").on('click', function() {
		showAnimation = false;
		callAjax('tree_layout');
	});
	$("#rotate_image").on('click', function() {
		showAnimation = false;
		callAjax('rotate_cluster_layout');
	});
	$("#collapse_image").on('click', function() {
		showAnimation = false;
		callAjax('collapse_tree_layout');
	});
}
function callAjax(url) {
	$.ajax({
		url : url,
		type : 'GET',
		success : function(response) {
			showAnimation = true;
			$("#content").empty();
			$("#content").html(response);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log('ERRORS: ' + textStatus);
		}
	});
}
