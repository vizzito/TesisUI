function loadFilesPanel(){
	
	var lastSelected = 1;
    $('table').on('click','tr',function(event){
    	
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
    
	$('input[type=file]').on('change', prepareUpload);
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
				 files.push(newFiles[i]);
				 $("#files-table tbody").append('<tr><td  class = "th-width">'+newFiles[i].name+'</td></tr>');
			 }
		}
	}
	
//	function showFilesPanel(){
//		if (self.location.href == top.location.href){
//	        $("body").css({font:"normal 13px/16px 'trebuchet MS', verdana, sans-serif"});
//	        var logo=$("<a href='http://pupunzi.com'><img id='logo' border='0' src='http://pupunzi.com/images/logo.png' alt='mb.ideas.repository' style='display:none;'></a>").css({position:"absolute"});
//	        $("body").prepend(logo);
//	        $("#logo").fadeIn();
//	    }
//
//	    $("#extruderLeft").buildMbExtruder({
//	        position:"right",
//	        width:300,
//	        extruderOpacity:.8,
//	        hidePanelsOnClose:true,
//	        accordionPanels:true,
//	        onExtOpen:function(){},
//	        onExtContentLoad:function(){},
//	        onExtClose:function(){}
//	    });
	    

//	}

}