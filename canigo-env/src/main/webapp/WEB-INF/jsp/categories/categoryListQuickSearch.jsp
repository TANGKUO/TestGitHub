<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp" %>
<table width="100%">
<tr><td align="right"><a href="javascript:showEL('searchCriteria')"><fmt:message key="jsp.categories.category.amagarCerca"/></a></td>
</tr>
</table>

<script language="JavaScript1.2">

function showEL(el){
	var ele = document.getElementById(el);
	if(ele.style.display == 'none'){
		ele.style.display='';
	} else {
		ele.style.display='none';
	}
	
}


</script>
<div id="searchCriteria">
<fwk:form action="categories.do" styleId="actionForm"
				reqCode="search">
<table width="100%">
	<tr>
		<td>
			<table class="striped_box" width="100%" border="0" cellspacing="0px">
				<tr>
					<td align="right" width="70">
						<label for="descn"><fmt:message key="jsp.categories.categoryList.desc"/>:</label>
					</td>
					<td>
						<fwk:text styleId="descn" property="descn"/>
					</td>
					<td colspan="2">&nbsp;</td>
				</tr>
			
			</table>
		</td>
	</tr>
	
	
	<tr>
		<td>
		<table summary="Botons" width="100%" cellspacing="0" cellpadding="2"
			border="0">
			<tr>
				<td align="right">
				<fwk:submit styleId="cercar"/>
				<%--button type="button">Cancel·lar</button--%>
				</td>
			</tr>
		</table>
		</td>
	</tr>
	</table>
</fwk:form>
</div>