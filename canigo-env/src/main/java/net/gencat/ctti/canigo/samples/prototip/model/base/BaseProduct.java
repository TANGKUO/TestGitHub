package net.gencat.ctti.canigo.samples.prototip.model.base;

import java.lang.Comparable;
import java.io.Serializable;


/**
 * This is an object that contains data related to the PRODUCT table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="PRODUCT"
 */

public abstract class BaseProduct  implements Comparable, Serializable {

	public static String REF = "Product";
	public static String PROP_CATEGORY = "category";
	public static String PROP_DESCN = "descn";
	public static String PROP_NAME = "name";
	public static String PROP_ID = "id";


	// constructors
	public BaseProduct () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseProduct (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	/**
	 * Constructor for required fields
	 */
	public BaseProduct (
		java.lang.String id,
		net.gencat.ctti.canigo.samples.prototip.model.Category category) {

		this.setId(id);
		this.setCategory(category);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private java.lang.String name;
	private java.lang.String descn;

	// many to one
	private net.gencat.ctti.canigo.samples.prototip.model.Category category;

	// collections
	private java.util.Set items;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="PRODUCTID"
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
	 * Return the value associated with the column: DESCN
	 */
	public java.lang.String getDescn () {
		return descn;
	}

	/**
	 * Set the value related to the column: DESCN
	 * @param descn the DESCN value
	 */
	public void setDescn (java.lang.String descn) {
		this.descn = descn;
	}



	/**
	 * Return the value associated with the column: CATEGORY
	 */
	public net.gencat.ctti.canigo.samples.prototip.model.Category getCategory () {
		return category;
	}

	/**
	 * Set the value related to the column: CATEGORY
	 * @param category the CATEGORY value
	 */
	public void setCategory (net.gencat.ctti.canigo.samples.prototip.model.Category category) {
		this.category = category;
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
		if (!(obj instanceof net.gencat.ctti.canigo.samples.prototip.model.Product)) return false;
		else {
			net.gencat.ctti.canigo.samples.prototip.model.Product product = (net.gencat.ctti.canigo.samples.prototip.model.Product) obj;
			if (null == this.getId() || null == product.getId()) return false;
			else return (this.getId().equals(product.getId()));
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