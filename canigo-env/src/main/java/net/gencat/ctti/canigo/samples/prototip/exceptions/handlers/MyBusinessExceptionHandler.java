package net.gencat.ctti.canigo.samples.prototip.exceptions.handlers;

import net.gencat.ctti.canigo.services.exceptions.BusinessException;
import net.gencat.ctti.canigo.services.exceptions.WrappedCheckedException;
import net.gencat.ctti.canigo.services.exceptions.handlers.ExceptionHandlerAdapter;

public class MyBusinessExceptionHandler extends ExceptionHandlerAdapter {
    public MyBusinessExceptionHandler() {
        super();
    }

    public void handleException(Throwable ex) throws Throwable {
        if(this.loggingService!=null){
            this.loggingService.getLog(this.getClass()).info("Se ha producido una excepcion de tipo "+ex.getClass().getName());
        }
        throw new WrappedCheckedException(ex,((BusinessException)ex).getExceptionDetails());
    }

}
