//= require d3.js
//= require common_bundle.js
//= require bootstrap-slider
//= require popover
//var serviceName = "default";
function loadRadialButton(){

	$('#generarButtonRadial').click(function(event) {
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
		
		$.ajax({
			type: "POST",
			    url: "/tree_generator#generate",
			    data: {bottomsimil:  $('#sliderValLabel1').val(), 
			    	   topsimil:  $('#sliderValLabel2').val()},
			    dataType: "text",

			    success: function(response) {    	 
				         showRadial(75);
			    },
			    error: function(data){
			    alert("fail");

			    }
			});
	});

	$("#slidertwo").slider();
	$('#slidertwo').on('slide', function(ev) {
		$("#sliderValLabel1").val(ev.value[0]);
		$("#sliderValLabel2").val(ev.value[1]);
	});

}


function showRadial(num){    
	//doPop();
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
new MapFiles();

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
      .on("mouseout", mouseouted)
  	 // .on("mouseover",popover)
  	.on("click",popover);
//  node.on("click",function(event){
//	  popover(); 
//  });

});
/*
function popover(d){
	 fileName = mapFiles[serviceName][0];
	 fileRoute = mapFiles[serviceName][1];
	 $("#FirstDiv").text(serviceName); 
	  $("#SecondDiv").text(fileName); 
	  $("#ThirdDiv").text(fileRoute);
	  $(this).popover({
		 
		  trigger: 'click',
		  animation:true,
		  delay: 0,
	      title: serviceName,
	      html:true,
	      content: function(){
	    	  return $('#popover_content_wrapper').html();
	    	  },
	      container: $("body"),
	  });
}

function loadPopWsdlFile(pepe){
	  var tittle = $('.popover-title').attr('name');
	  var xml = "<wsdl:operation name=\"AltaRelaciones\"></wsdl:operation>";
	  $( "#dialog" ).text(xml);
	  $( "#dialog" ).dialog();
	}
*/
function mouseovered(d) {
	  mapFiles.serviceName = d.name;
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