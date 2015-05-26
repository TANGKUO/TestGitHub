package net.gencat.ctti.canigo.samples.prototip.model;

import net.gencat.ctti.canigo.samples.prototip.model.base.BaseProduct;



public class Product extends BaseProduct {
	private static final long serialVersionUID = 1L;

/*[CONSTRUCTOR MARKER BEGIN]*/
	public Product () {
		super();
	}

	/**
	 * Constructor for primary key
	 */
	public Product (java.lang.String id) {
		super(id);
	}

	/**
	 * Constructor for required fields
	 */
	public Product (
		java.lang.String id,
		net.gencat.ctti.canigo.samples.prototip.model.Category category) {

		super (
			id,
			category);
	}
}