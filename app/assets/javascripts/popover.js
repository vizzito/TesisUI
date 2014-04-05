function popover(d) {
    serviceName = mapServices.serviceName;
    fileName = mapServices.fileName;
    fileRoute = mapServices.fileRoute;
	if (mapServices.map != null) {
		mapServices.fileName = mapServices.map[serviceName][0];
		mapServices.fileRoute = mapServices.map[serviceName][1];
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
	$("#serviceName").text('ServiceName = '+mapServices.serviceName+"\n");
	$("#fileName").text('FileName = '+mapServices.fileName+"\n");
	$("#fileRoute").text('FileRoute = '+mapServices.fileRoute+"\n");
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
/*
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
}*/