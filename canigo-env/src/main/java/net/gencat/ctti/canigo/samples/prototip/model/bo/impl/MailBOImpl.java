package net.gencat.ctti.canigo.samples.prototip.model.bo.impl;

import java.util.List;

import net.gencat.ctti.canigo.samples.prototip.model.Mail;
import net.gencat.ctti.canigo.samples.prototip.model.bo.MailBO;
import net.gencat.ctti.canigo.services.persistence.HibernateDAO;
import net.gencat.ctti.canigo.services.persistence.UniversalHibernateDAO;

import org.apache.commons.beanutils.BeanUtils;

public class MailBOImpl implements MailBO {
	UniversalHibernateDAO dao;
	
	
	public MailBOImpl() {
		super();	
	}
	
	public void test() {
		System.out.println("------------> test");
		
	}

	public Mail getMailById(String id) throws Exception{
		return (Mail) dao.get(Mail.class,id);
	}
	
	public void save(Mail mail) throws Exception {
		// First try to see if exists the mail
		//Mail tmpMail = new Mail();
		//BeanUtils.copyProperties(tmpMail,mail);
		
		//dao.refresh(mail);
		//BeanUtils.copyProperties(mail,tmpMail);		
		this.test();
		dao.save(mail);		
	}

	public void update(Mail mail) throws Exception {
		this.test();
		Mail tmpMail = new Mail();		
		tmpMail.setId(mail.getId());
		BeanUtils.copyProperties(tmpMail,mail);
//		
		dao.refresh(tmpMail);
		BeanUtils.copyProperties(tmpMail,mail);
//		mailDAO.refresh(tmpMail);
//		BeanUtils.c
		System.out.println("Update");
		dao.update(tmpMail);

	}

	public void delete(Mail mail) throws Exception {
		this.test();
		dao.delete(mail);

	}

	public Mail load(Mail mail) {
		this.test();
		dao.refresh(mail);
		return mail;
	}

	public Mail refresh(Mail mail) {
		this.test();
		dao.refresh(mail);
		return mail;
	}

    public void saveOrUpdate(Mail mail) throws Exception {
    	this.test();
        dao.saveOrUpdate(mail);
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
