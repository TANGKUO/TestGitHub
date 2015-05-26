
package net.gencat.ctti.canigo.samples.prototip.struts.action;


//XXX CAN-40
//import net.gencat.controlpanel.model.FitxerAplicacio;
import net.gencat.ctti.canigo.services.configuration.springframework.beans.factory.config.HostPropertyPlaceholderConfigurer;
import net.gencat.ctti.canigo.services.i18n.impl.SpringI18nServiceImpl;
import net.gencat.ctti.canigo.services.logging.log4j.xml.impl.TrazaCtti;

//XXX CAN-40
//import net.gencat.controlpanel.model.bo.MonitoritzacioBO;
import net.gencat.ctti.canigo.services.web.lists.ValueListActionHelper;
import net.gencat.ctti.canigo.services.web.struts.DispatchActionSupport;
import net.gencat.ctti.canigo.services.web.struts.SpringBindingActionForm;

import org.apache.log4j.Level;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Logs use cases
 * @author MMR
 *
 */
public class TracesAction extends DispatchActionSupport {

    /** Gestor de les ValueList. */
    private ValueListActionHelper valueListActionHelper;
    private HostPropertyPlaceholderConfigurer confService;

    /**
     * Log4j levels to display in a select tag
     */
    private List levels = null;


    /**
     * @return Returns the valueListActionHelper.
     */
    public ValueListActionHelper getValueListActionHelper() {
        return valueListActionHelper;
    }

    /**
     * @param valueListActionHelper The valueListActionHelper to set.
     */
    public void setValueListActionHelper(
        ValueListActionHelper valueListActionHelper) {
        this.valueListActionHelper = valueListActionHelper;
    }

    /**
     * Redirects to select an <code>Application</code>
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    public ActionForward choose(ActionMapping mapping, ActionForm form,
        HttpServletRequest request, HttpServletResponse response)
        throws Exception {
        this.logService.getLog(this.getClass()).debug("Executing choose()...");
        this.insertLevels(request);

        return mapping.findForward("choose");
    }

    /**
     * Selects the <code>Aplicacio</code> to search it logs. Throws an exception if the <code>Aplicacio</code> does not<br>
     * have the 'PATH_TO_LOG4J_OUTPUT_FILE' saved in BD.
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    public ActionForward search(ActionMapping mapping, ActionForm form,
        HttpServletRequest request, HttpServletResponse response)
        throws Exception {
        this.logService.getLog(this.getClass()).debug("Executing search()...");

        TrazaCtti traza = (TrazaCtti) ((SpringBindingActionForm) form).getTarget();
        
        //Posem la localització del fitxer de traces XML
        traza.setRuta(confService.getProperty("ruta.fitxerLogXml"));
        
        //Es fa la cerca i es carrega a la valueList
        this.valueListActionHelper.search(mapping,form,request,response);

        //Es prepara la llista amb els nivells de les traces
        this.insertLevels(request);

        return mapping.findForward("list");
    }
    
    /**
     * Mètode per exportar a Excel el llistat
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    public ActionForward searchExportExcel(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        request.setAttribute("displayProvider","ExportExcel");
        return this.search(mapping,form,request,response);
    }
    
    /**
     * Mètode per exportar a PDF
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    public ActionForward searchExportPDF(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        request.setAttribute("displayProvider","ExportPDF");
        return this.search(mapping,form,request,response);
    }

    /**
     * Level list to display in a select tag
     * @param request
     */
    private void insertLevels(HttpServletRequest request) {
        if ((this.levels != null) && !this.levels.isEmpty()) {
            List list = new ArrayList();
            Iterator it = this.levels.iterator();

            while (it.hasNext()) {
                String level = (String) it.next();
                Level l = Level.toLevel(level);

                if (l != null) {
                    list.add(new LevelWrapper(l));
                } else {
                    this.logService.getLog(this.getClass())
                                   .warn("Unknown level " + level);
                }
            }

            request.setAttribute("levels", list);
        }
    }

    /**
     * @return Returns the levels.
     */
    public List getLevels() {
        return levels;
    }

    /**
     * @param levels The levels to set.
     */
    public void setLevels(List levels) {
        this.levels = levels;
    }

    public class LevelWrapper {
        Level level = null;

        public LevelWrapper(Level level) {
            this.level = level;
        }

        public String getDescripcio() {
            return this.level.toString();
        }

        public int getCodi() {
            return this.level.toInt();
        }
    }

	public HostPropertyPlaceholderConfigurer getConfService() {
		return confService;
	}

	public void setConfService(HostPropertyPlaceholderConfigurer confService) {
		this.confService = confService;
	}
}
