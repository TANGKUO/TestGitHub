package net.gencat.ctti.canigo.samples.prototip.struts.action;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import net.gencat.ctti.canigo.samples.prototip.model.Item;
import net.gencat.ctti.canigo.samples.prototip.model.Product;
import net.gencat.ctti.canigo.samples.prototip.model.bo.CategoryBO;
import net.gencat.ctti.canigo.samples.prototip.model.bo.ItemBO;
import net.gencat.ctti.canigo.samples.prototip.model.bo.ProductBO;
import net.gencat.ctti.canigo.samples.prototip.web.spring.view.document.XMLView;
import net.gencat.ctti.canigo.services.web.lists.ValueListActionHelper;
import net.gencat.ctti.canigo.services.web.struts.DispatchActionSupport;
import net.gencat.ctti.canigo.services.web.struts.SpringBindingActionForm;
import net.gencat.ctti.canigo.services.xml.XMLSerializationService;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class ProductAction extends DispatchActionSupport {
    private ProductBO productBO;
    private ItemBO itemBO;
    private CategoryBO categoryBO;
    private ValueListActionHelper valueListActionHelper;
    private XMLSerializationService serializationService;

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

    public ActionForward create(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        return mapping.findForward("create");
    }

    public ActionForward edit(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {

        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Product vo = (Product) actionForm.getTarget();
        if (vo.getId() != null) {
            productBO.refresh(vo);
        }
        return mapping.findForward("edit");
    }

    public ActionForward save(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        Product vo = (Product) actionForm.getTarget();
        if(vo.getCategory()!=null&&vo.getCategory().getId()!=null){
            this.categoryBO.refresh(vo.getCategory());
            this.logService.getLog(this.getClass()).debug("Category: "+vo.getCategory().getId());
        }
        
        if (vo.getId() != null) {
            productBO.saveOrUpdate(vo);
        }
        return mapping.findForward("success");
    }

    public ActionForward search(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {

        valueListActionHelper.search(mapping, form, request, response);
        return mapping.findForward("list");
    }

    public ProductBO getDao() {
        return productBO;
    }

    public void setDao(ProductBO productBO) {
        this.productBO = productBO;
    }

    public ValueListActionHelper getValueListActionHelper() {
        return valueListActionHelper;
    }

    public void setValueListActionHelper(
            ValueListActionHelper valueListActionHelper) {
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
     * @return Returns the categoryBO.
     */
    public CategoryBO getCategoryDao() {
        return categoryBO;
    }

    /**
     * @param categoryBO The categoryBO to set.
     */
    public void setCategoryDao(CategoryBO categoryBO) {
        this.categoryBO = categoryBO;
    }
    public ActionForward searchExportXML(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        this.logService.getLog(this.getClass()).debug("Searching products...");
        List list = ((ProductBO)this.productBO).findAll();
        this.logService.getLog(this.getClass()).debug("La lista tiene "+list.size()+" elementos");
        if(list!=null)request.setAttribute(XMLView.XML_LIST,list);
        if(serializationService!=null)request.setAttribute(XMLView.XML_SERIALIZATION_SERVICE,serializationService);
        return mapping.findForward("xml");
    }
    
    
    public ActionForward editMasterDetail(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {

        search(mapping, form, request, response);
        return mapping.findForward("edit");
    }


    
    public ActionForward saveDetail(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {

    	SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
    	
        Collection detail = actionForm.getTargetDetail();
        if (detail != null) {
            Iterator iteDetail = detail.iterator();

            while (iteDetail.hasNext()) {
            	Item vo = (Item)iteDetail.next();
            	
                if(vo.getProductid()!=null&&vo.getProductid().getId()!=null){
                    this.productBO.refresh(vo.getProductid());
                    this.logService.getLog(this.getClass()).debug("Product: "+vo.getProductid().getId());
                }

                if (vo.getId() != null) {
                    itemBO.saveOrUpdate(vo);
                }
            }
        }
        return mapping.findForward("success");
    }

	public ItemBO getItemDao() {
		return itemBO;
	}

	public void setItemDao(ItemBO itemBO) {
		this.itemBO = itemBO;
	}
}
