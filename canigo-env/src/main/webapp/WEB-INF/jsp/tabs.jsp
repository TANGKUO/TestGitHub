<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp" %>
<center>
<h2><font face="verdana">Ejemplo de tabs</font></h2>
</center>
<style type="text/css">
<!--
#tabcontainer
{
margin-top: 2px;
padding: 0px;
height: 20px;
}
#tabcontainer ul { 
	border: 0px; 
	padding: 0px; 
	list-style-type: none; 
	text-align: center; 
}
#tabcontainer ul li
{
display: block;
float: left;
text-align: center;
padding: 0px;
margin: 0px;
}
#tabcontainer ul li a
{
width: 44px;
height: 18px;
border-top: 1px solid #000000;
border-left: 1px solid #000000;
border-right: 1px solid #000000;
padding: 0px;
margin: 0px 0px 0px 0px;

color: #000000;
background: #CCCCCC;
text-decoration: none;
display: block;
text-align: center;
font-family: Arial, Verdana,  Helvetica, sans-serif;
font-size: 10px;
}

#tabcontainer ul li a:hover
{
color: #000000;
background: #CCCCCC;
}

#tabcontainer ul li a:active
{
background: #F3D299;
border-top: 1px solid #000000;
border-left: 1px solid #000000;
border-right: 1px solid #000000;
color: #000000;
font-weight: bold
}

#tabcontainer ul li#active a
{
background: #F3D299;
border-top: 1px solid #000000;
border-left: 1px solid #000000;
border-right: 1px solid #000000;
color: #000000;
font-weight: bold
}
 
#tabpanelcontent {
	border: 1px solid #000000;
}
-->
</style>
<fwk:tabPanel
    panelStyleId="tabcontainer"
    contentStyleId="tabpanelcontent"
    currentStyleId="active">
  <fwk:tab captionKey="tabs.tab1"
    baseUrl="${pageContext.request.contextPath}/tabs.do" defaultTab="true" parameters="reqCode=edit"/>
  <fwk:tab captionKey="tabs.tab2"
    baseUrl="${pageContext.request.contextPath}/tabs.do" parameters="reqCode=view"/>
</fwk:tabPanel>