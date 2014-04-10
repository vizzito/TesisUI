// se va a generar dinamicamente al igual q mapServices, el json no va mas!
//var mapFiles =  {'archivo1.wsdl': '/home/panther/workspace/ServiceClusterer/botomUp1/AltadeRelaciones.wsdl'
//				,'archivo2.wsdl': '/home/panther/workspace/ServiceClusterer/botomUp1/AltadeRelaciones.wsdl'};  
var mapServices;
function mapperServices() {
	//mapFiles = getMap();
	if (mapServices == null) {
		//mapFiles = new Map();
		var request = new XMLHttpRequest();
		request.open("GET", "/tmp/files/mapfile.json", false);
		request.send(null);
		mapping = JSON.parse(request.responseText);
		mapServices = new Map(mapping,null,null); 
	} else
		return mapServices;

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
//function getSelectedFiles(selectedFiles){
//	var mapToSend = [];
//	var contentDefault = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<wsdl:definitions xmlns:soap=\"http://schemas.xmlsoap.org/wsdl/soap/\" xmlns:tm=\"http://microsoft.com/wsdl/mime/textMatching/\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:mime=\"http://schemas.xmlsoap.org/wsdl/mime/\" xmlns:tns=\"http://adp.prev.gov.ar\" xmlns:s1=\"http://www.prev.gov.ar\" xmlns:s=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://schemas.xmlsoap.org/wsdl/soap12/\" xmlns:http=\"http://schemas.xmlsoap.org/wsdl/http/\" targetNamespace=\"http://adp.prev.gov.ar\" xmlns:wsdl=\"http://schemas.xmlsoap.org/wsdl/\">\n  <wsdl:types>\n    <s:schema elementFormDefault=\"qualified\" targetNamespace=\"http://adp.prev.gov.ar\">\n      <s:import namespace=\"http://www.prev.gov.ar\" />\n      <s:element name=\"AltaRelaciones\">\n        <s:complexType>\n          <s:sequence>\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"tipo_mov\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"cuil_entidad\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"usuario\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"dir_ip\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"perfil\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"cuil\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"cuil_rela\" type=\"s:string\" />\n            <s:element minOccurs=\"1\" maxOccurs=\"1\" name=\"c_relacion\" type=\"s:short\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"f_desde\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"f_hasta\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"padre_hijo\" type=\"s:string\" />\n            <s:element minOccurs=\"1\" maxOccurs=\"1\" name=\"c_cond_rel\" type=\"s:short\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"Base\" type=\"s:string\" />\n            <s:element minOccurs=\"1\" maxOccurs=\"1\" name=\"c_evento\" type=\"s:short\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"f_evento\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"cuil_docum\" type=\"s:string\" />\n            <s:element minOccurs=\"1\" maxOccurs=\"1\" name=\"c_docrespal\" type=\"s:short\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"legajo\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"legajo_ant\" type=\"s:string\" />\n            <s:element minOccurs=\"1\" maxOccurs=\"1\" name=\"c_pcia\" type=\"s:short\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"lugar\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"tomo\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"folio\" type=\"s:string\" />\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"partida\" type=\"s:string\" />\n          <\/s:sequence>\n        <\/s:complexType>\n      <\/s:element>\n      <s:element name=\"AltaRelacionesResponse\">\n        <s:complexType>\n          <s:sequence>\n            <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"AltaRelacionesResult\" type=\"tns:RetornoAltaRelaciones\" />\n          <\/s:sequence>\n        <\/s:complexType>\n      <\/s:element>\n      <s:complexType name=\"RetornoAltaRelaciones\">\n        <s:sequence>\n          <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"error\" type=\"s1:Error\" />\n        <\/s:sequence>\n      <\/s:complexType>\n    <\/s:schema>\n    <s:schema elementFormDefault=\"qualified\" targetNamespace=\"http://www.prev.gov.ar\">\n      <s:complexType name=\"Error\">\n        <s:sequence>\n          <s:element minOccurs=\"1\" maxOccurs=\"1\" name=\"cod_retorno\" type=\"s:short\" />\n          <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"desc_mensaje\" type=\"s:string\" />\n          <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"cod_error\" type=\"s:string\" />\n          <s:element minOccurs=\"0\" maxOccurs=\"1\" name=\"cod_gravedad\" type=\"s:string\" />\n        <\/s:sequence>\n      <\/s:complexType>\n    <\/s:schema>\n  <\/wsdl:types>\n  <wsdl:message name=\"AltaRelacionesSoapIn\">\n    <wsdl:part name=\"parameters\" element=\"tns:AltaRelaciones\" />\n  <\/wsdl:message>\n  <wsdl:message name=\"AltaRelacionesSoapOut\">\n    <wsdl:part name=\"parameters\" element=\"tns:AltaRelacionesResponse\" />\n  <\/wsdl:message>\n  <wsdl:portType name=\"AltadeRelacionesSoap\">\n    <wsdl:operation name=\"AltaRelaciones\">\n      <wsdl:input message=\"tns:AltaRelacionesSoapIn\" />\n      <wsdl:output message=\"tns:AltaRelacionesSoapOut\" />\n    <\/wsdl:operation>\n  <\/wsdl:portType>\n  <wsdl:binding name=\"AltadeRelacionesSoap\" type=\"tns:AltadeRelacionesSoap\">\n    <soap:binding transport=\"http://schemas.xmlsoap.org/soap/http\" />\n    <wsdl:operation name=\"AltaRelaciones\">\n      <soap:operation soapAction=\"http://adp.prev.gov.ar/AltaRelaciones\" style=\"document\" />\n      <wsdl:input>\n        <soap:body use=\"literal\" />\n      <\/wsdl:input>\n      <wsdl:output>\n        <soap:body use=\"literal\" />\n      <\/wsdl:output>\n    <\/wsdl:operation>\n  <\/wsdl:binding>\n  <wsdl:binding name=\"AltadeRelacionesSoap12\" type=\"tns:AltadeRelacionesSoap\">\n    <soap12:binding transport=\"http://schemas.xmlsoap.org/soap/http\" />\n    <wsdl:operation name=\"AltaRelaciones\">\n      <soap12:operation soapAction=\"http://adp.prev.gov.ar/AltaRelaciones\" style=\"document\" />\n      <wsdl:input>\n        <soap12:body use=\"literal\" />\n      <\/wsdl:input>\n      <wsdl:output>\n        <soap12:body use=\"literal\" />\n      <\/wsdl:output>\n    <\/wsdl:operation>\n  <\/wsdl:binding>\n  <wsdl:service name=\"AltadeRelaciones\">\n    <wsdl:port name=\"AltadeRelacionesSoap\" binding=\"tns:AltadeRelacionesSoap\">\n      <soap:address location=\"http://localhost:1382/AltadeRelaciones.asmx\" />\n    <\/wsdl:port>\n    <wsdl:port name=\"AltadeRelacionesSoap12\" binding=\"tns:AltadeRelacionesSoap12\">\n      <soap12:address location=\"http://localhost:1382/AltadeRelaciones.asmx\" />\n    <\/wsdl:port>\n  <\/wsdl:service>\n<\/wsdl:definitions>";
//	
//	mapToSend[0] = new FileContent("archivo1.wsdl",contentDefault);
//	mapToSend[1] = new FileContent("archivo1.wsdl",contentDefault);
//	
//	return mapToSend;
//}