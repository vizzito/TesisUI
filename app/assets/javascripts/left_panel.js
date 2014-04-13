function loadFilesPanel(){
	
	var lastSelected = 1;
    $('table').on('click','tbody tr',function(event){
    	
    	 var tableRow = $(this).closest("tr").prevAll("tr").length + 1;      
    	    if ($(this).hasClass('selected')) {
    	        $(this).removeClass('selected');       
    	    }
    	    else {           
    	        $(this).addClass('selected');         
    	    } 
    
    	    if (event.shiftKey) { 
    	        var table = $('#files-table');        


    	        var start = Math.min(tableRow, lastSelected)+1;
    	        var end = Math.max(tableRow, lastSelected);                 
    	        var rows = table.find('tr');
    	        rows.slice(start,end).toggleClass('selected');
    	    } else {        

    	        lastSelected = $(this).closest("tr").prevAll("tr").length + 1;
    	    }
    	});
    $("#btn-add").on('click',function(){
    	 $("#file_upload").click();    	   
    });
    
    $("#btn-delete").on('click',function(){
    	$('#files-table tr').each(function(){
			if($(this).hasClass('selected'))
				{
				for(var i=0;i<files.length;i++){
					if(this.innerText==files[i].name){
						 files.splice(i, 1);
						}
				}
				
				}
			});
    	updateFileSet(files);
   });
    
    function updateFileSet(files){
    	$("#files-table tbody").html("");
    	for(var i=0;i<files.length;i++){
			// if(contains(files,newFiles[i])==false){
			//	 files.push(newFiles[i]);
				 $("#files-table tbody").append('<tr><td  class = "th-width">'+files[i].name+'</td></tr>');
			//}
		}
    }
 
	$('#file_upload').on('change', prepareUpload);
	function contains(a, obj) {
	    for (var i = 0; i < a.length; i++) {
	        if (a[i].name == obj.name) {
	            return true;
	        }
	    }
	    return false;
	}
	// Grab the files and set them to our variable
	function prepareUpload(event)
	{
	
		newFiles = event.target.files;
		for(var i=0;i<newFiles.length;i++){
			 if(contains(files,newFiles[i])==false){
                 var func = function (f){
                     files.push(f);
                     var reader = new FileReader();

                     reader.addEventListener("loadend", function() {
                         files[files.indexOf(f)].content = reader.result;
                     });
                     reader.readAsText(f);

                     $("#files-table tbody").append('<tr><td  class = "th-width">'+f.name+'</td></tr>');
                 }
                 func(newFiles[i]);
			 }
		}
	}
	
	$("#select-all").on('click',function(){
		$("#files-table tr").each(function() {
			$(this).addClass("selected");
			});
	});
	$("#select-none").on('click',function(){
		$("#files-table tr").each(function() {
			$(this).removeClass("selected");
			});
	});
	$("#select-inverted").on('click',function(){
		$("#files-table tr").each(function() {
			$(this).toggleClass("selected");
			});
	});
		

}

function nodeShowDataOnClick(d){
    mapServices.serviceName = d.name;
    var serviceName = mapServices.serviceName;
    if (mapServices.map != null) {
        mapServices.fileName = mapServices.map[serviceName];
        mapServices.fileRoute = mapServices.map[serviceName];

        var fileName = mapServices.fileName;
        var fileRoute = mapServices.fileRoute;

        var nameHTML = "<div><strong>Service Name:</strong> " + serviceName + "</div>";
        var fileHTML = "<div><strong>Service File:</strong> " + fileName + "</div>"
        //var pathHTML = "<div><strong>Service Path:</strong> <small>" + fileRoute.split('/').join(' / ') + "</small></div>";
        var verWSDLButtonHTML = '<hr/><button class="btn btn-success btn-xs pull-right" data-toggle="modal" data-target="#modalWSDLFile">Ver ' + fileName + '</button>';

        $("#ServiceData").empty();
        $("#modalWSDLFileTitle").empty();
        $("#modalWSDLFileBody").empty();

        $("#ServiceData").append(nameHTML);
        $("#ServiceData").append(fileHTML);
        //$("#ServiceData").append(pathHTML);
        $("#ServiceData").append(verWSDLButtonHTML);

        $("#modalWSDLFileTitle").append(fileName);

        var f = null;
        if (files != undefined)
            for (var i = 0; i < files.length; i++)
                if (files[i].name == fileName)
                    f = files[i];


        /*var reader = new FileReader();
        reader.addEventListener("loadend", function() {
            editor.setValue(reader.result);
        });
        reader.readAsArrayBuffer(f);
        */

        editor.setShowPrintMargin(false);
        editor.setReadOnly(false);
        editor.setValue("");
        editor.setValue(f.content);
        editor.setReadOnly(true);
        editor.focus();

        $('#modalWSDLFile').on('shown.bs.modal', function (e) {
            editor.resize();
        })

    }
}