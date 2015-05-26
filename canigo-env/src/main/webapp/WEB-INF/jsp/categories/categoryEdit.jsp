<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp"%>
<script type='text/javascript'
	src="<c:url value="/AppJava/dwr/interface/webValidationService.js"/>"></script>
<script
	src="<c:url value="/scripts/tooltips/wz_tooltip/wz_tooltip.js"/>"
	type='text/javascript'></script>
<script src="<c:url value="/scripts/tooltips/dom_tooltip/domLib.js"/>"
	type="text/javascript"></script>
<script src="<c:url value="/scripts/tooltips/dom_tooltip/domTT.js"/>"
	type="text/javascript"></script>
<script src="<c:url value="/scripts/Tokenizer/Tokenizer.js"/>"
	type="text/javascript"></script>
<script
	src="<c:url value="/scripts/ajax/ajaxtags/canigo-ajaxtags-validation.js"/>"
	type="text/javascript"></script>
<script src="<c:url value="/scripts/ajax/json/json.js"/>"
	type="text/javascript"></script>
<script src="<c:url value="/scripts/swap/canigo-options-tag.js"/>"
	type="text/javascript"></script>
<script src="<c:url value="/scripts/swap/selectbox.js"/>"
	type="text/javascript"></script>
<script type='text/javascript'
	src="<c:url value="/AppJava/dwr/interface/autocompleteService.js"/>"></script>
<script type='text/javascript'
	src="<c:url value="/AppJava/dwr/interface/searchPanelService.js"/>"></script>
<script
	src="<c:url value="/scripts/ajax/ajaxtags/canigo-ajaxtags-searchPanel.js"/>"
	type="text/javascript"></script>
<script
	src="<c:url value="/scripts/dojo/canigo-dirtyFormWarning-tag.js"/>"
	type="text/javascript"></script>
<script src="<c:url value="/scripts/dojo/dojo.js"/>"
	type="text/javascript"></script>
<script src="<c:url value="/scripts/dojo/io.js"/>"
	type="text/javascript"></script>

<script language="JavaScript1.2"></script>

&nbsp;
<div align="left">
<fwk:form styleClass="edit" action="categories.do"
		styleId="actionForm" reqCode="save" align="left" width="500"
		method="post">

	<table class="striped_box" width="100%" border="0" cellspacing="0px">
	<tr>
		<td>
		<fwk:gridBagLayout gridStyleId="grid" size="3,3"
			styleClass="*:0=cellLabels,*:1=cellTexts,*:2=cellIcons">
			
			
			<fwk:label styleId="nameLabel" id="id" key="category.id"
				styleClass="label" /><!--  id  -->
			<fwk:text styleId="id" property="id" styleClass="fieldText" />
			<span>&nbsp;</span>
			
			
			<fwk:label styleId="nameLabel" id="name" key="category.name"
				styleClass="label" /><!--  name -->
			<fwk:text styleId="name" property="name"
				validations="ONCHANGE(required,maxlength{maxlength:6})"
				validationFieldMessageMode="ICON,TOOLTIP,CHANGESTYLE"
				sourceErrorTooltip="TEXT" iconStyleId="nameIconError"
				errorClass="errorNew" errorKey="forms.categoryForm.field.name"
				styleClass="fieldText" />
			<span><fwk:iconError styleId="nameIconError" style="display:none">
				<img src="<c:url value="/images/iconWarning.gif"/>" id="imagen"
					class="icon" alt="Warning" />
			</fwk:iconError></span>
	
			
			<fwk:label styleId="nameLabel" id="id" key="category.descn"
				styleClass="label" /><!--  descn  -->
			<fwk:text styleId="descn" property="descn" styleClass="fieldText" />
			<span><img src="<c:url value="/images/amplia.gif"/>" id="searchPanelButton"
				alt="Search" />
	
			<fwk:iconError styleId="descnIconError" style="display:none">
				<img src="<c:url value="/images/iconWarning.gif"/>" id="imagen"
					class="icon" alt="Warning" />
			</fwk:iconError></span>	
		</fwk:gridBagLayout>
		</td>
	</tr>
	</table>
	&nbsp;
	<table width="100%" cellspacing="0" cellpadding="2" border="0">
		<tr>
			<td align="right">
				<fwk:submit styleId="saveActionImage" />
				<fwk:submit styleId="saveNewActionImage" />
				<fwk:submit styleId="cancelar" onclick="javascript:$('descn').value='';"/>
			</td>
		</tr>
		<tr>
		<td>
			&nbsp;
		</td>
		</tr>
	</table>
	
	
	
	
	<fwk:fieldValidator styleId="descnValidator"
		source="descn" validations="ONSUBMIT(required)"
		validationFieldMessageMode="ICON,TOOLTIP,CHANGESTYLE"
		sourceErrorTooltip="TEXT" iconStyleId="descnIconError"
		errorClass="errorNew" errorKey="forms.categoryForm.field.descn" />
	<fwk:dirtyFormWarning
		styleId="formWarning" source="actionForm" messageKey="dirtyForm.error" />
	<fwk:searchPanel styleId="searchPanel" source="searchPanelButton"
		target="descn" popupId="searchPanelDiv" optionsListName="productList"
		tableProperties="id,name,category.id,descn"
		selectedProperty="category.id"
		columnLabels="ident.label,nom.label,category.label,desc.label"
		indicator="successMessages" queryParameter="name" />
</fwk:form>
</div>

