package net.gencat.ctti.canigo.samples.prototip.model.bo.impl;

import java.util.List;

import net.gencat.ctti.canigo.samples.prototip.model.Item;
import net.gencat.ctti.canigo.samples.prototip.model.bo.ItemBO;
import net.gencat.ctti.canigo.services.persistence.HibernateDAO;
import net.gencat.ctti.canigo.services.persistence.UniversalHibernateDAO;

import org.apache.commons.beanutils.BeanUtils;

public class ItemBOImpl implements ItemBO {
	UniversalHibernateDAO dao;
	
	
	public ItemBOImpl() {
		super();	
	}
	
	public void test() {
		System.out.println("------------> test");
		
	}

	public Item getItemById(String id) throws Exception{
		return (Item) dao.get(Item.class,id);
	}
	
	public void save(Item item) throws Exception {
		// First try to see if exists the item
		//Item tmpItem = new Item();
		//BeanUtils.copyProperties(tmpItem,item);
		
		//dao.refresh(item);
		//BeanUtils.copyProperties(item,tmpItem);		
		this.test();
		dao.save(item);		
	}

	public void update(Item item) throws Exception {
		this.test();
		Item tmpItem = new Item();		
		tmpItem.setId(item.getId());
		BeanUtils.copyProperties(tmpItem,item);
//		
		dao.refresh(tmpItem);
		BeanUtils.copyProperties(tmpItem,item);
//		itemDAO.refresh(tmpItem);
//		BeanUtils.c
		System.out.println("Update");
		dao.update(tmpItem);

	}

	public void delete(Item item) throws Exception {
		this.test();
		dao.delete(item);

	}

	public Item load(Item item) {
		this.test();
		dao.refresh(item);
		return item;
	}

	public Item refresh(Item item) {
		this.test();
		dao.refresh(item);
		return item;
	}

    public void saveOrUpdate(Item item) throws Exception {
    	this.test();
        dao.saveOrUpdate(item);
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
