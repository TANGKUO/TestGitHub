package net.gencat.ctti.canigo.samples.prototip.struts.action;

import net.gencat.ctti.canigo.samples.prototip.model.Account;
import net.gencat.ctti.canigo.samples.prototip.model.bo.AccountBO;
import net.gencat.ctti.canigo.services.web.struts.DispatchActionSupport;
import net.gencat.ctti.canigo.services.web.struts.SpringBindingActionForm;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

/**
 * Action example for Accounts
 * @author XES 
 */

public class TabsAction extends DispatchActionSupport {
    private AccountBO accountBO = null;
    public ActionForward edit(ActionMapping mapping, ActionForm form,
        javax.servlet.http.HttpServletRequest request,
        javax.servlet.http.HttpServletResponse response)
        throws Exception {
        Account vo  = (Account)((SpringBindingActionForm)form).getTarget();
        vo.setId("ACID");
        accountBO.refresh(vo);
        return mapping.findForward("tab1");
    }

    public ActionForward view(ActionMapping mapping, ActionForm form,
        javax.servlet.http.HttpServletRequest request,
        javax.servlet.http.HttpServletResponse response)
        throws Exception {
        return mapping.findForward("tab2");
    }

    /**
     * @return Returns the accountBO.
     */
    public AccountBO getAccountDao() {
        return accountBO;
    }

    /**
     * @param accountBO The accountBO to set.
     */
    public void setAccountDao(AccountBO accountBO) {
        this.accountBO = accountBO;
    }

	public AccountBO getAccountBO() {
		return accountBO;
	}

	public void setAccountBO(AccountBO accountBO) {
		this.accountBO = accountBO;
	}
}
