package net.gencat.ctti.canigo.samples.prototip.struts.menu;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.gencat.ctti.canigo.services.logging.LoggingService;
import net.gencat.ctti.canigo.services.security.SecurityService;
import net.gencat.ctti.canigo.services.web.spring.util.WebApplicationContextUtils;

public class AcegiPermissionsFilter implements Filter{
    public void init(FilterConfig arg0) throws ServletException {
    }
    public void destroy() {
    }
    public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)arg0;
        HttpSession session = request.getSession();
        Object obj = session.getAttribute("acegiPermissionsAdapter");
        if(obj==null){
            SecurityService securityService = (SecurityService) WebApplicationContextUtils.getBeanOfType(((HttpServletRequest)arg0).getSession().getServletContext(),SecurityService.class);
            LoggingService logService = (LoggingService) WebApplicationContextUtils.getBeanOfType(((HttpServletRequest)arg0).getSession().getServletContext(),LoggingService.class);
            session.setAttribute("acegiPermissionsAdapter",new AcegiPermissionsAdapter(securityService,logService));            
        }       
        arg2.doFilter(arg0,arg1);
    }
}
