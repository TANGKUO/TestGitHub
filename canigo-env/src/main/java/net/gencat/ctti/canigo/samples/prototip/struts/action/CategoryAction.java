package net.gencat.ctti.canigo.samples.prototip.struts.action;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.gencat.ctti.canigo.samples.prototip.model.Category;
import net.gencat.ctti.canigo.samples.prototip.model.bo.CategoryBO;
import net.gencat.ctti.canigo.services.reporting.ReportingController;
import net.gencat.ctti.canigo.services.reporting.SpringBindingFormJRDataSource;
import net.gencat.ctti.canigo.services.web.lists.ValueListActionHelper;
import net.gencat.ctti.canigo.services.web.struts.DispatchActionSupport;
import net.gencat.ctti.canigo.services.web.struts.SpringBindingActionForm;
import net.gencat.ctti.canigo.services.xml.XMLSerializationService;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class CategoryAction extends DispatchActionSupport {
    private ValueListActionHelper valueListActionHelper;
    private XMLSerializationService serializationService;
    private CategoryBO bo;

    public ActionForward create(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        return mapping.findForward("create");
    }

    public ActionForward edit(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Category vo = (Category) actionForm.getTarget();
        if (vo.getId() != null) {
            bo.refresh(vo);
        }
        return mapping.findForward("edit");
    }

    public ActionForward save(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Category vo = (Category) actionForm.getTarget();

        if (vo.getId() != null) {
            bo.saveOrUpdate(vo);
        }
        return mapping.findForward("success");
    }

    public ActionForward saveWithError(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        this.logService.getLog(this.getClass()).debug(
                "Voy a producir un error...");
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Category vo = (Category) actionForm.getTarget();

        new ExceptionBO().execute();
        if (vo.getId() != null) {
            bo.saveOrUpdate(vo);
        }
        return mapping.findForward("success");
    }

    public ActionForward search(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        valueListActionHelper.search(mapping, form, request, response);
        return mapping.findForward("list");
    }
    public ActionForward searchExportPDF(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        request.setAttribute("displayProvider","ExportPDF");
        return this.search(mapping,form,request,response);
    }
    public ActionForward searchExportXML(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        this.logService.getLog(this.getClass()).debug("Searching categories...");
        List list = (this.bo).findAll();
        this.logService.getLog(this.getClass()).debug("La lista tiene "+list.size()+" elementos");
        if(list!=null)request.setAttribute("__list__",list);
        if(serializationService!=null)request.setAttribute("__serializationService__",serializationService);
        return mapping.findForward("xml");
    }
    public ActionForward searchExportExcel(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        request.setAttribute("displayProvider","ExportExcel");
        return this.search(mapping,form,request,response);
    }
    
    
    public CategoryBO getDao() {
        return bo;
    }

    public void setDao(CategoryBO bo) {
        this.bo = bo;
    }

    public ValueListActionHelper getValueListActionHelper() {
        return valueListActionHelper;
    }

    public void setValueListActionHelper(
            ValueListActionHelper valueListActionHelper) {
        this.valueListActionHelper = valueListActionHelper;
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
    public ActionForward report(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        this.logService.getLog(this.getClass()).debug("Finding categories...");
        List list = (this.bo).findAll();
        this.logService.getLog(this.getClass()).debug("List size="+list.size());
        if(list!=null){
            Map model = new HashMap();
            Iterator it = list.iterator();
            if(it.hasNext()){
                // Solo cogemos la primera categoria para mostrar un ejemplo de report+subreport
                Category c = (Category)it.next();
                this.logService.getLog(this.getClass()).debug("Getting first category ("+c.getId()+")...");
                SpringBindingActionForm springForm = (SpringBindingActionForm)form;
                springForm.expose(c);
                SpringBindingFormJRDataSource wrapper = new SpringBindingFormJRDataSource(springForm);
                wrapper.setLogService(this.logService);
                this.logService.getLog(this.getClass()).debug("Setting category wrapper...");
                model.put("category",wrapper);
                this.logService.getLog(this.getClass()).debug("Setting products ("+c.getProducts().size()+")...");
                model.put("products",c.getProducts());
            }
            request.getSession().setAttribute(ReportingController.REPORTING_CONTROLLER_MODEL,model);
            request.getSession().setAttribute(ReportingController.REPORTING_CONTROLLER_REPORTID,"categoriesReportView");
        }
        return mapping.findForward("reportsController");
    }

	public CategoryBO getBo() {
		return bo;
	}

	public void setBo(CategoryBO bo) {
		this.bo = bo;
	}
}
