package net.gencat.ctti.canigo.samples.prototip.model.base;

import java.lang.Comparable;
import java.io.Serializable;


/**
 * This is an object that contains data related to the CATEGORY table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="CATEGORY"
 */

public abstract class BaseCategory  implements Comparable, Serializable {

	public static String REF = "Category";
	public static String PROP_DESCN = "descn";
	public static String PROP_NAME = "name";
	public static String PROP_ID = "id";


	// constructors
	public BaseCategory () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseCategory (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private java.lang.String name;
	private java.lang.String descn;

	// collections
	private java.util.Set products;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="CATID"
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
	 * Return the value associated with the column: products
	 */
	public java.util.Set getProducts () {
		return products;
	}

	/**
	 * Set the value related to the column: products
	 * @param products the products value
	 */
	public void setProducts (java.util.Set products) {
		this.products = products;
	}

	public void addToproducts (net.gencat.ctti.canigo.samples.prototip.model.Product product) {
		if (null == getProducts()) setProducts(new java.util.TreeSet());
		getProducts().add(product);
	}





	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof net.gencat.ctti.canigo.samples.prototip.model.Category)) return false;
		else {
			net.gencat.ctti.canigo.samples.prototip.model.Category category = (net.gencat.ctti.canigo.samples.prototip.model.Category) obj;
			if (null == this.getId() || null == category.getId()) return false;
			else return (this.getId().equals(category.getId()));
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