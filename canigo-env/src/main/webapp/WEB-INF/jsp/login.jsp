<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp"%>
<%@ page contentType="text/html;charset=ISO-8859-1"%>
<%response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
			response.setHeader("Pragma", "no-cache"); //HTTP 1.0
			response.setDateHeader("Expires", 0); //prevents caching at the proxy server

			%>
<html>
<head>
<title>Registre Entrada</title>
<link rel="stylesheet" href='<c:url value="/css/import.css"/>' type="text/css" />
<fwk:configuration styleId="defaultConfiguration" />
<script>
	var contextPath = '<c:url value="/"/>'.substring(0,'<c:url value="/"/>'.length-1);
</script>
</head>
<body>
<div id="outer">
	<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="1" WIDTH="100%">
	<TR>
		<TD ALIGN="CENTER" VALIGN="TOP" style="text-align:center"><BR>
		<center>
		<table border="0" cellpadding="2">
			<tr>
				<TD WIDTH="100%" VALIGN="TOP" style="text-align:center"><!-- Contenido principal -->

				<%@ page import="net.sf.acegisecurity.ui.AbstractProcessingFilter"%>
				<%@ page
					import="net.sf.acegisecurity.ui.webapp.AuthenticationProcessingFilter"%>
				<%@ page import="net.sf.acegisecurity.AuthenticationException"%> 
				<c:if test="${not empty param.login_error}">
					<font color="red"> <fmt:message key="jsp.login.error" /><BR>
					<%=session
									.getAttribute(AbstractProcessingFilter.ACEGI_SECURITY_LAST_EXCEPTION_KEY)%>
					</font>
				</c:if>
				<div class="Container">
					<div id="imatge">
						<img src="<c:url value="/images/logo.gif"/>" border="0" alt="logo_ctti" width="207">
					</div>
					<div id="separador"></div>

				<div id="Dialog">
				<form action="<c:url value="/j_acegi_security_check"/>" method="post">
				<fieldset style="border:0">
					<table width="300" border="0">
				      <tr>
				        <td align="right"><font class="asterisc">*&nbsp;</font><fmt:message key="jsp.login.user" />:</td>
				        <td><input class="textLogin" type='text' name='j_username' value=""
							<c:if test="${not empty param_error}">value='<%= session.getAttribute(AuthenticationProcessingFilter.ACEGI_SECURITY_LAST_USERNAME_KEY) %>'</c:if>></td>
				      </tr>
				      <tr>
				        <td align="right"><font class="asterisc">*&nbsp;</font><fmt:message key="jsp.login.password" />:</td>
				        <td><input class="textLogin" type='password' name='j_password' value=""></td>
				      </tr>
				      <tr>
				        <td colspan="2" align="center"><br><input class="botoLogin" type="submit" value="<fmt:message key="jsp.login.sumbit"/>          " /></td>
				      </tr>
				    </table>
				</fieldset>
				</form>
				</div>
				</TD>
			</tr>
		</table>
		<fmt:message key="jsp.login.disclaimer" />
		<BR>
		<BR>
		&nbsp;
		</TD>
	</TR>
</TABLE>
	<div id="bottom-section">
		<div id="bottom-col-1">
			<tiles:insert attribute='footer' />
		</div>
	</div>
</div>
</body>
</html>
