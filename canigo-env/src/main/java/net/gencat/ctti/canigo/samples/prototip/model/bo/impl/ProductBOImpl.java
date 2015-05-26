package net.gencat.ctti.canigo.samples.prototip.model.bo.impl;

import java.util.List;

import net.gencat.ctti.canigo.samples.prototip.model.Product;
import net.gencat.ctti.canigo.samples.prototip.model.bo.ProductBO;
import net.gencat.ctti.canigo.services.persistence.HibernateDAO;
import net.gencat.ctti.canigo.services.persistence.UniversalHibernateDAO;

import org.apache.commons.beanutils.BeanUtils;

public class ProductBOImpl implements ProductBO {
	UniversalHibernateDAO dao;
	
	
	public ProductBOImpl() {
		super();	
	}
	
	public void test() {
		System.out.println("------------> test");
		
	}

	public Product getProductById(String id) throws Exception{
		return (Product) dao.get(Product.class,id);
	}
	
	public void save(Product product) throws Exception {
		// First try to see if exists the product
		//Product tmpProduct = new Product();
		//BeanUtils.copyProperties(tmpProduct,product);
		
		//dao.refresh(product);
		//BeanUtils.copyProperties(product,tmpProduct);		
		this.test();
		dao.save(product);		
	}

	public void update(Product product) throws Exception {
		this.test();
		Product tmpProduct = new Product();		
		tmpProduct.setId(product.getId());
		BeanUtils.copyProperties(tmpProduct,product);
//		
		dao.refresh(tmpProduct);
		BeanUtils.copyProperties(tmpProduct,product);
//		productDAO.refresh(tmpProduct);
//		BeanUtils.c
		System.out.println("Update");
		dao.update(tmpProduct);

	}

	public void delete(Product product) throws Exception {
		this.test();
		dao.delete(product);

	}

	public Product load(Product product) {
		this.test();
		dao.refresh(product);
		return product;
	}

	public Product refresh(Product product) {
		this.test();
		dao.refresh(product);
		return product;
	}

    public void saveOrUpdate(Product product) throws Exception {
    	this.test();
        dao.saveOrUpdate(product);
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
