package net.gencat.ctti.canigo.samples.prototip.model.bo.impl;

import java.util.List;

import net.gencat.ctti.canigo.samples.prototip.model.Account;
import net.gencat.ctti.canigo.samples.prototip.model.bo.AccountBO;
import net.gencat.ctti.canigo.services.persistence.HibernateDAO;
import net.gencat.ctti.canigo.services.persistence.UniversalHibernateDAO;

import org.apache.commons.beanutils.BeanUtils;

public class AccountBOImpl implements AccountBO {
	UniversalHibernateDAO dao;
	
	
	public AccountBOImpl() {
		super();	
	}
	
	public void test() {
		System.out.println("------------> test");
		
	}

	public Account getAccountById(String id) throws Exception{
		return (Account) dao.get(Account.class,id);
	}
	
	public void save(Account account) throws Exception {
		// First try to see if exists the account
		//Account tmpAccount = new Account();
		//BeanUtils.copyProperties(tmpAccount,account);
		
		//dao.refresh(account);
		//BeanUtils.copyProperties(account,tmpAccount);		
		this.test();
		dao.save(account);		
	}

	public void update(Account account) throws Exception {
		this.test();
		Account tmpAccount = new Account();		
		tmpAccount.setId(account.getId());
		BeanUtils.copyProperties(tmpAccount,account);
//		
		dao.refresh(tmpAccount);
		BeanUtils.copyProperties(tmpAccount,account);
//		accountDAO.refresh(tmpAccount);
//		BeanUtils.c
		System.out.println("Update");
		dao.update(tmpAccount);

	}

	public void delete(Account account) throws Exception {
		this.test();
		dao.delete(account);

	}

	public Account load(Account account) {
		this.test();
		dao.refresh(account);
		return account;
	}

	public Account refresh(Account account) {
		this.test();
		dao.refresh(account);
		return account;
	}

    public void saveOrUpdate(Account account) throws Exception {
    	this.test();
        dao.saveOrUpdate(account);
    }

    public List findAll() {
        return ((HibernateDAO)(dao)).findAll();
    }

	public UniversalHibernateDAO getDao() {
		return dao;
	}

	public void setDao(UniversalHibernateDAO dao) {
		this.dao = dao;
	}

}
