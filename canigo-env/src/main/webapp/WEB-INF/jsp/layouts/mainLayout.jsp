<%@ page contentType="text/html;charset=ISO-8859-1"%>
<%response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
			response.setHeader("Pragma", "no-cache"); //HTTP 1.0
			response.setDateHeader("Expires", 0); //prevents caching at the proxy server

		%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp"%>
<html>
<head>
<title><tiles:insert attribute="title" /></title>
<link rel="stylesheet" href='<c:url value="/css/import.css"/>' type="text/css" />
<script>
	var contextPath = '<c:url value="/"/>'.substring(0,'<c:url value="/"/>'.length-1);
	</script>
<fwk:configuration styleId="defaultConfiguration" />
</head>
<body>
<div id="outer">
	<div id="top-section">
		<tiles:insert attribute="header" />
	</div>
	
	<div id="mid-section">
		<div id="mid-col-1">
			<div id="menu">
				<tiles:insert attribute='menu' />
			</div>
		</div>
		<div id="mid-col-2">
			<div id="mid-col-2-row-1" style="visibility:hidden;">
				<tiles:insert attribute='messages' />
			</div>
			<div id="mid-col-2-row-2">
				<div id="ariadna">
					<tiles:insert attribute='ariadna' />
				</div>
			</div>
			<div id="mid-col-2-row-3">
				<tiles:insert attribute='bodyHeader' />
			</div>
			<div id="mid-col-2-row-4">
				<tiles:insert attribute='body' />
			</div>
		</div>
	</div>
	
	<div id="bottom-section">
		<div id="bottom-col-1">
			<tiles:insert attribute='footer' />
		</div>
	</div>
</div>
</body>
</html>
