function loadFilesPanel() {
    // $("#popover-button").on('click',popover);

    var lastSelected = 1;
    $('table').on('click', 'tbody tr', function(event) {

        var tableRow = $(this).closest("tr").prevAll("tr").length + 1;
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $(this).addClass('selected');
        }

        if (event.shiftKey) {
            var table = $('#files-table');

            var start = Math.min(tableRow, lastSelected) + 1;
            var end = Math.max(tableRow, lastSelected);
            var rows = table.find('tr');
            rows.slice(start, end).toggleClass('selected');
        } else {

            lastSelected = $(this).closest("tr").prevAll("tr").length + 1;
        }
    });
    $("#btn-add").on('click', function() {
        $("#file_upload").click();
    });

    $("#btn-delete").on('click', function() {
        $('#files-table tr').each(function() {
            if ($(this).hasClass('selected')) {
                for (var i = 0; i < files.length; i++) {
                    if (this.innerText == files[i].name) {
                        files.splice(i, 1);
                    }
                }

            }
        });
        updateFileSet(files);
    });

    $("#btn-anti-pattern").on('click', detectAntiPattern);

    function updateFileSet(files) {
        $("#files-table tbody").html("");
        for (var i = 0; i < files.length; i++) {
            // if(contains(files,newFiles[i])==false){
            // files.push(newFiles[i]);
            $("#files-table tbody").append(
                '<tr><td  class = "th-width">' + files[i].name
                    + '</td></tr>');
            // }
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
    function prepareUpload(event) {

        newFiles = event.target.files;
        for (var i = 0; i < newFiles.length; i++) {
            if (contains(files, newFiles[i]) == false) {
                var func = function(f) {
                    files.push(f);
                    var reader = new FileReader();

                    reader.addEventListener("loadend", function() {
                        files[files.indexOf(f)].content = reader.result;
                    });
                    reader.readAsText(f);

                    $("#files-table tbody").append(
                        '<tr><td  class = "th-width">' + f.name
                            + '</td></tr>');
                };
                func(newFiles[i]);
            }
        }
    }

    $("#select-all").on('click', function() {
        $("#files-table tr").each(function() {
            $(this).addClass("selected");
        });
    });
    $("#select-none").on('click', function() {
        $("#files-table tr").each(function() {
            $(this).removeClass("selected");
        });
    });
    $("#select-inverted").on('click', function() {
        $("#files-table tr").each(function() {
            $(this).toggleClass("selected");
        });
    });
}

function nodeShowDataOnClick(d) {
	if(d!=undefined){
    mapServices.serviceName = d.name;
    var serviceName = mapServices.serviceName;
    if (mapServices.map != null) {
        mapServices.fileName = mapServices.map[serviceName];

        var fileName = mapServices.fileName;

        var verWSDLButtonHTML = '<button class="btn btn-success btn-xs" data-toggle="modal" data-target="#modalWSDLFile">Show '
            + fileName + '</button>';
        var verWSDLAntiPattern = '<button class="btn btn-danger btn-xs" data-toggle="modal">Detect anti pattern </button>';
        var InfoPanelTitle = '<button class="btn btn-primary btn-xs pull-right" data-toggle="modal" data-target="#modalMoreInfoWSDL">More info</button>';

        $("#serviceButton").empty();
        $("#antiPattern").empty();
        $("#serviceName").empty();
        $("#fileName").empty();
        $("#serviceButton").empty();
        $("#moreInfoButton").empty();
        $("#modalWSDLInfoTitle").empty();
        $("#WSDLMoreInfo").empty();
        $("#ServiceInfoPanelTitle").empty();

        $("#serviceName").append(serviceName);
        $("#fileName").append(fileName);
        $("#modalWSDLFileTitle").empty();
        $("#modalWSDLFileBody").empty();

        $("#serviceButton").append(verWSDLButtonHTML);
        $("#antiPattern").append(verWSDLAntiPattern);
        $("#modalWSDLFileTitle").append(" " + fileName);
        $("#modalWSDLInfoTitle").append(" " + serviceName + " Info.");

        $("#ServiceInfoPanelTitle").append(InfoPanelTitle);
        paramsToPrint = new Array();
        paramsToPrintIndex = new Array();
        $("#WSDLMoreInfo").append(getMoreInfoForWSDL(fileName, serviceName));

        showInfoFile(fileName);
        var f = null;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++)
                if (files[i].name == fileName)
                    f = files[i];

            editor.setReadOnly(false);
            editor.setValue("");
            editor.setValue(f.content, -1);
            editor.setReadOnly(true);
            editor.scrollToLine(0);
            editor.focus();
        }

        $('#modalWSDLFile').on('shown.bs.modal', function(e) {

            editor.resize();
        });

        $('#myTab a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    }
	}
}

function detectAntiPattern() {
    filesToDetect = [];
    filesToDetect.push(mapServices.fileName);
    callDetectorService(filesToDetect);
}

function showInfoFile(fileName) {
    showAnimation = false;
    $.ajax({
        url : 'file_information',
        data : {
            fileName : fileName
        },
        type : 'GET',
        success : function(response) {

            showAnimation = true;
            $("#file-information-content").html(response);
        },
        error : function(jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
        }
    });
}

/**
 *
 * @type {Array}
 */
var paramsToPrint = new Array();
var paramsToPrintIndex = new Array();

/**
 * Retrieves the desired fileName from the fetched files.
 *
 * @param fileName
 * @returns [file]|null - The desired file if exists, null otherwise.
 * @private
 */
function _getFile(fileName){
    for (var i = 0; i < files.length; i++){
        if (files[i].name == fileName)
            return files[i];
    }
    return null;
}

/**
 * Given the params from the WSDL, it will return the param value
 * without the first part + collon
 *
 * @param attr
 * @returns {string}
 * @private
 */
function _getRealAttr(attr){
    var ret = '';
    if (attr != null)
        ret = attr.substring(attr.lastIndexOf(':') + 1);
    return ret;
}

/**
 *
 * @param param
 * @returns {string}
 * @private
 */
function _printSingleParam(param, id){
    var result = '';
    var min, max;
    if (param.hasAttribute("minOccurs")) { min = param.getAttribute("minOccurs"); } else { min = ''; }
    if (param.hasAttribute("maxOccurs")) { max = param.getAttribute("maxOccurs"); } else { max = ''; }
    var type = param.getAttribute("type");
    var name = param.getAttribute("name");

    type = _getRealAttr(type);

    var detail = " ";
    if (min == "1" && max == "1"){
        detail = '<span class="label label-warning">Mandatory</span>';
    } else {
        if (min == "0" && max == "1"){
            detail = '<span class="label label-default">Optional</span>';
        }
    }
    if (max == "unbounded"){
        type = '<small>Array of</small> ' + type;
        detail = '<span class="label label-primary">' + type + ' </span>';
    }
    //result += '<strong>' + name + ':</strong>' + ' type -> ' + type + ' ' + detail + '</br>';
    result += '<tr><td>' + id + '</td><td>' + name + '</td><td>' + type + '</td><td>' + detail + '</td></tr>';
    return result;
}

/**
 *
 * @param params
 * @returns {string}
 * @private
 */
function _getParams(params){
    var result = "";
    if (params.length > 0){
        result = '<div class="table-responsive"><table class="table table-striped table-condensed"><thead>' +
            '<tr><td><strong>#</strong></td><td><strong>Param Name</strong></td><td><strong>Type</strong></td><td><strong>Detail</strong></td></tr>';
        for (var i = 0; i < params.length; i++){
            var id = i + 1;
            result += _printSingleParam(params[i], id);
        }
        result += '</thead></table></div>';
    }
    return result;
}

/**
 *
 * @param xml
 * @param param
 * @returns {boolean}
 * @private
 */
function _isComplexTypeParam(xml, type){
    var a = xml.find('complexType[name="' + type + '"]');
    return (a != undefined && a.length > 0);
}

/**
 *
 * @param xml
 * @param paramsArray
 * @returns {string}
 * @private
 */
function _getUsedParams(xml, paramsArray, id){
    result = '';

    for (var i = 0; i < paramsArray.length; i++){
        var type = paramsArray[i].getAttribute("type");
        type = _getRealAttr(type);
        var usedParams = xml.find('complexType[name="' + type + '"]');

        if (usedParams != undefined && usedParams.length > 0){
            result += '<div class="panel panel-default"><div class="panel-heading"><h5 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse'+id+''+type+'">Type ' + type +
                '</a></h5></div><div id="collapse'+id+''+type+'" class="panel-collapse collapse"><div class="panel-body">' +
                _getParams(usedParams.find("sequence").children()) +
                '</div></div></div>';
            var paramsData = usedParams.find("sequence").children();
            result += _getUsedParams(xml, paramsData, id);
        }
    }
    return result;
}

/**
 *
 * @param xml
 * @param operation
 * @param state
 * @returns {string}
 * @private
 */
function _getOperationData(xml, operation, state){
    result = '';

    var input = xml.find("operation").find(operation);
    var inputstr = '';

    if (input.length > 0){
        result += '<div class="tab-pane ' + state + '" id="' + operation + '">';
        for (var i = 0; i < input.length; i++){
            if (input[i].hasAttribute("message")){
                inputstr =  _getRealAttr(input[i].getAttribute("message"));

                var inputParams = xml.find('message[name="' + inputstr + '"]').find("part");
                result += '<h4>' + operation + ' Type: ' + inputstr + '</h4>';
                for (var j = 0; j < inputParams.length; j++){
                    var a = inputParams[j].getAttribute("element");
                    if (a == null)
                        a = inputParams[j].getAttribute("type");
                    var p = xml.find('types').find('element[name="'+ _getRealAttr(a) +'"]').children().find("sequence").children();
                    if (p.length > 0){
                        result += _getParams(p);
                    } else {
                        if (j == 0)
                            result += '<div class="table-responsive"><table class="table table-striped table-condensed"><thead>' +
                                '<tr><td><strong>#</strong></td><td><strong>Param Name</strong></td><td><strong>Type</strong></td><td><strong>Detail</strong></td></tr>';
                        result += _printSingleParam(inputParams[j], j + 1);
                        if (j == inputParams.length - 1)
                            result += '</thead></table></div>';
                    }
                    for (var k = 0; k < p.length; k++){
                        var type = p[k].getAttribute("type");
                        type = _getRealAttr(type);
                        var found = $.inArray(type, paramsToPrintIndex) > -1;
                        if (!found){
                            paramsToPrint[type] = {id: inputstr, data:p, printed: false};
                            paramsToPrintIndex.push(type);
                        }
                    }
                }
            }
        }
        for (var i = 0; i < paramsToPrintIndex.length; i++){
            type = paramsToPrintIndex[i];
            if (_isComplexTypeParam(xml, type) && !paramsToPrint[type].printed){
                paramsToPrint[type].printed = true;
                result += '<div class="panel-group" id="accordion">' + _getUsedParams(xml, paramsToPrint[type].data, paramsToPrint[type].id) + '</div>';
            }
        }
        result += '</div>';
    } else {
        result += '<div class="tab-pane active" id="input"><h4>No '+ operation +' Defined.</h4></div>';
    }

    return result;
}

/**
 *
 * @param fileName
 * @param serviceName
 * @returns {string}
 */
function getMoreInfoForWSDL(fileName, serviceName){
    var f = _getFile(fileName);
    var xml = $( $.parseXML( f.content ) );

    var result = '<ul class="nav nav-tabs" role="tablist">' +
        '<li class="active"><a href="#input" role="tab" data-toggle="tab"><h5><i class="glyphicon glyphicon-log-in"></i> Input</h5></a></li>' +
        '<li><a href="#output" role="tab" data-toggle="tab"><h5><i class="glyphicon glyphicon-log-out"></i> Output</h5></a></li></ul><div class="tab-content">';

    result += _getOperationData(xml, "input", "active");
    result += _getOperationData(xml, "output", "");

    result += '</div>';
    return result;
}