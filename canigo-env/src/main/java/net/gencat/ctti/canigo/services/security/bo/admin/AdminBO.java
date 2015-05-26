package net.gencat.ctti.canigo.services.security.bo.admin;

import java.util.Collection;
import java.util.List;

import net.gencat.ctti.canigo.services.security.model.PartyGroup;
import net.gencat.ctti.canigo.services.security.model.Role;
import net.gencat.ctti.canigo.services.security.model.UserLogin;

public interface AdminBO {	
	public void save(UserLogin userLogin) throws Exception;
    public void refresh(UserLogin userLogin) throws Exception;
    public void saveOrUpdate(UserLogin userLogin) throws Exception;
	public void delete(UserLogin userLogin) throws Exception ;
    public void save(Role role) throws Exception;
    public void refresh(Role role) throws Exception;
    public void saveOrUpdate(Role role) throws Exception;
    public void delete(Role role) throws Exception ;
    public void save(PartyGroup group) throws Exception;
    public void refresh(PartyGroup group) throws Exception;
    public void saveOrUpdate(PartyGroup group) throws Exception;
    public void delete(PartyGroup group) throws Exception ;
    
    public List findAllApplicationRoles();
    public Collection getAvailableRoles(UserLogin user);
    public Collection getAvailableRoles(PartyGroup group);
}
