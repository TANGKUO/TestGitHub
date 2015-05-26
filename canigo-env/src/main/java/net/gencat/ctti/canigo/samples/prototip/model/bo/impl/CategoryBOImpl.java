package net.gencat.ctti.canigo.samples.prototip.model.bo.impl;

import java.util.List;

import net.gencat.ctti.canigo.samples.prototip.model.Category;
import net.gencat.ctti.canigo.samples.prototip.model.bo.CategoryBO;
import net.gencat.ctti.canigo.services.persistence.HibernateDAO;
import net.gencat.ctti.canigo.services.persistence.UniversalHibernateDAO;

import org.apache.commons.beanutils.BeanUtils;

public class CategoryBOImpl implements CategoryBO {
	UniversalHibernateDAO dao;
	
	
	public CategoryBOImpl() {
		super();	
	}
	
	public void test() {
		System.out.println("------------> test");
		
	}

	public Category getCategoryById(String id) throws Exception{
		return (Category) dao.get(Category.class,id);
	}
	
	public void save(Category category) throws Exception {
		// First try to see if exists the category
		//Category tmpCategory = new Category();
		//BeanUtils.copyProperties(tmpCategory,category);
		
		//dao.refresh(category);
		//BeanUtils.copyProperties(category,tmpCategory);		
		this.test();
		dao.save(category);		
	}

	public void update(Category category) throws Exception {
		this.test();
		Category tmpCategory = new Category();		
		tmpCategory.setId(category.getId());
		BeanUtils.copyProperties(tmpCategory,category);
//		
		dao.refresh(tmpCategory);
		BeanUtils.copyProperties(tmpCategory,category);
//		categoryDAO.refresh(tmpCategory);
//		BeanUtils.c
		System.out.println("Update");
		dao.update(tmpCategory);

	}

	public void delete(Category category) throws Exception {
		this.test();
		dao.delete(category);

	}

	public Category load(Category category) {
		this.test();
		dao.refresh(category);
		return category;
	}

	public Category refresh(Category category) {
		this.test();
		dao.refresh(category);
		return category;
	}

    public void saveOrUpdate(Category category) throws Exception {
    	this.test();
        dao.saveOrUpdate(category);
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
