/**
 * Bussiness unit:<br>
 * Project: canigo<br>
 * ClassName: net.gencat.ctti.canigo.samples.prototip.integrationtests.JPetStoreInitializationscript.java<br>
 * Description: <br>
 * Copyright: Copyright (c) 2005<br>
 * Company: ctti<br>
 * Date: 21-nov-2005<br>
 * 
 * @author jean-michel.garnier
 * @version 1.0
 */
package net.gencat.ctti.canigo.samples.prototip.scripts;

import javax.sql.DataSource;

import net.gencat.ctti.canigo.core.util.tests.HSQLDatabaseFixture;
import net.gencat.ctti.canigo.core.util.tests.SQLScript;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;

/**
 * To be used only in a development context. Does 3 things:
 * - start HSQL db
 * - run script db creation
 * - run script dataload 
 * @author jean-michel.garnier
 *
 */
public class JPetStoreDBInitialization implements InitializingBean, DisposableBean {

    private DataSource dataSource;
            
    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }


    public void afterPropertiesSet() throws Exception {
        HSQLDatabaseFixture.start("jpetstore");
        
        // TODO add a test to check if db exists ...
        
        
        SQLScript schemaScript = new SQLScript(this.dataSource, "sql/prototip-hsqldb-schema.sql");            
        schemaScript.execute();
        
        SQLScript loadScript = new SQLScript(this.dataSource, "sql/prototip-hsqldb-dataload.sql");            
        loadScript.execute();
        
    }

    public void destroy() throws Exception {
        HSQLDatabaseFixture.stopServer();
        
    }
    

  
}