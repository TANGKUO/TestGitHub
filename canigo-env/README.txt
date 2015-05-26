Aquesta plantilla conté un petit manteniment i un exemple de com fer un llistat
dels logs a través de XML.

Per usar la plantilla només cal utilitzar l'eina d'importació d'eclipse.

Tanmateix aquesta plantilla també té els scripts, les imatges i els css.

===================
= Starting TOMCAT =
===================

(1) Para iniciar la aplicación desde eclipse con tomcat, hay que añadir al contexto 
  (poner dentro del tag <Context/> del 'server.xml') el siguiente datasource:


<Resource name="formacioDS" auth="Container" type="javax.sql.DataSource"/> 		
			<ResourceParams name="formacioDS">
			<parameter>
							<name>driverClassName</name>
							<value>
								oracle.jdbc.driver.OracleDriver
							</value>
						</parameter>
						<parameter>
							<name>url</name>
							<value>
								jdbc:oracle:thin:@bna-s007.es.int.atosorigin.com:1521:Legolas
							</value>
						</parameter>
						<parameter>
							<name>username</name>
							<value>openframe</value>
						</parameter>
						<parameter>
							<name>password</name>
							<value>openframe</value>
						</parameter>
						<parameter>
							<name>maxActive</name>
							<value>20</value>
						</parameter>
						<parameter>
							<name>maxIdle</name>
							<value>10</value>
						</parameter>
						<parameter>
							<name>maxWait</name>
							<value>-1</value>
						</parameter>
			
			  <!-- parameter>
			    <name>driverClassName</name>
			    <value>oracle.jdbc.driver.OracleDriver</value>
			  </parameter>
			  <parameter>
			    <name>url</name>
			    <value>jdbc:oracle:thin:@es-3q0k42j.es.int.atosorigin.com:1521:orcl</value>
			  </parameter>
			  <parameter>
			    <name>username</name>
			    <value>tse</value>
			  </parameter>
			  <parameter>
			    <name>password</name>
			    <value>tse</value>
			  </parameter>
			  <parameter>
			    <name>maxActive</name>
			    <value>20</value>
			  </parameter>
			  <parameter>
			    <name>maxIdle</name>
			    <value>10</value>
			  </parameter>
			  <parameter>
			    <name>maxWait</name>
			    <value>-1</value>
			  </parameter-->
			</ResourceParams>
			
			
(2) Poner el jar con los drivers de oracle en 
		$CATALINA_HOME$/common/lib

(3) Republicar el contexto desde el eclipse (importante)