<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp" %>
<%@ page import="javax.servlet.http.Cookie" %>
<%@ page import="net.sf.acegisecurity.ui.rememberme.TokenBasedRememberMeServices" %>
<%
session.invalidate();
Cookie terminate = new Cookie(TokenBasedRememberMeServices.ACEGI_SECURITY_HASHED_REMEMBER_ME_COOKIE_KEY, null);
terminate.setMaxAge(0);
response.addCookie(terminate);
%>

<center><h4>S'ha sortit de la sessi&oacute;</h4></center>

