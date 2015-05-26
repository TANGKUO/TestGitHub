package net.gencat.ctti.canigo.samples.prototip.dwr;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.gencat.ctti.canigo.services.exceptions.BusinessException;
import net.gencat.ctti.canigo.services.logging.Log;
import net.gencat.ctti.canigo.services.logging.LoggingService;
import net.gencat.ctti.canigo.services.web.taglib.util.options.OptionsListService;
import net.sf.json.JSONArray;

public class AutocompleteBean {
	
	/**
	 * Options service.
	 */
	protected OptionsListService myOptionsService;
	
	/**
	 * Logging service.
	 */
	protected LoggingService loggingService;
	
	/**
	 * Logger.
	 */
	protected Log logger;
	
	
	
			
	/**
	 * Autocomplete
	 * @param pValue, the value
	 * @param pQuery, the query.
	 */
	public String doAutocomplete(String pValue,String pQuery) throws BusinessException{
		   
		getLogger().debug("doAutocomplete:Valor:"+pValue+",Query:"+pQuery);	
		
		Map tmpMap = new HashMap();
		tmpMap.put("name",pValue+"%");		
		List tmpBeans = myOptionsService.getOptionsFromMap(pQuery,tmpMap);
		if (tmpBeans==null) {
			getLogger().error("Hay problemas al ejecutar la query "+pQuery+"  en el optionsListService");
			throw new BusinessException("La query "+pQuery+" no existe en el optionsListService");
		}
		getLogger().debug("doAutocomplete:Size:"+tmpBeans.size());	
		Iterator tmpIt = tmpBeans.iterator();
		
	    Object[] tmpArray = new Object[tmpBeans.size()];
	    int i=0;
		while (tmpIt.hasNext()) {
			Map tmpObj = (Hashtable) tmpIt.next();
			getLogger().debug("Bean:"+tmpObj+" Clase:"+tmpObj.getClass().getName());
			tmpArray[i] = tmpObj;	
			i++;
		}
		
		JSONArray tmpJSON = JSONArray.fromArray(tmpArray);
		String tmpJSONString = tmpJSON.toString();

		
		getLogger().debug("JSON Autocomplete:"+tmpJSONString);
		
		return tmpJSONString;
		
					
	}


	/**
	 * Gets the options service.
	 * @return
	 */
	public OptionsListService getOptionsService() {
		return myOptionsService;
	}


	/**
	 * Sets the options service.
	 * @param myOptionsService
	 */
	public void setOptionsService(OptionsListService myOptionsService) {
		this.myOptionsService = myOptionsService;
	}


	/**
	 * Gets the logging service.
	 * @return
	 */
	public LoggingService getLoggingService() {
		return loggingService;
	}


	/**
	 * Sets the logging service.
	 * @param loggingService
	 */
	public void setLoggingService(LoggingService loggingService) {
		this.loggingService = loggingService;
	}


	/**
	 * Gets the logger.
	 * @return
	 */
	public Log getLogger() {
		if (logger==null) {
			logger = loggingService.getLog(this.getClass());
		}
		return logger;
	}



}
