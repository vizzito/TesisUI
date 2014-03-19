//= require bootstrap

//var serviceName = "default";
var mapFiles;// = new Map(null);
function popover(d) {
    serviceName = mapFiles.serviceName;
    fileName = mapFiles.fileName;
    fileRoute = mapFiles.fileRoute;
	if (mapFiles.map != null) {
		mapFiles.fileName = mapFiles.map[serviceName][0];
		mapFiles.fileRoute = mapFiles.map[serviceName][1];
		$("#FirstDiv").text(serviceName);
		$("#SecondDiv").text(fileName);
		$("#ThirdDiv").text(fileRoute);
		$(this).popover({

			trigger : 'click',
			animation : true,
			delay : 0,
			title : serviceName,
			html : true,
			content : function() {
				return $('#popover_content_wrapper').html();
			},
			container : $("body"),
		});
	}
}

function loadPopWsdlFile(pepe) {
	
	//var tittle = $('.popover-title').attr('name');
	//var xml = "<wsdl:operation name=\"AltaRelaciones\"></wsdl:operation>";
	$("#serviceName").text('ServiceName = '+mapFiles.serviceName+"\n");
	$("#fileName").text('FileName = '+mapFiles.fileName+"\n");
	$("#fileRoute").text('FileRoute = '+mapFiles.fileRoute+"\n");
	$("#serviceName").appendTo('#showFileInformation');
	$("#fileName").appendTo('#showFileInformation');
	$("#fileRoute").appendTo('#showFileInformation');
//	$("#showFileInformation").text("");
	$("#showFileInformation").dialog({
	      buttons: {
	        Ok: function() {
	          $( this ).dialog( "close" );
	        }
	      }
	    });
	
	//$("#dialog-message").dialog();
}

function MapFiles() {
	//mapFiles = getMap();
	if (mapFiles == null) {
		//mapFiles = new Map();
		var request = new XMLHttpRequest();
		request.open("GET", "/tmp/files/map.json", false);
		request.send(null);
		mapping = JSON.parse(request.responseText);
		mapFiles = new Map(mapping,null,null); 
	} else
		return mapFiles;

}

function Map(map) {
	this.map = map;
	this.fileName = null;
	this.fileRoute = null;
	this.serviceName = null;
	this.getMap = function(){
		return this;
	};
}