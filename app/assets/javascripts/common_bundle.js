//= require d3.js


var packages = {

	// Lazily construct the package hierarchy from class names.
	root : function(classes) {
		var map = {};

		function find(name, data, realname) {
			var node = map[name], i;
			if (!node) {
				node = map[name] = data || {
					//name : realname,
					name:name,
					children : []
				};
				if (name.length) {
					node.parent = find(name.substring(0, i = name
							.lastIndexOf(".")),null,realname);
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
