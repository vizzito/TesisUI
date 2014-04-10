function loadClusterButton(){
	$('#generarButtonCluster').click(function(event) {
		generateTreeParams("rotate");
	});
}

function showRotateCluster(){
var w = 860,
    h = 580,
    rx = w / 2,
    ry = h / 2,
    m0,
    rotate = 0;

var cluster = d3.layout.cluster()
    .size([360, ry - 120])
    .sort(null);

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

$("#panel-cluster").html("");
var svg = d3.select("#panel-cluster").append("div")
    .style("width", w + "px")
    .style("height", w + "px");

var vis = svg.append("svg:svg")
    .attr("width", w)
    .attr("height", w)
  .append("svg:g")
    .attr("transform", "translate(" + rx + "," + ry + ")");

vis.append("svg:path")
    .attr("class", "arc")
    .attr("d", d3.svg.arc().innerRadius(ry - 120).outerRadius(ry).startAngle(0).endAngle(2 * Math.PI));
    //.on("mousedown", mousedown);

d3.json("/tmp/files/datafile.json", function(error,classes) {
	var nodes = cluster.nodes(packages.root(classes)),
    links = packages.imports(nodes);
  //var nodes = cluster.nodes(json);

  var link = vis.selectAll("path.link")
      .data(cluster.links(nodes))
    .enter().append("svg:path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = vis.selectAll("g.node")
      .data(nodes)
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });

  node.append("svg:circle")
      .attr("r", 3);

  node.append("svg:text")
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
      .text(function(d) { return d.name; }).on("mouseover", mouseovered)
      .on("mouseout", mouseouted);
});

function mouseovered(d) {
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
function cross(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

}