<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp" %>
                  
<%--script language="JavaScript1.2">
function showEL(el){
	var ele = document.getElementById(el);
	if(ele){
		if(ele.style.display == 'none'){
			ele.style.display='';
			alert(ele.style.display);
		} else {
			ele.style.display='none';
		}
	}
	
}
</script--%>

<%--
	System.out.println("************* Locale in Request ********************");
	System.out.println("Locale --> " + pageContext.getRequest().getLocale());
	System.out.println("************* Parameters ********************");
	java.util.Enumeration e = request.getParameterNames();
	while(e.hasMoreElements())
	{
		String sKey = (String)e.nextElement();
		System.out.println("Parameter name --> " + sKey);
	}
	
	System.out.println("************* Attributes ********************");
	java.util.Enumeration e1 = request.getAttributeNames();
	while(e1.hasMoreElements())
	{
		String sKey = (String)e1.nextElement();
		System.out.println("Parameter name --> " + sKey + " --- value :" +request.getAttribute(sKey));
	}
	
	System.out.println("************* Attributes from session ********************");
	java.util.Enumeration e2 = request.getSession().getAttributeNames();
	while(e2.hasMoreElements())
	{
		String sKey = (String)e2.nextElement();
		System.out.println("Parameter name --> " + sKey + " --- value :" +request.getSession().getAttribute(sKey));
	}

--%>

<%--
  
  System.out.println("miParam********************"+request.getAttribute("errores.validacion.submit.mandatory"));
  org.springframework.validation.Errors misErrores = (org.springframework.validation.Errors)request.getAttribute("errores.validacion.submit.mandatory");     
  if (misErrores!=null){
	  
	  java.util.List allErrors= (java.util.List) misErrores.getAllErrors();
	   
	  out.println("<div class=\"error\" id=\"errorsZone\"" +
			   " style=\"margin-left: 10px; margin-right: 10px; margin-bottom: 3px; margin-top: 3px;\">" +
			   "Se han encontrado los siguientes errores en tu formulario." +
			   "<p>Por favor corrige estos errores y vuelve a enviar el formulario:</p>");   
			   
	  for (int i=0; i< allErrors.size();i++) {
		  org.springframework.validation.FieldError error = (org.springframework.validation.FieldError)allErrors.get(i);
			// Message to show to each error
			String defaultMessage =error.getDefaultMessage();
			String fieldName= error.getField();				
			String fieldNameError = fieldName + "Error";
			
           out.println("<ul id=\"errorList\">"+defaultMessage+"</ul>");
			
		}	
	  out.println("</div>");
  }
--%>

<div
 style="background-image: none; background-color: rgb(255, 255, 204);"
 class="message" id="successMessages"> 
  <img src="<c:url value='/images/iconInformation.gif'/>" class="icon" alt="Information" /> 
  Les dades han estat actualitzades correctament.<br />
</div>


<div class="error" id="errorsZone" width="100%" style="background-image: none; background-color: rgb(255, 255, 204); display: visible;">    
<table>
      <tr>
        <td valign="top">       
	        <img src="<c:url value='/images/iconWarning.gif'/>" class="icon" alt="Error">
        </td>
        <td valign="top">
          <p>S'han trobat <span id="errorCount"></span> errors en el teu formulari. Si us plau, corregeixi els errors i torni a enviar el formulari.</p>
          <ul id="errorList"></ul>
        </td>                    
                            
</table>
</div>

<%--html:messages id="msg" property="org.apache.struts.action.ERROR">
	<div class="error" style="margin-left: 10px; margin-right: 10px; margin-bottom: 3px; margin-top: 3px">
		<img src="<c:url value="/images/iconWarning.gif"/>" class="icon" alt="Warning" />
		<c:out value="${msg}" escapeXml="false"/> &nbsp;&nbsp;[ <a href="javascript:showEL('errorDetails')"><b><fmt:message key="jsp.includes.see_error_details"/></b></a> ]&nbsp;&nbsp;&nbsp;[ <a href="javascript:showEL('stackTrace')"><b><fmt:message key="jsp.includes.see_stack_trace"/></b></a>]<br>
		<html:messages id="msg2" property="net.gencat.ctti.canigo.services.exceptions.Level.WARNING">
		<div id="errorDetails" style="display: none"><br><font color="#ff0000"><c:out value="${msg2}" escapeXml="false"/></font></div>
		</html:messages>
		<html:messages id="msg3" property="net.gencat.ctti.canigo.services.exceptions.Level.ERROR">
		<div id="errorDetails" style="display: none"><font color="#00cc00"><<c:out value="${msg3}" escapeXml="false"/></font></div>
		</html:messages>
		<html:messages id="msg4" property="net.gencat.ctti.canigo.services.exceptions.STACKTRACE">
		<div id="stackTrace" style="display: none"><br><pre><c:out value="${msg4}" escapeXml="false"/></pre></div>
		</html:messages>
	</div>&nbsp;
</html:messages--%>