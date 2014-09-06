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

function callDetectorService(files) {
	$.ajax({
		url : 'anti_pattern_detector',
		data : {files : files},
		type : 'POST',
		success : function(response) {
			console.log(response);
			showChartDetectorService();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log('ERRORS: ' + textStatus);
		}

	});
}
function showChartDetectorService() {
	var data = new FormData();
	$.ajax({
		url : 'show_info_chart_detector',
		type : 'POST',
		success : function(response) {
			
			$("#chart-pattern-content").html(response);
			console.log(response);
		},
		error : function(response) {
			
			$("#chart-pattern-content").html(response.responseText);
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
			
			$("#single-chart").html(response.responseText);
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

function generateTreeParams(view, tension) {
	
	var data = new FormData();
	var selectedFiles = getSelectedFiles();
	
	message = 0;
	data.append("bottomsimil", $('#sliderValLabel1').val());
	data.append("topsimil", $('#sliderValLabel2').val());
	var hasFiles = false;
	for (var i = 0; i < files.length; i++) {
		if (isSelected(files[i].name,selectedFiles)) {
			data.append(i, files[i]);
			hasFiles = true;
		}
	}
	if (hasFiles) {
		showAnimation = true;
		callDetectorService(selectedFiles);
		
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
				$('#myModal').hide();
				$('#myModal').modal('hide');
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
				console.log('ERRORS: ' + textStatus);
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

$(document).ajaxStart(function() {

	if (showAnimation) {
		$('#myModal .modalMessage').text(modalMessage[message]);
		$('#myModal').show();
		$('#myModal').modal({
			backdrop : 'static',
			keyboard : false,
			show : true
		});
	}
}).ajaxStop(function() {
	$('#myModal').hide();
	$('#myModal').modal('hide');
	showAnimation = false;
});

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
