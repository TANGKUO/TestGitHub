<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp"%>
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
				
				function clean(){
					document.forms[0].userId.value='';
					document.forms[0].dia.value='';
					document.forms[0].nivell.selectedIndex=5;
					document.forms[0].missatge.value='';
				}
				

			</script>
<fwk:form action="llistaTraces.do"
	styleId="actionForm" reqCode="search">
<div id="searchCriteria">
	<table width="100%">
		<tr>
			<td>
			<table class="striped_box" width="100%" border="0" cellspacing="0px">
				<tr>
					<td align="right" width="70"><input
						type="hidden" name="pagingPage" value="1"><label for="userId"><fmt:message
						key="forms.traces.llistaTraces.usuari" />:</label></td>
					<td width="150"><fwk:text styleId="userId"
						property="userId" size="50"/></td>
					<td colspan="2">&nbsp;</td>
				</tr>
				<tr>
					<td align="right"><label for="dia"><fmt:message
						key="forms.traces.llistaTraces.dia" />:</label></td>
					<td><fwk:text styleId="dia" property="dia" size="12" /></td>
					<td align="right"  width="50"><label for="nivell"><fmt:message
						key="forms.traces.llistaTraces.nivell" />:</label></td>
					<td><fwk:select otherKey="blank" styleId="nivell" property="nivell">
						<fwk:options styleId="nivellOptions" collection="levels"
							property="descripcio" labelProperty="descripcio" />
					</fwk:select></td>
				</tr>
				<tr>
					<td align="right"><label for="missatge"><fmt:message
						key="forms.traces.llistaTraces.missatge" />:</label></td>
					<td><fwk:text styleId="missatge" property="missatge"
						size="70" /></td>
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
					<td align="right"><fwk:submit styleId="search" /></td>
				</tr>
			</table>
			</td>
		</tr>
	</table>
</div>
</fwk:form>
