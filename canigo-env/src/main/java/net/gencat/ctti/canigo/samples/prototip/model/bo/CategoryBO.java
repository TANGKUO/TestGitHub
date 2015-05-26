package net.gencat.ctti.canigo.samples.prototip.model.bo;

import java.util.List;

public interface CategoryBO {	
	public net.gencat.ctti.canigo.samples.prototip.model.Category getCategoryById(String id) throws Exception;
	public void save(net.gencat.ctti.canigo.samples.prototip.model.Category category) throws Exception;
	public void test();
    public void saveOrUpdate(net.gencat.ctti.canigo.samples.prototip.model.Category category) throws Exception;
    public void update(net.gencat.ctti.canigo.samples.prototip.model.Category category) throws Exception;
	public void delete(net.gencat.ctti.canigo.samples.prototip.model.Category category) throws Exception ;
	public net.gencat.ctti.canigo.samples.prototip.model.Category refresh(net.gencat.ctti.canigo.samples.prototip.model.Category category) throws Exception ;
	public net.gencat.ctti.canigo.samples.prototip.model.Category load(net.gencat.ctti.canigo.samples.prototip.model.Category category);
    public List findAll();
}
