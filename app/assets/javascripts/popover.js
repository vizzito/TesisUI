//= require bootstrap
//var serviceName = "default";

$.fn.extend({
    popoverClosable: function (options) {
        var defaults = {
            template:
                '<div class="popover">\
<div class="arrow"></div>\
<div class="popover-header">\
<button type="button" class="close" data-dismiss="popover" aria-hidden="true">&times;</button>\
<h3 class="popover-title"></h3>\
</div>\
<div class="popover-content"></div>\
</div>'
        };
        options = $.extend({}, defaults, options);
        var $popover_togglers = this;
        $popover_togglers.popover(options);
        $popover_togglers.on('click', function (e) {
            e.preventDefault();
            $popover_togglers.not(this).popover('hide');
        });
        $('html').on('click', '[data-dismiss="popover"]', function (e) {
            $popover_togglers.popover('hide');
        });
    }
});

$(function () {
    $('[data-toggle="popover"]').popoverClosable();
});


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