//= require d3.js
//= require common_bundle.js
//= require popover

$("html,body").scrollTop();

var selectedFiles = [];

function isSelected(name) {
    for (var i = 0; i < selectedFiles.length; i++) {
        if (selectedFiles[i] == name) {
            return true;
        }
    }
    return false;
}
function loadRadialButton(){
debugger;
	$('#generarButtonRadial').click(function(event) {
		selectedFiles = [];
		debugger;
		var row = $('#files-table').find('tr');

//		for(i=0;i<row.length;i++){
//			if (row[i].hasClass('selected'))
//				selectedFiles.push(row[i]);
//		}

		$('#files-table tr').each(function(){
			if($(this).hasClass('selected'))
				{
				selectedFiles.push(this.innerText);
				}
			});

		//obtiene los archivos seleccionados del panel
		//filesMapToGenerate = getSelectedFiles(selectedFiles);

		$('.loading-indicator').hide();
		$(document).ajaxStart(function() {
			$('#myModal').show();
			$('#myModal').modal({backdrop: 'static',
					  keyboard: false,
					  show: true
			});
		}).ajaxStop(function() {
			$('#myModal').hide();
			$('#myModal').modal('hide');
		});


		var data = new FormData();
		data.append("bottomsimil", $('#sliderValLabel1').val());
		data.append("topsimil", $('#sliderValLabel2').val());
		var hasFiles = false;
		for(var i=0;i<files.length;i++){
			if(isSelected(files[i].name)){
				   data.append(i, files[i]);
				   hasFiles = true;

				}
		}
//		$.each(files, function(key, value)
//		{
//			
//	
//			if(isSelected(value.name)){
//			   data.append(key, value);
//			   hasFiles = true;
//			   console.log(value.name);
//			}
//		});
		if(hasFiles){
			$.ajax({
	            url: '/tree_generator#generate',
	            type: 'POST',
	            data: data,
	            cache: false,
	            dataType: 'json',
	            processData: false, // Don't process the files
	            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	            success: function(response) {
					         showRadial(75);
				    },
	            error: function(jqXHR, textStatus, errorThrown)
	            {
	            	console.log('ERRORS: ' + textStatus);
	            }
	        });
			}
		else{
			//show message, not files selected!!!
		}
	});
}


function showRadial(num){

var tension = num/100.0;
var diameter = 660,
    radius = diameter / 2,
    innerRadius = radius - 120;

var cluster = d3.layout.cluster()
    .size([360, innerRadius])
    .sort(null)
    .value(function(d) { return d.size; });

//Constructs a new default bundle layout
var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
    .interpolate("bundle")
    .tension(tension)
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

$("#panel-radial").html("");
var svg = d3.select("#panel-radial").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");


//var list = JSON.parse("/tmp/files/map.json");
//var request = new XMLHttpRequest();
//request.open("GET", "/tmp/files/map.json", false);
//request.send(null);
//var mapFiles = JSON.parse(request.responseText);

//esto se va a hacer dinamicamente desde la carga de los archivos de la UI
new mapperServices();
//////////////////////////////////////////////


d3.json("/tmp/files/datafile.json", function(error, classes) {
      var nodes = cluster.nodes(packages.root(classes)),
      links = packages.imports(nodes);

  link = link.data(bundle(links))
  .enter().append("path")
      .each(function(d) {
        d.source = d[0], d.target = d[d.length - 1];
        })
      .attr("class", "link")
      .attr("d", line);

  node = node
      .data(nodes.filter(function(n) { return !n.children; }))
    .enter().append("text")
      .attr("class", "node")
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")" + (d.x < 180 ? "" : "rotate(180)"); })
      .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .text(function(d) { return d.key; })
      .on("mouseover", mouseovered)
      .on("mouseout", mouseouted);

});

function mouseovered(d) {
    mapServices.serviceName = d.name;
    node
      .each(function(n) { n.target = n.source = false; });

    link
      .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
      .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
      .filter(function(l) { return l.target === d || l.source === d; })
      .each(function() { this.parentNode.appendChild(this); });

    node
      .classed("node--target", function(n) { return n.target; })
      .classed("node--source", function(n) { return n.source; });

    var serviceName = mapServices.serviceName;
    var fileName = mapServices.fileName;
    var fileRoute = mapServices.fileRoute;
    if (mapServices.map != null) {
        mapServices.fileName = mapServices.map[serviceName][0];
        mapServices.fileRoute = mapServices.map[serviceName][1];
        $("#FirstDiv").text(serviceName);
        $("#SecondDiv").text(fileName);
        $("#ThirdDiv").text(fileRoute);

        /*$(this).popover({

            trigger : 'click',
            animation : true,
            delay : 0,
            title : serviceName + '<button type="button" class="close" onclick="$(&quot;body>.popover&quot;).hide();">&times;</button>',
            html: 'true',
            content : function() {
                return $('#popover_content_wrapper').html();
            },
            container : $("body")
        });  */

        var nameHTML = "<div><strong>Service Name:</strong> " + serviceName + "</div>";
        var fileHTML = "<div><strong>Service File:</strong> " + fileName + "</div>";
        var pathHTML = "<div><strong>Service Path:</strong> <small>" + fileRoute.split('/').join(' / ') + "</small></div><hr/>";
        var verWSDLButtonHTML = '<button class="btn btn-success btn-xs" data-toggle="modal" data-target="#modalWSDLFile">Ver ' + fileName + '</button>';

        $("#ServiceData").empty();
        $("#modalWSDLFileTitle").empty();

        $("#modalWSDLFileTitle").append(serviceName);
        $("#ServiceData").append(nameHTML);
        $("#ServiceData").append(fileHTML);
        $("#ServiceData").append(pathHTML);
        $("#ServiceData").append(verWSDLButtonHTML);
    }

	}

	function mouseouted(d) {
	  link
	      .classed("link--target", false)
	      .classed("link--source", false);

	  node
	      .classed("node--target", false)
	      .classed("node--source", false);
	}

d3.select(self.frameElement).style("height", diameter + "px");
}