package net.gencat.ctti.canigo.services.security.exceptions.handlers;

import net.gencat.ctti.canigo.services.exceptions.BusinessException;
import net.gencat.ctti.canigo.services.exceptions.WrappedCheckedException;
import net.gencat.ctti.canigo.services.exceptions.handlers.ExceptionHandlerAdapter;

public class InvalidUsernameExceptionHandler extends ExceptionHandlerAdapter {
    public InvalidUsernameExceptionHandler() {
        super();
    }

    public void handleException(Throwable ex) throws Throwable {
        if(this.loggingService!=null){
            this.loggingService.getLog(this.getClass()).error("Se intenta acceder a un directorio que no existe!");
        }
        throw new WrappedCheckedException(ex,((BusinessException)ex).getExceptionDetails());
    }

}
