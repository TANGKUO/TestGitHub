package net.gencat.ctti.canigo.samples.prototip.struts.action;

import net.gencat.ctti.canigo.services.exceptions.BusinessException;

public class ExceptionBO {

    public ExceptionBO() {
        super();
    }
    public void execute() throws BusinessException{
        throw new BusinessException("test.business_error");
    }

}
