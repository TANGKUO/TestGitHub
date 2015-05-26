<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp" %>
&nbsp;<br>
<vlh:root value="list" url="categories.do?" includeParameters="reqCode" configName="vlConfig">
	<table width="100%">
		<!-- pagination section -->
		<tr>
			<td align="left" nowrap="true"><fmt:message key="jsp.categories.categoryList.textPaginacio"/><c:out
				value="${list.valueListInfo.totalNumberOfEntries}" /> <fmt:message key="jsp.categories.categoryList.textPaginacio2"/> <fmt:message key="jsp.categories.categoryList.page"/>
			(<c:out value="${list.valueListInfo.pagingPage}" /> <fmt:message key="jsp.categories.categoryList.of"/> <c:out
				value="${list.valueListInfo.totalNumberOfPages}" />)</td>
			<td align="right"><vlh:paging/></td>
		</tr>
		<!-- end of Pagination -->
		<tr>
			<td colspan="2">
			
			<table width="100%" class="classicLook" cellspacing="0"
				cellpadding="0">
				<%
					String displayProvider = (request.getAttribute("displayProvider")!=null)?request.getAttribute("displayProvider").toString():"ExportHTML";
				%>
				<vlh:row bean="category" display="<%=displayProvider%>">
					<%--vlh:attribute name="align">center</vlh:attribute--%>
					<vlh:column titleKey="jsp.categories.categoryList.id" property="id">
						<vlh:action url="categories.do?">
							<vlh:addParam name="reqCode" value="edit" temp="false" />
							<vlh:addParam name="id" property="id" temp="false" />
							<c:out value="${category.id}"></c:out>
						</vlh:action>
					</vlh:column>
					<vlh:column titleKey="jsp.categories.categoryList.desc" property="descn" sortable="desc" />
				</vlh:row>
			</table>
			<div class="exportlinks" align="left">
				<fmt:message key="jsp.common.export"/><html:link page="/categories.do?reqCode=searchExportPDF" target="_blank"><img src="<c:url value="/images/ico_pdf.gif"/>" border="0"/>&nbsp;PDF</html:link> | <html:link page="/categories.do?reqCode=searchExportExcel" target="_blank"><img src="<c:url value="/images/ico_xls.gif"/>" border="0"/>&nbsp;Excel</html:link>
			</div>	
			</td>
		</tr>
	</table>
</vlh:root>