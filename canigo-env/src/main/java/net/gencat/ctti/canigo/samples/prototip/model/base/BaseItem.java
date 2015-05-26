package net.gencat.ctti.canigo.samples.prototip.model.base;

import java.lang.Comparable;
import java.io.Serializable;


/**
 * This is an object that contains data related to the ITEM table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="ITEM"
 */

public abstract class BaseItem  implements Comparable, Serializable {

	public static String REF = "Item";
	public static String PROP_STATUS = "status";
	public static String PROP_ATTR2 = "attr2";
	public static String PROP_PRODUCTID = "productid";
	public static String PROP_SUPPLIER = "supplier";
	public static String PROP_UNITCOST = "unitcost";
	public static String PROP_ATTR1 = "attr1";
	public static String PROP_ATTR4 = "attr4";
	public static String PROP_LISTPRICE = "listprice";
	public static String PROP_ATTR3 = "attr3";
	public static String PROP_ID = "id";
	public static String PROP_ATTR5 = "attr5";


	// constructors
	public BaseItem () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseItem (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	/**
	 * Constructor for required fields
	 */
	public BaseItem (
		java.lang.String id,
		net.gencat.ctti.canigo.samples.prototip.model.Product productid) {

		this.setId(id);
		this.setProductid(productid);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private java.math.BigDecimal listprice;
	private java.math.BigDecimal unitcost;
	private java.lang.String status;
	private java.lang.String attr1;
	private java.lang.String attr2;
	private java.lang.String attr3;
	private java.lang.String attr4;
	private java.lang.String attr5;

	// many to one
	private net.gencat.ctti.canigo.samples.prototip.model.Supplier supplier;
	private net.gencat.ctti.canigo.samples.prototip.model.Product productid;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="ITEMID"
     */
	public java.lang.String getId () {
		return id;
	}

	/**
	 * Set the unique identifier of this class
	 * @param id the new ID
	 */
	public void setId (java.lang.String id) {
		this.id = id;
		this.hashCode = Integer.MIN_VALUE;
	}




	/**
	 * Return the value associated with the column: LISTPRICE
	 */
	public java.math.BigDecimal getListprice () {
		return listprice;
	}

	/**
	 * Set the value related to the column: LISTPRICE
	 * @param listprice the LISTPRICE value
	 */
	public void setListprice (java.math.BigDecimal listprice) {
		this.listprice = listprice;
	}



	/**
	 * Return the value associated with the column: UNITCOST
	 */
	public java.math.BigDecimal getUnitcost () {
		return unitcost;
	}

	/**
	 * Set the value related to the column: UNITCOST
	 * @param unitcost the UNITCOST value
	 */
	public void setUnitcost (java.math.BigDecimal unitcost) {
		this.unitcost = unitcost;
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
	 * Return the value associated with the column: ATTR1
	 */
	public java.lang.String getAttr1 () {
		return attr1;
	}

	/**
	 * Set the value related to the column: ATTR1
	 * @param attr1 the ATTR1 value
	 */
	public void setAttr1 (java.lang.String attr1) {
		this.attr1 = attr1;
	}



	/**
	 * Return the value associated with the column: ATTR2
	 */
	public java.lang.String getAttr2 () {
		return attr2;
	}

	/**
	 * Set the value related to the column: ATTR2
	 * @param attr2 the ATTR2 value
	 */
	public void setAttr2 (java.lang.String attr2) {
		this.attr2 = attr2;
	}



	/**
	 * Return the value associated with the column: ATTR3
	 */
	public java.lang.String getAttr3 () {
		return attr3;
	}

	/**
	 * Set the value related to the column: ATTR3
	 * @param attr3 the ATTR3 value
	 */
	public void setAttr3 (java.lang.String attr3) {
		this.attr3 = attr3;
	}



	/**
	 * Return the value associated with the column: ATTR4
	 */
	public java.lang.String getAttr4 () {
		return attr4;
	}

	/**
	 * Set the value related to the column: ATTR4
	 * @param attr4 the ATTR4 value
	 */
	public void setAttr4 (java.lang.String attr4) {
		this.attr4 = attr4;
	}



	/**
	 * Return the value associated with the column: ATTR5
	 */
	public java.lang.String getAttr5 () {
		return attr5;
	}

	/**
	 * Set the value related to the column: ATTR5
	 * @param attr5 the ATTR5 value
	 */
	public void setAttr5 (java.lang.String attr5) {
		this.attr5 = attr5;
	}



	/**
	 * Return the value associated with the column: SUPPLIER
	 */
	public net.gencat.ctti.canigo.samples.prototip.model.Supplier getSupplier () {
		return supplier;
	}

	/**
	 * Set the value related to the column: SUPPLIER
	 * @param supplier the SUPPLIER value
	 */
	public void setSupplier (net.gencat.ctti.canigo.samples.prototip.model.Supplier supplier) {
		this.supplier = supplier;
	}



	/**
	 * Return the value associated with the column: PRODUCTID
	 */
	public net.gencat.ctti.canigo.samples.prototip.model.Product getProductid () {
		return productid;
	}

	/**
	 * Set the value related to the column: PRODUCTID
	 * @param productid the PRODUCTID value
	 */
	public void setProductid (net.gencat.ctti.canigo.samples.prototip.model.Product productid) {
		this.productid = productid;
	}





	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof net.gencat.ctti.canigo.samples.prototip.model.Item)) return false;
		else {
			net.gencat.ctti.canigo.samples.prototip.model.Item item = (net.gencat.ctti.canigo.samples.prototip.model.Item) obj;
			if (null == this.getId() || null == item.getId()) return false;
			else return (this.getId().equals(item.getId()));
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