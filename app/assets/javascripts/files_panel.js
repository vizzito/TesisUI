function showFilesPanel(){
	if (self.location.href == top.location.href){
        $("body").css({font:"normal 13px/16px 'trebuchet MS', verdana, sans-serif"});
        var logo=$("<a href='http://pupunzi.com'><img id='logo' border='0' src='http://pupunzi.com/images/logo.png' alt='mb.ideas.repository' style='display:none;'></a>").css({position:"absolute"});
        $("body").prepend(logo);
        $("#logo").fadeIn();
    }

    $("#extruderLeft").buildMbExtruder({
        position:"right",
        width:300,
        extruderOpacity:.8,
        hidePanelsOnClose:true,
        accordionPanels:true,
        onExtOpen:function(){},
        onExtContentLoad:function(){},
        onExtClose:function(){}
    });
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

}