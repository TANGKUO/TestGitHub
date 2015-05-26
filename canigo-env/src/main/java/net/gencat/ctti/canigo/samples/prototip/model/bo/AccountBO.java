package net.gencat.ctti.canigo.samples.prototip.model.bo;

import java.util.List;

public interface AccountBO {	
	public net.gencat.ctti.canigo.samples.prototip.model.Account getAccountById(String id) throws Exception;
	public void save(net.gencat.ctti.canigo.samples.prototip.model.Account account) throws Exception;
	public void test();
    public void saveOrUpdate(net.gencat.ctti.canigo.samples.prototip.model.Account account) throws Exception;
    public void update(net.gencat.ctti.canigo.samples.prototip.model.Account account) throws Exception;
	public void delete(net.gencat.ctti.canigo.samples.prototip.model.Account account) throws Exception ;
	public net.gencat.ctti.canigo.samples.prototip.model.Account refresh(net.gencat.ctti.canigo.samples.prototip.model.Account account) throws Exception ;
	public net.gencat.ctti.canigo.samples.prototip.model.Account load(net.gencat.ctti.canigo.samples.prototip.model.Account account);
    public List findAll();
}
