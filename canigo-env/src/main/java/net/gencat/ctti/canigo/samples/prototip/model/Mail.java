package net.gencat.ctti.canigo.samples.prototip.model;

import net.gencat.ctti.canigo.samples.prototip.model.base.BaseMail;



public class Mail extends BaseMail {
	private static final long serialVersionUID = 1L;

/*[CONSTRUCTOR MARKER BEGIN]*/
	public Mail () {
		super();
	}

	/**
	 * Constructor for primary key
	 */
	public Mail (java.lang.String id) {
		super(id);
	}

	/**
	 * Constructor for required fields
	 */
	public Mail (
		java.lang.String id,
		java.lang.String fromAddress,
		java.lang.String toAddress,
		java.lang.String subject,
		java.lang.String message) {

		super (
			id,
			fromAddress,
			toAddress,
			subject,
			message);
	}

/*[CONSTRUCTOR MARKER END]*/


}