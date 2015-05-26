package net.gencat.ctti.canigo.samples.prototip.struts.menu;

import java.io.Serializable;

import net.gencat.ctti.canigo.services.logging.LoggingService;
import net.gencat.ctti.canigo.services.security.SecurityService;
import net.sf.navigator.menu.MenuComponent;
import net.sf.navigator.menu.PermissionsAdapter;

import org.apache.commons.lang.StringUtils;

public class AcegiPermissionsAdapter implements PermissionsAdapter,Serializable {
    private SecurityService securityService = null;
    private LoggingService logService = null;
    public AcegiPermissionsAdapter(SecurityService securityService,LoggingService logService) {
        this.securityService = securityService;
        this.logService = logService;
    }
    
    /**
     * If the menu is allowed, this should return true.
     *
     * @return whether or not the menu is allowed.
     */
    public boolean isAllowed(MenuComponent menu) { 
        if (menu.getRoles() == null) { 
            return true; // no roles define, allow everyone
        } else {
            // Get the list of roles this menu allows
            String[] allowedRolesArray = StringUtils.split(menu.getRoles(),",");         
            if(this.securityService!=null){
              for (int i = 0; i < allowedRolesArray.length; i++) {
                  if (this.securityService.isUserInRole(allowedRolesArray[i])) {
                      if(this.logService!=null){
                          this.logService.getLog(this.getClass()).info("User has the rol "+allowedRolesArray[i]+" to access the menu "+menu.getName());
                      }
                      return true;
                  }
              }
            }
            if(this.logService!=null){
                this.logService.getLog(this.getClass()).info("User has not roles to access the menu "+menu.getName());
            }
        }
        return false;
    }    
    
    
}
