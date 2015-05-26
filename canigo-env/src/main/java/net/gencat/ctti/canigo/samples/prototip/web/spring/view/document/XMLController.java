package net.gencat.ctti.canigo.samples.prototip.web.spring.view.document;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

public class XMLController implements Controller {
    public ModelAndView handleRequest(HttpServletRequest request,
            HttpServletResponse respose) throws Exception {
        
        return new ModelAndView(new XMLView());
    }

}
