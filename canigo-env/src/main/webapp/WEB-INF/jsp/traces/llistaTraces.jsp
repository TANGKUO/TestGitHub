<%@ page contentType="text/html;charset=ISO-8859-1"%>
<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp"%>
&nbsp;<br>
<vlh:root value="list" url="llistaTraces.do?" includeParameters="reqCode|fitxerTraces.aplicacio.id|dia|userId|nivell|missatge" configName="vlConfig">
	<table width="100%" >
		<!-- pagination section -->
		<tr>
			<td align="left" nowrap="true">
				<fmt:message key="jsp.categories.categoryList.textPaginacio"/><c:out value="${list.valueListInfo.totalNumberOfEntries}" /> <logic:empty name="list">0</logic:empty> <fmt:message key="jsp.categories.categoryList.textPaginacio2"/> <fmt:message key="jsp.categories.categoryList.page"/>
				(<c:out value="${list.valueListInfo.pagingPage}" /><logic:empty name="list">1</logic:empty>  <fmt:message key="jsp.categories.categoryList.of"/> <c:out value="${list.valueListInfo.totalNumberOfPages}" /><logic:empty name="list">1</logic:empty>)
			</td>
			<td>
				<vlh:paging />
			</td>
		</tr>
		<!-- end of Pagination -->
		<tr>
			<td colspan="2">
			<table width="100%" align="center" class="classicLook" cellspacing="3" cellpadding="0">
				<%
					String displayProvider = (request.getAttribute("displayProvider") != null) ? request.getAttribute("displayProvider").toString(): "ExportHTML";
				%>
				<vlh:row bean="traza" display="<%=displayProvider%>">
					<vlh:column titleKey="jsp.traces.llistaTraces.hour" property="hour" attributes="align='left'"/>
					<vlh:column titleKey="jsp.traces.llistaTraces.nivell" property="nivell" attributes="align='left'"/>
					<vlh:column titleKey="jsp.traces.llistaTraces.usuari" property="userId" attributes="align='left'"/>
					<vlh:column titleKey="jsp.traces.llistaTraces.classe" property="classe" attributes="align='left'"/>
					<vlh:column titleKey="jsp.traces.llistaTraces.missatge" property="missatge" attributes="align='left' width='100%'"/>
				</vlh:row>
			</table>
			<div class="exportlinks" align="left">
				<fmt:message key="jsp.common.export"/><html:link page="/llistaTraces.do?reqCode=searchExportPDF" target="_blank"><img src="<c:url value="/images/ico_pdf.gif"/>" border="0"/>&nbsp;PDF</html:link> | <html:link page="/llistaTraces.do?reqCode=searchExportExcel" target="_blank"><img src="<c:url value="/images/ico_xls.gif"/>" border="0"/>&nbsp;Excel</html:link>
			</div>
			</td>

		</tr>
	</table>
</vlh:root>
