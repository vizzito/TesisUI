//= require d3.js
//= require common_bundle.js

function loadTreeButton(){
	$('#generarButtonTree').click(function(event) {
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
				         showTree();
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
function showTree(){
var width = 660,
    height = 400;

var cluster = d3.layout.cluster()
    .size([height, width - 160]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });
$("#panel-tree").html("");
var svg = d3.select("#panel-tree").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(40,0)");

d3.json("/tmp/files/datafile.json", function(error, root) {
  var nodes = cluster.nodes(packages.root(root)),
      links = cluster.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  node.append("circle")
      .attr("r", 4.5);

  node.append("text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.name; });
});

d3.select(self.frameElement).style("height", height + "px");

}