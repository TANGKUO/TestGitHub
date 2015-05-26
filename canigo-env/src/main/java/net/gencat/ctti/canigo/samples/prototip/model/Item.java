package net.gencat.ctti.canigo.samples.prototip.model;

import net.gencat.ctti.canigo.samples.prototip.model.base.BaseItem;



public class Item extends BaseItem {
	private static final long serialVersionUID = 1L;

/*[CONSTRUCTOR MARKER BEGIN]*/
	public Item () {
		super();
	}

	/**
	 * Constructor for primary key
	 */
	public Item (java.lang.String id) {
		super(id);
	}

	/**
	 * Constructor for required fields
	 */
	public Item (
		java.lang.String id,
		net.gencat.ctti.canigo.samples.prototip.model.Product productid) {

		super (
			id,
			productid);
	}

/*[CONSTRUCTOR MARKER END]*/


}