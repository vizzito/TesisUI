// se va a generar dinamicamente al igual q mapServices, el json no va mas!
//var mapFiles =  {'archivo1.wsdl': '/home/panther/workspace/ServiceClusterer/botomUp1/AltadeRelaciones.wsdl'
//				,'archivo2.wsdl': '/home/panther/workspace/ServiceClusterer/botomUp1/AltadeRelaciones.wsdl'};  
var mapServices;
function setMapperServices() {
	var request = new XMLHttpRequest();
	
		request.open("GET", "/tmp/files/mapfile.json", false);
		request.send(null);
		var mapping = JSON.parse(request.responseText);
		mapServices = new Map(mapping,null,null); 
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
function FileContent(title, content){
	this.title = title;
	this.content = content;
}
