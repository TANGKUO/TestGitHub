package net.gencat.ctti.canigo.samples.prototip.model.base;

import java.lang.Comparable;
import java.io.Serializable;


/**
 * This is an object that contains data related to the SUPPLIER table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="SUPPLIER"
 */

public abstract class BaseSupplier  implements Comparable, Serializable {

	public static String REF = "Supplier";
	public static String PROP_STATUS = "status";
	public static String PROP_STATE = "state";
	public static String PROP_ZIP = "zip";
	public static String PROP_ADDR2 = "addr2";
	public static String PROP_CITY = "city";
	public static String PROP_NAME = "name";
	public static String PROP_ID = "id";
	public static String PROP_PHONE = "phone";
	public static String PROP_ADDR1 = "addr1";


	// constructors
	public BaseSupplier () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseSupplier (java.lang.Integer id) {
		this.setId(id);
		initialize();
	}

	/**
	 * Constructor for required fields
	 */
	public BaseSupplier (
		java.lang.Integer id,
		java.lang.String status) {

		this.setId(id);
		this.setStatus(status);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.Integer id;

	// fields
	private java.lang.String name;
	private java.lang.String status;
	private java.lang.String addr1;
	private java.lang.String addr2;
	private java.lang.String city;
	private java.lang.String state;
	private java.lang.String zip;
	private java.lang.String phone;

	// collections
	private java.util.Set items;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="SUPPID"
     */
	public java.lang.Integer getId () {
		return id;
	}

	/**
	 * Set the unique identifier of this class
	 * @param id the new ID
	 */
	public void setId (java.lang.Integer id) {
		this.id = id;
		this.hashCode = Integer.MIN_VALUE;
	}




	/**
	 * Return the value associated with the column: NAME
	 */
	public java.lang.String getName () {
		return name;
	}

	/**
	 * Set the value related to the column: NAME
	 * @param name the NAME value
	 */
	public void setName (java.lang.String name) {
		this.name = name;
	}



	/**
	 * Return the value associated with the column: STATUS
	 */
	public java.lang.String getStatus () {
		return status;
	}

	/**
	 * Set the value related to the column: STATUS
	 * @param status the STATUS value
	 */
	public void setStatus (java.lang.String status) {
		this.status = status;
	}



	/**
	 * Return the value associated with the column: ADDR1
	 */
	public java.lang.String getAddr1 () {
		return addr1;
	}

	/**
	 * Set the value related to the column: ADDR1
	 * @param addr1 the ADDR1 value
	 */
	public void setAddr1 (java.lang.String addr1) {
		this.addr1 = addr1;
	}



	/**
	 * Return the value associated with the column: ADDR2
	 */
	public java.lang.String getAddr2 () {
		return addr2;
	}

	/**
	 * Set the value related to the column: ADDR2
	 * @param addr2 the ADDR2 value
	 */
	public void setAddr2 (java.lang.String addr2) {
		this.addr2 = addr2;
	}



	/**
	 * Return the value associated with the column: CITY
	 */
	public java.lang.String getCity () {
		return city;
	}

	/**
	 * Set the value related to the column: CITY
	 * @param city the CITY value
	 */
	public void setCity (java.lang.String city) {
		this.city = city;
	}



	/**
	 * Return the value associated with the column: STATE
	 */
	public java.lang.String getState () {
		return state;
	}

	/**
	 * Set the value related to the column: STATE
	 * @param state the STATE value
	 */
	public void setState (java.lang.String state) {
		this.state = state;
	}



	/**
	 * Return the value associated with the column: ZIP
	 */
	public java.lang.String getZip () {
		return zip;
	}

	/**
	 * Set the value related to the column: ZIP
	 * @param zip the ZIP value
	 */
	public void setZip (java.lang.String zip) {
		this.zip = zip;
	}



	/**
	 * Return the value associated with the column: PHONE
	 */
	public java.lang.String getPhone () {
		return phone;
	}

	/**
	 * Set the value related to the column: PHONE
	 * @param phone the PHONE value
	 */
	public void setPhone (java.lang.String phone) {
		this.phone = phone;
	}



	/**
	 * Return the value associated with the column: items
	 */
	public java.util.Set getItems () {
		return items;
	}

	/**
	 * Set the value related to the column: items
	 * @param items the items value
	 */
	public void setItems (java.util.Set items) {
		this.items = items;
	}

	public void addToitems (net.gencat.ctti.canigo.samples.prototip.model.Item item) {
		if (null == getItems()) setItems(new java.util.TreeSet());
		getItems().add(item);
	}





	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof net.gencat.ctti.canigo.samples.prototip.model.Supplier)) return false;
		else {
			net.gencat.ctti.canigo.samples.prototip.model.Supplier supplier = (net.gencat.ctti.canigo.samples.prototip.model.Supplier) obj;
			if (null == this.getId() || null == supplier.getId()) return false;
			else return (this.getId().equals(supplier.getId()));
		}
	}

	public int hashCode () {
		if (Integer.MIN_VALUE == this.hashCode) {
			if (null == this.getId()) return super.hashCode();
			else {
				String hashStr = this.getClass().getName() + ":" + this.getId().hashCode();
				this.hashCode = hashStr.hashCode();
			}
		}
		return this.hashCode;
	}

	public int compareTo (Object obj) {
		if (obj.hashCode() > hashCode()) return 1;
		else if (obj.hashCode() < hashCode()) return -1;
		else return 0;
	}

	public String toString () {
		return super.toString();
	}


}