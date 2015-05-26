package net.gencat.ctti.canigo.samples.prototip.exceptions.handlers;

import net.gencat.ctti.canigo.services.exceptions.BusinessException;
import net.gencat.ctti.canigo.services.exceptions.WrappedCheckedException;
import net.gencat.ctti.canigo.services.exceptions.handlers.ExceptionHandlerAdapter;

public class UnknowDirectoryExceptionHandler extends ExceptionHandlerAdapter {
    public UnknowDirectoryExceptionHandler() {
        super();
    }

    public void handleException(Throwable ex) throws Throwable {
        if(this.loggingService!=null){
            this.loggingService.getLog(this.getClass()).error("Trying to create an existing username");
        }
        throw new WrappedCheckedException(ex,((BusinessException)ex).getExceptionDetails());
    }

}
