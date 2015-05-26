package net.gencat.ctti.canigo.samples.prototip.ole.views;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hwpf.usermodel.CharacterProperties;
import org.apache.poi.hwpf.usermodel.Range;

import net.gencat.ctti.canigo.samples.prototip.model.Item;
import net.gencat.ctti.canigo.services.logging.LoggingService;
import net.gencat.ctti.canigo.services.ole.exception.OleServiceException;
import net.gencat.ctti.canigo.services.ole.impl.WordDocument;
import net.gencat.ctti.canigo.services.ole.impl.WrapperWordView;

public class ItemsWordView extends WrapperWordView {
    private LoggingService logService = null;
    /**
     * Subclasses must implement this method to create an Word WordDocument document,
     * given the model.
     * @param model the model Map
     * @param WordDocument Word document
     * @param request in case we need locale etc. Shouldn't look at attributes.
     * @param response in case we need to set co    java.util.List listText = _tpt.getTextPieces();
     */
    protected void wrappedBuildWordDocument(
            Map model, WordDocument wordDocument, HttpServletRequest request, HttpServletResponse response)
            throws OleServiceException{
        // TODO
        List list = (List)model.get(this.getBeanList());
        
        if (logService!=null)       
          this.logService.getLog(this.getClass()).debug("Found list?"+(list!=null));
          
          
          
        if(list!=null){
            Iterator it = list.iterator();
            Range range = new Range(0, wordDocument.characterLength(), wordDocument);
            while(it.hasNext()){
                Item item = (Item)it.next();
                CharacterProperties props = new CharacterProperties();
                props.setBold(true);
                range = range.insertAfter(" Item ID="+item.getId()+"\r", props);
                props.setBold(false);
                range = range.insertAfter(" Name: ",props);
                props.setItalic(true);
                range = range.insertAfter(" "+item.getAttr1());
                props.setItalic(false);
                range = range.insertAfter(", Product: ",props);
                props.setItalic(true);
                range = range.insertAfter(" "+item.getProductid().getName(),props);
                props.setItalic(false);
                range = range.insertAfter(", Category: ",props);
                props.setItalic(true);
                range = range.insertAfter(" "+item.getProductid().getCategory().getName()+"\r",props);
            }
        }
    }
    /**
     * @return Returns the logService.
     */
    public LoggingService getLogService() {
        return logService;
    }
    /**
     * @param logService The logService to set.
     */
    public void setLogService(LoggingService logService) {
        this.logService = logService;
    }
}
