package net.gencat.ctti.canigo.services.security.struts.action.admin;

import net.gencat.ctti.canigo.services.web.lists.ValueListActionHelper;
import net.gencat.ctti.canigo.services.web.struts.DispatchActionSupport;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class SecurityAdminSearchAction extends DispatchActionSupport {
    private ValueListActionHelper valueListActionHelper;
    
    public ActionForward search(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
                             
        valueListActionHelper.search(mapping, form, request, response);
        return mapping.findForward("list");
    }
            
    public void setValueListActionHelper(
            ValueListActionHelper valueListActionHelper) {
        this.valueListActionHelper = valueListActionHelper;
    }

}
