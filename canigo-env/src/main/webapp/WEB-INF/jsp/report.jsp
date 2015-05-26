<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp" %>
<fmt:message key="jsp.common.report.desc"/>
<table><tr><td style="text-align:left">
<ul>
	<li><html:link page="/categories.do?reqCode=report" target="_new"><fmt:message key="jsp.categories.categoryListMenu.categories"/></html:link></li>
	<li><html:link page="/items.do?reqCode=report" target="_new"><fmt:message key="jsp.items.itemMenu.items"/></html:link></li>
</ul>
</tr></td></table>