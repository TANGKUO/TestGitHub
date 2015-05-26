package net.gencat.ctti.canigo.samples.prototip.web.spring.view.document;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.gencat.ctti.canigo.services.xml.XMLSerializationService;
import net.gencat.ctti.canigo.services.xml.exception.XMLSerializationServiceException;

import org.springframework.web.servlet.view.AbstractView;

public class XMLView extends AbstractView {
    public static String XML_LIST = "__list__";
    public static String XML_SERIALIZATION_SERVICE = "__serializationService__";
    
    private static org.apache.log4j.Logger log = org.apache.log4j.Logger
            .getLogger(XMLView.class);
    public XMLView(){
        setContentType("application/xml");
    }
    protected void renderMergedOutputModel(Map model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        List list = (List)request.getAttribute(XML_LIST);
        XMLSerializationService serService = (XMLSerializationService)request.getAttribute(XML_SERIALIZATION_SERVICE);;
        log.debug("Se ha encontrado el servicio?"+(serService!=null));
        log.debug("Se ha encontrado la lista?"+(list!=null));
        if(list==null){
            String[] args = new String []{request.getContextPath(), request.getRequestURL().toString(), request.getQueryString()};
            throw new XMLSerializationServiceException("canigo.samples.prototip.noList2Serialize",args);
        }
        if(serService==null){
            String[] args = new String []{request.getContextPath(), request.getRequestURL().toString(), request.getQueryString()};
            throw new XMLSerializationServiceException("canigo.samples.prototip.noXMLSerializationSerialize",args);
        }
        response.addHeader("Content-Disposition", "attachment; filename=file.xml");      
        // aquí escribo el xml
        // Write content type and also length (determined via byte array).
        String xml = serService.toXML(list);
        response.setContentType(getContentType());
        response.setContentLength(xml.getBytes().length);

        // Flush byte array to servlet output stream.
        ServletOutputStream out = response.getOutputStream();
        out.write(xml.getBytes());
        out.flush();
    }
}
