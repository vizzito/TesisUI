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
				 files.push(newFiles[i]);
				 $("#files-table tbody").append('<tr><td  class = "th-width">'+newFiles[i].name+'</td></tr>');
			 }
		}
	}
		

}