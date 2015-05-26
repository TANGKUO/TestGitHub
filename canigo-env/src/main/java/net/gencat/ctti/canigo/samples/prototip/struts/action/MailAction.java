package net.gencat.ctti.canigo.samples.prototip.struts.action;

import java.util.List;

import net.gencat.ctti.canigo.samples.prototip.model.Mail;
import net.gencat.ctti.canigo.samples.prototip.model.bo.MailBO;
import net.gencat.ctti.canigo.samples.prototip.web.spring.view.document.XMLView;
import net.gencat.ctti.canigo.services.mail.MailService;
import net.gencat.ctti.canigo.services.web.lists.ValueListActionHelper;
import net.gencat.ctti.canigo.services.web.struts.DispatchActionSupport;
import net.gencat.ctti.canigo.services.web.struts.SpringBindingActionForm;
import net.gencat.ctti.canigo.services.xml.XMLSerializationService;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class MailAction extends DispatchActionSupport {
    private ValueListActionHelper valueListActionHelper;
    private MailService mailService;
    private XMLSerializationService serializationService;
    private net.gencat.ctti.canigo.samples.prototip.model.bo.MailBO mailBO;

    public ActionForward create(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        return mapping.findForward("create");
    }

    public ActionForward edit(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Mail vo = (Mail) actionForm.getTarget();
        if (vo.getId() != null) {
            mailBO.refresh(vo);
        }
        return mapping.findForward("edit");
    }

    public ActionForward cancel(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        return mapping.findForward("success");
    }
    public ActionForward send(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {

        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Mail vo = (Mail) actionForm.getTarget();
        this.logService.getLog(this.getClass()).debug("Sending mail from "+vo.getFromAddress()+" with subject "+vo.getSubject()+" and message "+vo.getMessage()+" to "+vo.getToAddress());
        this.mailService.send(vo.getFromAddress(),vo.getSubject(),vo.getMessage(),false,vo.getToAddress());
        this.mailBO.save((Mail) actionForm.getTarget());
        return mapping.findForward("success");
    }
    
    public ActionForward search(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        valueListActionHelper.search(mapping, form, request, response);
        return mapping.findForward("list");
    }
    
    
    public MailBO getDao() {
        return mailBO;
    }

    public void setDao(MailBO mailBO) {
        this.mailBO = mailBO;
    }

    public ValueListActionHelper getValueListActionHelper() {
        return valueListActionHelper;
    }

    public void setValueListActionHelper(
            ValueListActionHelper valueListActionHelper) {
        this.valueListActionHelper = valueListActionHelper;
    }
    public ActionForward delete(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response)
            throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Mail vo = (Mail) actionForm.getTarget();
        this.logService.getLog(this.getClass()).debug("Deleting Mail: "+vo.getId());
        if (vo.getId() != null) {
            mailBO.refresh(vo);
            mailBO.delete(vo);
        }
        return mapping.findForward("success");
    }

    /**
     * @return Returns the mailService.
     */
    public MailService getMailService() {
        return mailService;
    }

    /**
     * @param mailService The mailService to set.
     */
    public void setMailService(MailService mailService) {
        this.mailService = mailService;
    }

    /**
     * @return Returns the serializationService.
     */
    public XMLSerializationService getSerializationService() {
        return serializationService;
    }

    /**
     * @param serializationService The serializationService to set.
     */
    public void setSerializationService(XMLSerializationService serializationService) {
        this.serializationService = serializationService;
    }
    public ActionForward searchExportXML(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        this.logService.getLog(this.getClass()).debug("Searching mails...");
        List list = ((MailBO)this.mailBO).findAll();
        this.logService.getLog(this.getClass()).debug("La lista tiene "+list.size()+" elementos");
        if(list!=null)request.setAttribute(XMLView.XML_LIST,list);
        if(serializationService!=null)request.setAttribute(XMLView.XML_SERIALIZATION_SERVICE,serializationService);
        return mapping.findForward("xml");
    }
}
