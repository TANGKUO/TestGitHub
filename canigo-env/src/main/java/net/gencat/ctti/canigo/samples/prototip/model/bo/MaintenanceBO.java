
package net.gencat.ctti.canigo.samples.prototip.model.bo;

public interface MaintenanceBO {
    public void save(Object aBean) throws Exception;

    public void update(Object aBean) throws Exception;

    public void delete(Object aBean) throws Exception;

    public Object load(Object aBean);
}
