var showAnimation = true;
var modalMessage = ["Generating hierarchy tree ...","Detecting Anti Patterns ..."];
var message = 0;
function isSelected(name, files) {
    for (var i = 0; i < files.length; i++) {
        if (files[i] == name) {
            return true;
        }
    }
    return false;
}
function animateNumberCluster(numberCluster){
	$("#clusterNumber:input").val(numberCluster);
	originalColor = $("#clusterNumber:input").css("background");
	 $("#clusterNumber:input").animate({
          backgroundColor: "#FFF521",
        }, 1000 ,function(){
        	$("#clusterNumber:input").animate({
		          backgroundColor: originalColor,
		        }, 4000);
	    });
}
function getSelectedFiles() {
	var selectedFiles = [];
	var row = $('#files-table').find('tr');
	$('#files-table tr').each(function() {
		if ($(this).hasClass('selected')) {
			selectedFiles.push(this.innerText);
		}
	});
	return selectedFiles;
}


function showChartDetectorService() {
	var data = new FormData();
	$.ajax({
		url : 'show_info_chart_detector',
		type : 'POST',
		success : function(response) {

			$("#tot-chart").html(response);
		//	$("#single-chart").html(response);
			console.log(response);
		},
		error : function(response) {
			$("#tot-chart").html(response);
			//$("#single-chart").html(response);
		}

	});
}




function showSingleChartDetectorService() {
	var data = new FormData();
	$.ajax({
		url : 'show_single_info_chart_detector',
		type : 'POST',
		success : function(response) {

			$("#single-chart").html(response);
			console.log(response);
		},
		error : function(response) {
			$("#single-chart").html(response);
		}

	});
}


function showDetectorService(file) {
	var data = new FormData();
	data.append("fileName", file);
	$.ajax({
		url : 'show_anti_pattern_detector',
		data : data,
		dataType : 'json',
		type : 'POST',
		processData : false, // Don't process the files
		contentType : false, // Set content type to false as jQuery will
		success : function(response) {

			$("#anti-pattern-content").html(response);
			console.log(response);
		},
		error : function(response) {

			$("#anti-pattern-content").html(response.responseText);
		}

	});
}

function callDetectorService(files) {
	var data = new FormData();
	for (var i = 0; i < files.length; i++) {
			data.append(i, files[i]);
	}
 message = 1;
	showPopup();
	$.ajax({
		url : 'anti_pattern_detector',
		//data : {files : files},
		type : 'POST',
		data : data,
		cache : false,
		dataType : 'json',
		processData : false, // Don't process the files
		contentType : false, // Set content type to false as jQuery will
		// tell the server its a query string
		// request
		headers : {
			'Cache-Control' : 'max-age=0'
		},
		//dataType: 'JSON',
		success : function(response) {
			console.log(response);
			showChartDetectorService();
			hidePopup();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log('ERRORS: ' + textStatus);
			showChartDetectorService();
			hidePopup();
		}

	});
}

function generateTreeParams(view, tension) {
	var data = new FormData();
	var selectedLeftFiles = getSelectedFiles();
	var selectedFiles = [];
	var originalNumberCluster = $('input[name=clusterNumber]').val();
	message = 0;
	data.append("bottomsimil", $('#sliderValLabel1').val());
	data.append("topsimil", $('#sliderValLabel2').val());
	data.append("clusteringstrategy",$('input[name=cluster]:checked').val());
	data.append("numberofclusters",originalNumberCluster);
	var hasFiles = false;
	for (var i = 0; i < files.length; i++) {
		if (isSelected(files[i].name,selectedLeftFiles)) {
			data.append(i, files[i]);
			selectedFiles.push(files[i]);
			hasFiles = true;
		}
	}
	if (hasFiles) {
		showAnimation = true;
		showPopup();
		$.ajax({
			url : '/tree_generator#generate',
			type : 'POST',
			data : data,
			cache : false,
			dataType : 'json',
			processData : false, // Don't process the files
			contentType : false, // Set content type to false as jQuery will
			// tell the server its a query string
			// request
			headers : {
				'Cache-Control' : 'max-age=0'
			},
			success : function(response) {
				hidePopup();
				if(response.numberCluster!=originalNumberCluster){
					animateNumberCluster(response.numberCluster);
				}
				callDetectorService(selectedFiles);
				showAnimation = false;
				setMapperServices();
				switch (view) {
				case "radial":
					showRadial(tension);
					break;
				case "bundle":
					showBundle();
					break;
				case "collapse":
					showCollapse();
					break;
				case "rotate":
					showRotateCluster();
					break;
				case "tree":
					showTree();
					break;
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log('ERRORS: ' + textStatus + " | ERROR: " + errorThrown);
			}
		});
	} else {
		showAnimation = false;
		$('#message-content').animate({
			opacity : 1
		}, 0.6);
		$("#message-content").fadeIn('slow').delay(2000).fadeOut('slow');

	}

}
$("#message-content").on('hide', function() {
	$("#message-content").hide();
});
$('.loading-indicator').hide();



function showPopup(){
//	//	$('#myModal').modal();
	$('#myModal .modalMessage').text(modalMessage[message]);
	$('#myModal').modal({
		backdrop : 'static',
		keyboard : false,
		show : true
	});
//		
//		
		$('#myModal').modal('show');
}
function hidePopup(){
//	$('#myModal').modal({
//		backdrop : false,
//		keyboard : true,
//		show : false
//	});
	$('#myModal').modal('hide');
}
$('#tab5 i').click(function (e) {
	showChartDetectorService();
});

//$(document).ajaxStart(function() {
//
//	if (showAnimation) {
//		
//		$('#myModal').modal({
//			backdrop : 'static',
//			keyboard : false,
//			show : true
//		});
//		$('#myModal').show();
//		$('#myModal .modalMessage').text(modalMessage[message]);
//	}
//}).ajaxStop(function() {
//		
//		$('#myModal').modal({
//		//	backdrop : 'static',
//			keyboard : false,
//				show : false
//				}
//				);
//		$('#myModal').hide();
//		showAnimation = false;
//});

var packages = {

	// Lazily construct the package hierarchy from class names.
	root : function(classes) {
		var map = {};

		function find(name, data, realname) {
			var node = map[name], i;
			if (!node) {
				node = map[name] = data || {
					// name : realname,
					name : name,
					children : []
				};
				if (name.length) {
					node.parent = find(name.substring(0, i = name
							.lastIndexOf(".")), null, realname);
					node.parent.children.push(node);
					node.key = realname;
				}
			}
			return node;
		}

		classes.forEach(function(d) {
			find(d.nameKey, d, d.name);
		});

		return map[""];
	},

	// Return a list of imports for the given array of nodes.
	imports : function(nodes) {
		var map = {}, imports = [];

		// Compute a map from name to node.
		nodes.forEach(function(d) {
			map[d.nameKey] = d;
		});

		// For each import, construct a link from the source to target node.
		nodes.forEach(function(d) {
			if (d.imports)
				d.imports.forEach(function(i) {
					imports.push({
						source : map[d.nameKey],
						target : map[i]
					});
				});
		});

		return imports;
	}
};
