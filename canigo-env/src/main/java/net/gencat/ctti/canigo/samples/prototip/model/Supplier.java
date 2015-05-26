package net.gencat.ctti.canigo.samples.prototip.model;

import net.gencat.ctti.canigo.samples.prototip.model.base.BaseSupplier;



public class Supplier extends BaseSupplier {
	private static final long serialVersionUID = 1L;

/*[CONSTRUCTOR MARKER BEGIN]*/
	public Supplier () {
		super();
	}

	/**
	 * Constructor for primary key
	 */
	public Supplier (java.lang.Integer id) {
		super(id);
	}

	/**
	 * Constructor for required fields
	 */
	public Supplier (
		java.lang.Integer id,
		java.lang.String status) {

		super (
			id,
			status);
	}

/*[CONSTRUCTOR MARKER END]*/


}