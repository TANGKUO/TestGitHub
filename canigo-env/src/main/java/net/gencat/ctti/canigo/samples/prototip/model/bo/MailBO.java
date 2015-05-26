package net.gencat.ctti.canigo.samples.prototip.model.bo;

import java.util.List;

public interface MailBO {	
	public net.gencat.ctti.canigo.samples.prototip.model.Mail getMailById(String id) throws Exception;
	public void save(net.gencat.ctti.canigo.samples.prototip.model.Mail mail) throws Exception;
	public void test();
    public void saveOrUpdate(net.gencat.ctti.canigo.samples.prototip.model.Mail mail) throws Exception;
    public void update(net.gencat.ctti.canigo.samples.prototip.model.Mail mail) throws Exception;
	public void delete(net.gencat.ctti.canigo.samples.prototip.model.Mail mail) throws Exception ;
	public net.gencat.ctti.canigo.samples.prototip.model.Mail refresh(net.gencat.ctti.canigo.samples.prototip.model.Mail mail) throws Exception ;
	public net.gencat.ctti.canigo.samples.prototip.model.Mail load(net.gencat.ctti.canigo.samples.prototip.model.Mail mail);
    public List findAll();
}
