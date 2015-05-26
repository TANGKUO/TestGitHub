package net.gencat.ctti.canigo.samples.prototip.model.bo;

import java.util.List;

public interface ItemBO {	
	public net.gencat.ctti.canigo.samples.prototip.model.Item getItemById(String id) throws Exception;
	public void save(net.gencat.ctti.canigo.samples.prototip.model.Item item) throws Exception;
	public void test();
    public void saveOrUpdate(net.gencat.ctti.canigo.samples.prototip.model.Item item) throws Exception;
    public void update(net.gencat.ctti.canigo.samples.prototip.model.Item item) throws Exception;
	public void delete(net.gencat.ctti.canigo.samples.prototip.model.Item item) throws Exception ;
	public net.gencat.ctti.canigo.samples.prototip.model.Item refresh(net.gencat.ctti.canigo.samples.prototip.model.Item item) throws Exception ;
	public net.gencat.ctti.canigo.samples.prototip.model.Item load(net.gencat.ctti.canigo.samples.prototip.model.Item item);
    public List findAll();
}
