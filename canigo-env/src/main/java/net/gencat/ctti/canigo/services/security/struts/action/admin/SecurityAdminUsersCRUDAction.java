package net.gencat.ctti.canigo.services.security.struts.action.admin;

import net.gencat.ctti.canigo.services.security.model.UserLogin;
import net.gencat.ctti.canigo.services.web.struts.SpringBindingActionForm;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class SecurityAdminUsersCRUDAction extends SecurityAdminCRUDAction {
    public ActionForward edit(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        UserLogin pojo = ((UserLogin) ((SpringBindingActionForm) form).getTarget());
        
        this.adminBO.refresh(pojo);

        request.setAttribute("applicationRolesCollection", this.adminBO.findAllApplicationRoles());        
        request.setAttribute("availableRolesCollection", this.adminBO.getAvailableRoles(pojo));        
        request.setAttribute("userSpecificRolesCollection", pojo.getRoles());
        
        return mapping.findForward("edit");
    }
    
    public ActionForward create(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        
        initializeCollections(request);
        
        return mapping.findForward("create");
    }
    
    public ActionForward save(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;                       
        this.adminBO.saveOrUpdate((UserLogin)actionForm.getTarget());
        return mapping.findForward("success");
    }
    public ActionForward delete(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;                       
        this.adminBO.delete((UserLogin)actionForm.getTarget());
        return mapping.findForward("success");
    }    
    public ActionForward saveNew(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        this.adminBO.save((UserLogin)actionForm.getTarget());
        return mapping.findForward("success");
    }
}
