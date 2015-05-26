package net.gencat.ctti.canigo.samples.prototip.model.bo;

import java.util.List;

public interface ProductBO {	
	public net.gencat.ctti.canigo.samples.prototip.model.Product getProductById(String id) throws Exception;
	public void save(net.gencat.ctti.canigo.samples.prototip.model.Product product) throws Exception;
	public void test();
    public void saveOrUpdate(net.gencat.ctti.canigo.samples.prototip.model.Product product) throws Exception;
    public void update(net.gencat.ctti.canigo.samples.prototip.model.Product product) throws Exception;
	public void delete(net.gencat.ctti.canigo.samples.prototip.model.Product product) throws Exception ;
	public net.gencat.ctti.canigo.samples.prototip.model.Product refresh(net.gencat.ctti.canigo.samples.prototip.model.Product product) throws Exception ;
	public net.gencat.ctti.canigo.samples.prototip.model.Product load(net.gencat.ctti.canigo.samples.prototip.model.Product product);
    public List findAll();
}
