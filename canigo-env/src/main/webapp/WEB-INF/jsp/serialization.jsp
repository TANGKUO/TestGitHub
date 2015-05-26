<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp" %>
<fmt:message key="jsp.common.serialization.desc"/>
<table><tr><td style="text-align:left">
<ul>
	<li><html:link page="/categories.do?reqCode=searchExportXML" target="_new"><fmt:message key="jsp.categories.categoryMenu.categories"/></html:link></li>
	<li><html:link page="/products.do?reqCode=searchExportXML" target="_new"><fmt:message key="jsp.products.productMenu.products"/></html:link></li>
	<li><html:link page="/items.do?reqCode=searchExportXML" target="_new"><fmt:message key="jsp.items.itemMenu.items"/></html:link></li>
	<li><html:link page="/mails.do?reqCode=searchExportXML" target="_new"><fmt:message key="jsp.mails.mailMenu.mails"/></html:link></li>
</ul>
</td></tr></table>
