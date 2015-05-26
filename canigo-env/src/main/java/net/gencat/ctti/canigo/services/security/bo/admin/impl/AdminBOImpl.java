package net.gencat.ctti.canigo.services.security.bo.admin.impl;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import net.gencat.ctti.canigo.services.security.bo.admin.AdminBO;
import net.gencat.ctti.canigo.services.security.exceptions.InvalidUsernameException;
import net.gencat.ctti.canigo.services.exceptions.BusinessException;
import net.gencat.ctti.canigo.services.persistence.UniversalHibernateDAO;
import net.gencat.ctti.canigo.services.security.model.PartyGroup;
import net.gencat.ctti.canigo.services.security.model.Role;
import net.gencat.ctti.canigo.services.security.model.UserLogin;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.util.Assert;

// TODO Refactor: Extract dupplicate code to methods (DRY)
public class AdminBOImpl implements AdminBO, InitializingBean {
    private UniversalHibernateDAO securityServiceDAO = null;
	
	public AdminBOImpl() {
		super();	
	}
	
	public void save(UserLogin userLogin) throws Exception {
        UserLogin existingUser = (UserLogin)this.securityServiceDAO.get(UserLogin.class,userLogin.getUserName());
        if(existingUser!=null){
            throw new InvalidUsernameException("business_error.existing_user", new Object[]{existingUser.getUserName()});
        }
        if (userLogin.getGroup().getId() == null ) {
            userLogin.setGroup(null);
        }
        else {
            this.securityServiceDAO.refresh(userLogin.getGroup());
        }       
        if (userLogin.getRoles()!=null&&!userLogin.getRoles().isEmpty()){
            Iterator it = userLogin.getRoles().iterator();
            while(it.hasNext()){
                Role r = (Role)it.next();
                this.securityServiceDAO.refresh(r);
            }
        }
        this.securityServiceDAO.save(userLogin);
	}

	public void delete(UserLogin userLogin) throws Exception {
	    this.securityServiceDAO.refresh(userLogin);
        this.securityServiceDAO.delete(userLogin);
	}

    /**
     * @return Returns the dao.
     */
    public UniversalHibernateDAO getSecurityServiceDAO() {
        return securityServiceDAO;
    }

    /**
     * @param dao The dao to set.
     */
    public void setSecurityServiceDAO(UniversalHibernateDAO dao) {
        this.securityServiceDAO = dao;
    }

    public void saveOrUpdate(UserLogin userLogin) throws Exception {
        if (userLogin.getGroup().getId() == null ) {
            userLogin.setGroup(null);
        }
        else {
            this.securityServiceDAO.refresh(userLogin.getGroup());
        }       
        if (userLogin.getRoles()!=null&&!userLogin.getRoles().isEmpty()){
            Iterator it = userLogin.getRoles().iterator();
            while(it.hasNext()){
                Role r = (Role)it.next();
                this.securityServiceDAO.refresh(r);
            }
        }
        this.securityServiceDAO.saveOrUpdate(userLogin);
    }

    public void refresh(UserLogin userLogin) throws Exception {
        this.securityServiceDAO.refresh(userLogin);
    }

    public void save(Role role) throws Exception {
        // TODO check ifExists object with same name
        
        // TODO This SUCKS!!!!!!
        if (role.getParent() != null) {
            if (role.getParent().getId() == null ) {
                role.setParent(null);
            }
            else {
                Role assignedParent = role.getParent();
                this.securityServiceDAO.refresh(assignedParent);            
            }
        }                              
        this.securityServiceDAO.save(role);
    }
    
    public void save(PartyGroup group) throws Exception {
        // TODO check repeated groups        
//        if (condition) {
//            
//        }
        
        if (group.getParent() != null) {
            if (group.getParent().getId() == null ) {
                group.setParent(null);
            }
            else {
                this.securityServiceDAO.refresh(group.getParent());
            }
        }
                
        this.securityServiceDAO.save(group);
    }   
    
    public void refresh(Role role) throws Exception {
        this.securityServiceDAO.refresh(role);
    }
    
    public void refresh(PartyGroup group) throws Exception {
        this.securityServiceDAO.refresh(group);
    }
    
    public void saveOrUpdate(Role role) throws Exception {
        if (role.getParent().getId() == null ) {
            role.setParent(null);
        }
        else {
            Role assignedParent = role.getParent();
            this.securityServiceDAO.refresh(assignedParent);
            
            role.setParent(null);
            
            // Can't assigned a parent who is my son or my grand-son  
            if (role.isAParentOf(assignedParent)) {
                throw new BusinessException("business_error.role_hierachy");
            }
            
            role.setParent(assignedParent);
        }
        this.securityServiceDAO.saveOrUpdate(role);
    }
    
    public void saveOrUpdate(PartyGroup group) throws Exception {
        if (group.getParent() != null) {
            if (group.getParent().getId() == null ) {
                group.setParent(null);
            }
            else {
                this.securityServiceDAO.refresh(group.getParent());
            }
        }
        
        if ( group.getRoles() != null && !group.getRoles().isEmpty() ){
            Iterator it = group.getRoles().iterator();
            while(it.hasNext()){
                Role r = (Role)it.next();
                this.securityServiceDAO.refresh(r);
            }
        }
        
        this.securityServiceDAO.saveOrUpdate(group);
    }
    
    public void delete(Role role) throws Exception {
        // TODO check integrity constrains
        this.securityServiceDAO.refresh(role);
        this.securityServiceDAO.delete(role);
    }
    
    public void delete(PartyGroup group) throws Exception {
        // TODO check integrity constrains
        this.securityServiceDAO.refresh(group);
        this.securityServiceDAO.delete(group);
    }
    
    protected void validateBusinessRuleUniqueNameContraint(Object pojo, String property) throws BusinessException {
                
    }

    public List findAllApplicationRoles() {        
        return this.securityServiceDAO.findAll(Role.class);
    }

    public Collection getAvailableRoles(UserLogin user) {
        List applicationRoles = this.securityServiceDAO.findAll(Role.class);
        return CollectionUtils.subtract(applicationRoles, user.getAllRoles());
    }

    public Collection getAvailableRoles(PartyGroup group) {
        List applicationRoles = this.securityServiceDAO.findAll(Role.class);
        return CollectionUtils.subtract(applicationRoles, group.getRecursiveRoles());
    }
    public void afterPropertiesSet() throws Exception {
        Assert.notNull(this.securityServiceDAO);
        
    }


}
