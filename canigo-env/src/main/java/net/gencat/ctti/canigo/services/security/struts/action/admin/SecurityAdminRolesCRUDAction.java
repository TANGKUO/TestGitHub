package net.gencat.ctti.canigo.services.security.struts.action.admin;

import net.gencat.ctti.canigo.services.security.model.Role;
import net.gencat.ctti.canigo.services.web.struts.SpringBindingActionForm;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class SecurityAdminRolesCRUDAction extends SecurityAdminCRUDAction {
    public ActionForward edit(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        this.adminBO.refresh((Role)actionForm.getTarget());
        request.setAttribute("securedUrlsList", this.configuration.getSecuredUrls((Role)actionForm.getTarget()));
        request.setAttribute("securedMethodsList", this.configuration.getSecuredMethods((Role)actionForm.getTarget()));
        return mapping.findForward("edit");
    }

    public ActionForward save(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;                       
        this.adminBO.saveOrUpdate((Role)actionForm.getTarget());
        return mapping.findForward("success");
    }
    public ActionForward delete(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;                       
        this.adminBO.delete((Role)actionForm.getTarget());
        return mapping.findForward("success");
    }    
    public ActionForward saveNew(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        this.adminBO.save((Role)actionForm.getTarget());
        return mapping.findForward("success");
    }
}
