function loadBundleButton(){

	$('#generarButtonBundle').click(function(event) {
		generateTreeParams("bundle");
	});
}
function showBundle(){
var margin = {top: 40, right: 40, bottom: 40, left: -150},
    width = 500 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var cluster = d3.layout.cluster()
    .size([height, width])
    .sort(function(a, b) { return d3.ascending(a.name, b.name); })
    .value(function(d) { return d.size; });

var bundle = d3.layout.bundle();

var line = d3.svg.line()
    .interpolate("bundle")
    .tension(.85)
    .x(function(d) { return d.y; })
    .y(function(d) { return d.x; });
$("#panel-bundle").html("");
var svg = d3.select("#panel-bundle").append("svg")
    .attr("width", 800)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var link = svg.append("g").selectAll(".link"),
node = svg.append("g").selectAll(".node");

d3.json("/tmp/files/datafile.json", function(error, classes) {
  var nodes = cluster.nodes(packages.root(classes)),
      links = packages.imports(nodes);

  link = link.data(bundle(links))
    .enter().append("path").each(function(d) {
        d.source = d[0], d.target = d[d.length - 1];
    })
      .attr("class", "link")
      .attr("d", line);

  node = node.data(nodes.filter(function(n) { return !n.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
    .append("text")
      .attr("dx", 8)
      .attr("dy", ".31em")
      .text(function(d) { return d.key; })
      .on("mouseover", mouseovered)
      .on("mouseout", mouseouted)
      .on("click", nodeShowDataOnClick);

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

d3.select(self.frameElement).style("height", height + margin.top + margin.bottom + "px");

}