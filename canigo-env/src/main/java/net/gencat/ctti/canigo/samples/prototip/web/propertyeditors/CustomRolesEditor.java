package net.gencat.ctti.canigo.samples.prototip.web.propertyeditors;

import java.beans.PropertyEditorSupport;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import net.gencat.ctti.canigo.services.logging.LoggingService;
import net.gencat.ctti.canigo.services.security.model.Role;

public class CustomRolesEditor extends PropertyEditorSupport {
    private LoggingService logService = null;

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
    public Object getValue() {
        if(this.logService!=null){
            this.logService.getLog(this.getClass()).debug("getValue="+super.getValue());
        }
        return super.getValue();
    }
    public void setValue(Object value) {
        if(value!=null){
            if(this.logService!=null){
                this.logService.getLog(this.getClass()).debug("setValue="+value+" of class "+value.getClass().getName());
            }
            if(value instanceof String []){
                Set roles = new HashSet();
                String []ids = (String[])value;
                for(int i=0;i<ids.length;i++){
                    if (this.logService != null) {
                        this.logService.getLog(this.getClass()).debug(
                                "adding role=" + ids[i]);
                    }
                    Role r = new Role();
                    r.setId( new Integer(ids[i]) );
                    roles.add( r ); 
                }
                super.setValue(roles);
            }
            else if(value instanceof Set){
                super.setValue(value);
            }
        }
        else {
            super.setValue(value);
        }
    }
    public void setAsText(String text) throws IllegalArgumentException {
        if(text!=null){
            Set roles = new HashSet();
            if (this.logService != null) {
                this.logService.getLog(this.getClass()).debug("adding role=" + text);
            }
            Role r = new Role();
            r.setId( new Integer(text) );
            roles.add( r ); 
            super.setValue(roles);            
        }
        else {
            super.setAsText(text);
        }
    }
    public String getAsText() {
        if(this.logService!=null){
            this.logService.getLog(this.getClass()).debug("getAsText="+super.getAsText());
        }
        if(this.getValue()!=null&&this.getValue() instanceof Set){
            Set roles = (Set)this.getValue();
            StringBuffer selecteds = new StringBuffer();
            Iterator it = roles.iterator();
            while(it.hasNext()){
                Role r = (Role)it.next();
                selecteds.append(r.getId());
                if(it.hasNext()){
                    selecteds.append(",");
                }
            }
            return selecteds.toString();
        }
        return super.getAsText();
    }
}
