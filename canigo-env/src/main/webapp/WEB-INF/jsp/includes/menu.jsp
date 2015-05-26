<%@ include file="/WEB-INF/jsp/includes/fwkTagLibs.jsp"%>

<div class="contenidor">
<script type="text/javascript"
	src="<c:url value="/scripts/menu/menuExpandable.js"/>"></script> <menu:useMenuDisplayer
	name="listMenu" bundle="org.apache.struts.action.MESSAGE"
	permissions="acegiPermissionsAdapter">
	<menu:displayMenu name="homepage" />
	<menu:displayMenu name="servicesMenu" />
</menu:useMenuDisplayer> <script type="text/javascript">
		initializeMenus();
	</script>
	
 </div>
<br>
<br>
<div class="striped_box"><span class="subtitol_marro"> <img
	src="<c:url value='/images/sac.gif'/>" alt="Logo Atenció Ciutadana" />
Contacteu amb els Administradors</span><br />
<br />
Teniu diferents maneres de fer-ho:<br />

<br />
<ul class="llista_inside_blau" id="llista_contacte">
	<li><a href="http://www.gencat.net/web/cat/telefon.htm">Per telèfon</a></li>
	<li><a href="http://www.gencat.net/web/cat/bustia.htm">Per correu
	electrònic</a></li>
	<li><a href="http://www.gencat.net/web/cat/oficines.htm">Presencialment</a></li>
</ul>
</div>

