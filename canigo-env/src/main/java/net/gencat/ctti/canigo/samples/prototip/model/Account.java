package net.gencat.ctti.canigo.samples.prototip.model;

import net.gencat.ctti.canigo.samples.prototip.model.base.BaseAccount;



public class Account extends BaseAccount {
	private static final long serialVersionUID = 1L;

    private net.gencat.ctti.canigo.samples.prototip.model.Product preferredProduct2;

/*[CONSTRUCTOR MARKER BEGIN]*/
	public Account () {
		super();
	}

	/**
	 * Constructor for primary key
	 */
	public Account (java.lang.String id) {
		super(id);
	}

	/**
	 * Constructor for required fields
	 */
	public Account (
		java.lang.String id,
		net.gencat.ctti.canigo.samples.prototip.model.Category preferredCategory,
		net.gencat.ctti.canigo.samples.prototip.model.Product preferredProduct,
		java.lang.String addr1,
		java.lang.String city,
		java.lang.String country,
		java.lang.String email,
		java.lang.String firstname,
		java.lang.String lastname,
		java.lang.String password,
		java.lang.String phone,
		java.lang.String state,
		java.lang.String zip) {

		super (
			id,
			preferredCategory,
			preferredProduct,
			addr1,
			city,
			country,
			email,
			firstname,
			lastname,
			password,
			phone,
			state,
			zip);
	}

    /**
     * @return Returns the preferredProduct2.
     */
    public net.gencat.ctti.canigo.samples.prototip.model.Product getPreferredProduct2() {
        return preferredProduct2;
    }

    /**
     * @param preferredProduct2 The preferredProduct2 to set.
     */
    public void setPreferredProduct2(
            net.gencat.ctti.canigo.samples.prototip.model.Product preferredProduct2) {
        this.preferredProduct2 = preferredProduct2;
    }

/*[CONSTRUCTOR MARKER END]*/


}