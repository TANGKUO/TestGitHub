package net.gencat.ctti.canigo.samples.prototip.struts.action;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.gencat.ctti.canigo.samples.prototip.model.Item;
import net.gencat.ctti.canigo.samples.prototip.model.bo.ItemBO;
import net.gencat.ctti.canigo.samples.prototip.model.bo.ProductBO;
import net.gencat.ctti.canigo.samples.prototip.web.spring.view.document.XMLView;
import net.gencat.ctti.canigo.services.exceptions.BusinessException;
import net.gencat.ctti.canigo.services.ole.OleController;
import net.gencat.ctti.canigo.services.reporting.ReportingController;
import net.gencat.ctti.canigo.services.web.lists.ValueListActionHelper;
import net.gencat.ctti.canigo.services.web.struts.DispatchActionSupport;
import net.gencat.ctti.canigo.services.web.struts.SpringBindingActionForm;
import net.gencat.ctti.canigo.services.xml.XMLSerializationService;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.hibernate.Hibernate;


public class ItemAction extends DispatchActionSupport {	
	private ItemBO itemBO;
    private ProductBO productBO;
    private XMLSerializationService serializationService;
    private ValueListActionHelper valueListActionHelper;
    
    public ActionForward edit(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Item vo = (Item) actionForm.getTarget();
		if(vo.getId()!=null){
			itemBO.refresh(vo);
		}
		return mapping.findForward("edit");
    }
    public ActionForward create(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        this.logService.getLog(this.getClass()).debug("Creating new item...");
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Item vo = (Item) actionForm.getTarget();
        if(vo.getProductid()!=null&&vo.getProductid().getId()!=null){
            this.productBO.refresh(vo.getProductid());
            this.logService.getLog(this.getClass()).debug("Product: "+vo.getProductid().getId());
        }
        
        return mapping.findForward("create");
    }
   
    
    public ActionForward save(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response)
            throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Item vo = (Item) actionForm.getTarget();
        this.logService.getLog(this.getClass()).debug("Saving item: "+vo.getId()+" with product "+vo.getProductid());
        if(vo.getProductid()!=null&&vo.getProductid().getId()!=null){
            this.productBO.refresh(vo.getProductid());
            this.logService.getLog(this.getClass()).debug("Product: "+vo.getProductid().getId());
        }

        if (vo.getId() != null) {
            itemBO.saveOrUpdate(vo);
        }
        return mapping.findForward("success");
    }
    public ActionForward delete(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response)
            throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Item vo = (Item) actionForm.getTarget();
        this.logService.getLog(this.getClass()).debug("Deleting item: "+vo.getId());
        if (vo.getId() != null) {
            itemBO.refresh(vo);
            itemBO.delete(vo);
        }
        return mapping.findForward("success");
    }
    public ActionForward saveNew(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response)
            throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Item vo = (Item) actionForm.getTarget();

        if (vo.getId() != null) {
            Item existingItem = itemBO.getItemById(vo.getId());
            if(existingItem!=null){
                throw new BusinessException("items.duplicated_item",new Object[]{vo.getId()});
            }
            itemBO.save(vo);
        }
        return mapping.findForward("success");
    }

    public ActionForward search(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response)
            throws Exception {
            
        	valueListActionHelper.search(mapping,form,request,response);
            return mapping.findForward("list");
    }    
    	
    /**
     * @return Returns the productBO.
     */
    public ProductBO getProductDao() {
        return productBO;
    }
    /**
     * @param productBO The productBO to set.
     */
    public void setProductDao(ProductBO productBO) {
        this.productBO = productBO;
    }
	public ValueListActionHelper getValueListActionHelper() {
		return valueListActionHelper;
	}
	public void setValueListActionHelper(ValueListActionHelper valueListActionHelper) {
		this.valueListActionHelper = valueListActionHelper;
	}
    public ActionForward searchExportPDF(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        request.setAttribute("displayProvider","ExportPDF");
        return this.search(mapping,form,request,response);
    }
    public ActionForward searchExportExcel(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        request.setAttribute("displayProvider","ExportExcel");
        return this.search(mapping,form,request,response);
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
        this.logService.getLog(this.getClass()).debug("Searching items...");
        List list = (this.itemBO).findAll();
        this.logService.getLog(this.getClass()).debug("La lista tiene "+list.size()+" elementos");
        if(list!=null)request.setAttribute(XMLView.XML_LIST,list);
        if(serializationService!=null)request.setAttribute(XMLView.XML_SERIALIZATION_SERVICE,serializationService);
        return mapping.findForward("xml");
    }
    public ActionForward viewOleWord(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        this.logService.getLog(this.getClass()).debug("Searching items...");
        List list = (this.itemBO).findAll();
        this.logService.getLog(this.getClass()).debug("List size="+list.size());
        if(list!=null){
            Map model = new HashMap();
            Iterator it = list.iterator();
            while(it.hasNext()){
                Item i = (Item)it.next();
                Hibernate.initialize(i.getProductid().getCategory());
            }
            model.put("itemList",list);
            request.getSession().setAttribute(OleController.OLE_CONTROLLER_MODEL,model);
            request.getSession().setAttribute(OleController.OLE_CONTROLLER_VIEWID,"itemsWordView");
        }
        return mapping.findForward("oleController");
    }
    public ActionForward report(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        this.logService.getLog(this.getClass()).debug("Searching items...");
        List list = (this.itemBO).findAll();
        this.logService.getLog(this.getClass()).debug("List size="+list.size());
        if(list!=null){
            Map model = new HashMap();
            Iterator it = list.iterator();
            while(it.hasNext()){
                Item i = (Item)it.next();
                Hibernate.initialize(i.getProductid().getCategory());
            }
            model.put("itemList",list);
            model.put("title","Items");
            request.getSession().setAttribute(ReportingController.REPORTING_CONTROLLER_MODEL,model);
            request.getSession().setAttribute(ReportingController.REPORTING_CONTROLLER_REPORTID,"itemsReportView");
        }
        return mapping.findForward("reportsController");
    }
	public ProductBO getProductBO() {
		return productBO;
	}
	public void setProductBO(ProductBO productBO) {
		this.productBO = productBO;
	}
	public ItemBO getItemBO() {
		return itemBO;
	}
	public void setItemBO(ItemBO itemBO) {
		this.itemBO = itemBO;
	}
}
