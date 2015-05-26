package net.gencat.ctti.canigo.services.security.struts.action.admin;

import java.util.ArrayList;

import net.gencat.ctti.canigo.services.security.bo.admin.AdminBO;
import net.gencat.ctti.canigo.services.security.AuthorizationSecurityConfiguration;
import net.gencat.ctti.canigo.services.web.struts.DispatchActionSupport;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public abstract class SecurityAdminCRUDAction extends DispatchActionSupport {

    protected AdminBO adminBO = null;
    protected AuthorizationSecurityConfiguration configuration;
            
    public void setConfiguration(AuthorizationSecurityConfiguration configuration) {
        this.configuration = configuration;
    }

    public ActionForward create(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        return mapping.findForward("create");
    }
    
    protected void initializeCollections(javax.servlet.http.HttpServletRequest request) {
        request.setAttribute("applicationRolesCollection", this.adminBO.findAllApplicationRoles());        
        request.setAttribute("availableRolesCollection", this.adminBO.findAllApplicationRoles());        
        request.setAttribute("userSpecificRolesCollection", new ArrayList());
    }

    /**
     * @return Returns the adminBO.
     */
    public AdminBO getAdminBO() {
        return adminBO;
    }

    /**
     * @param adminBO The adminBO to set.
     */
    public void setAdminBO(AdminBO adminBO) {
        this.adminBO = adminBO;
    }

    /**
     * @return Returns the configuration.
     */
    public AuthorizationSecurityConfiguration getConfiguration() {
        return configuration;
    }
      

}
