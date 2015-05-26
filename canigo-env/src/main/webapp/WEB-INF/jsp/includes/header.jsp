<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp"%>
<%String queryString = request.getQueryString();
			String requestMethod = request.getMethod();%>
			
<script language="JavaScript1.2">
	function change(locale){
		var method = '<%=requestMethod%>';
		var pathname = document.location.pathname;
		var queryString = '<%=queryString%>';
		var fullEng = pathname, fullCast = pathname, fullCat = pathname;
		if(queryString!='null'){
			if(queryString.indexOf("set-locale")!=-1){
				fullEng = fullEng + "?set-locale=en_GB&" + queryString.substring("set-locale=".length+6);
				fullCast = fullCast + "?set-locale=es_ES&" + queryString.substring("set-locale=".length+6);
				fullCat = fullCat + "?set-locale=ca_ES&" + queryString.substring("set-locale=".length+6);
			}
			else {
				fullEng = fullEng + "?set-locale=en_GB&" + queryString;
				fullCast = fullCast + "?set-locale=es_ES&" + queryString;		
				fullCat = fullCat + "?set-locale=ca_ES&" + queryString;		
			}
		}
		else {
			fullEng = fullEng + "?set-locale=en_GB&";
			fullCast = fullCast + "?set-locale=es_ES&";
			fullCat = fullCat + "?set-locale=ca_ES&";
		}
		if("POST"==method){
			fullEng = fullCast = fullCat = "#";
		}


		if(method!="POST"){
			if('en_GB'==locale){
				document.location = fullEng;
			}
			else if('es_ES'==locale){
				document.location = fullCast;
			}
			else if('ca_ES'==locale){
				document.location = fullCat;
			}
		}
	}
</script>
		
		
<div id="top-row-1">
	<div id="top-row-1-col-1">	
		 <div class="logo_petit">
	      	<a href="http://www.gencat.net/" title="Generalitat de Catalunya - Inici" accesskey="4">
	        	<img border="0" src="<c:url value='/images/logo.gif'/>" width="186" height="32" alt="Generalitat de Catalunya - CTTI">
	        </a>
	    </div>
	</div>
	
	<div id="top-row-1-col-2">
		&nbsp;
	</div>
	
	<div id="top-row-1-col-3">
		
	    <div class="generalOptions">
	      <fmt:bundle basename="i18n.applicationResources">
    	  <%-- span>Usuari: Xavier Escudero Sabadell</span>&nbsp;&nbsp;--%>
	      <a href="http://www.gencat.net/web/cat/mapa.htm" class="eines" accesskey="5">Ajuda</a> |
	      <a href="javascript:change('en_GB')" class="eines"><bean:message key="menu.i18n.en_gb"/></a> |
		  <a href="javascript:change('es_ES')" class="eines"><bean:message key="menu.i18n.es_es"/></a> |
		  <a href="javascript:change('ca_ES')" class="eines"><bean:message key="menu.i18n.ca_es"/></a>
		  <img border="0" alt="Imprimir" src="<c:url value='/images/print.gif'/>" width="16" height="16" />	
		  </fmt:bundle>
	    </div>
    		
	</div>
</div>

<div id="top-row-2">
	<div id="topMenu">
		  <div id="commonLinks">
		      <ul>	      
	    	        <li><a href="http://ptbrgcpr/intranet/UnitatsDirectives/SecretariaGeneral/Home/Home/Home.asp">Intranet</a></li>
			        <li class="menusel"><a href="http://epoca.intranet/">Epoca</a></li>
			        <li><a href="http://www10.gencat.net/ptop/AppJava/cat/index.jsp">Web DPTOP</a></li>
			        <li><a href="http://www.gencat.net/">Web GENCAT</a></li>
		      </ul>
		  </div>
	</div>	
</div>

<div id="top-row-3">
	<div class="appTitle">Plantilla</div>
</div>	
