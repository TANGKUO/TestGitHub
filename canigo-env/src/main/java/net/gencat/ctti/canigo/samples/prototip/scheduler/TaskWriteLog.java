package net.gencat.ctti.canigo.samples.prototip.scheduler;

import org.apache.log4j.Logger;


public class TaskWriteLog {

	public TaskWriteLog() {
    }

    public void writeLog() {
    	
		Logger logger = Logger.getLogger(this.getClass());
		logger.debug(getLog());

    }

    
    public String getLog() {
    	return "Doing log from scheduler at: "+System.currentTimeMillis();
    }
}