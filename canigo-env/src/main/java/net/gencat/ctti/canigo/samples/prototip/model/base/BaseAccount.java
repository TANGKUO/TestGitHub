package net.gencat.ctti.canigo.samples.prototip.model.base;

import java.lang.Comparable;
import java.util.ArrayList;
import java.util.List;
import java.io.Serializable;

import net.gencat.ctti.canigo.samples.prototip.model.Account;


/**
 * This is an object that contains data related to the ACCOUNT table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="ACCOUNT"
 */

public abstract class BaseAccount  implements Comparable, Serializable {

	public static String REF = "Account";
	public static String PROP_STATUS = "status";
	public static String PROP_LASTNAME = "lastname";
	public static String PROP_STATE = "state";
	public static String PROP_ZIP = "zip";
	public static String PROP_ADDR2 = "addr2";
	public static String PROP_FIRSTNAME = "firstname";
	public static String PROP_CITY = "city";
	public static String PROP_PHONE = "phone";
	public static String PROP_ADDR1 = "addr1";
	public static String PROP_BIRTHDATE = "birthdate";
	public static String PROP_PASSWORD = "password";
	public static String PROP_EMAIL = "email";
	public static String PROP_PREFERRED_PRODUCT = "preferredProduct";
	public static String PROP_COMMENTS = "comments";
	public static String PROP_COUNTRY = "country";
	public static String PROP_PREFERRED_CATEGORY = "preferredCategory";
	public static String PROP_LOWER18 = "lower18";
	public static String PROP_ID = "id";
	
	private String seleccio1 = "hola";
	private String seleccio2 = "adeu";
	


	// constructors
	public BaseAccount () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseAccount (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	/**
	 * Constructor for required fields
	 */
	public BaseAccount (
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

		this.setId(id);
		this.setPreferredCategory(preferredCategory);
		this.setPreferredProduct(preferredProduct);
		this.setAddr1(addr1);
		this.setCity(city);
		this.setCountry(country);
		this.setEmail(email);
		this.setFirstname(firstname);
		this.setLastname(lastname);
		this.setPassword(password);
		this.setPhone(phone);
		this.setState(state);
		this.setZip(zip);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private java.lang.String addr1;
	private java.lang.String addr2;
	private java.util.Date birthdate;
	private java.lang.String city;
	private java.lang.String comments;
	private java.lang.String country;
	private java.lang.String email;
	private java.lang.String firstname;
	private java.lang.String lastname;
	private boolean lower18;
	private java.lang.String password;
	private java.lang.String phone;
	private java.lang.String state;
	private java.lang.String status;
	private java.lang.String zip;
	private String hateAnimals;
	private String allAnimals;

	// List for the editable Valuelist rows
	private List accounts;

	// List for the editable Valuelist rows
	private boolean selected;
	
	private boolean deleted;

	// many to one
	private net.gencat.ctti.canigo.samples.prototip.model.Category preferredCategory;
	private net.gencat.ctti.canigo.samples.prototip.model.Product preferredProduct;


	
	/**
	 * Gets the hateAnimals.
	 */
	public String getHateAnimals() {
		return hateAnimals;
	}
	
	/**
	 * Sets the hateAnimals.
	 */
	public void setHateAnimals(String pAnimals) {
		hateAnimals = pAnimals;
	}

	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="USERID"
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
	 * Return the value associated with the column: BIRTHDATE
	 */
	public java.util.Date getBirthdate () {
		return birthdate;
	}

	/**
	 * Set the value related to the column: BIRTHDATE
	 * @param birthdate the BIRTHDATE value
	 */
	public void setBirthdate (java.util.Date birthdate) {
		this.birthdate = birthdate;
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
	 * Return the value associated with the column: COMMENTS
	 */
	public java.lang.String getComments () {
		return comments;
	}

	/**
	 * Set the value related to the column: COMMENTS
	 * @param comments the COMMENTS value
	 */
	public void setComments (java.lang.String comments) {
		this.comments = comments;
	}



	/**
	 * Return the value associated with the column: COUNTRY
	 */
	public java.lang.String getCountry () {
		return country;
	}

	/**
	 * Set the value related to the column: COUNTRY
	 * @param country the COUNTRY value
	 */
	public void setCountry (java.lang.String country) {
		this.country = country;
	}



	/**
	 * Return the value associated with the column: EMAIL
	 */
	public java.lang.String getEmail () {
		return email;
	}

	/**
	 * Set the value related to the column: EMAIL
	 * @param email the EMAIL value
	 */
	public void setEmail (java.lang.String email) {
		this.email = email;
	}



	/**
	 * Return the value associated with the column: FIRSTNAME
	 */
	public java.lang.String getFirstname () {
		return firstname;
	}

	/**
	 * Set the value related to the column: FIRSTNAME
	 * @param firstname the FIRSTNAME value
	 */
	public void setFirstname (java.lang.String firstname) {
		this.firstname = firstname;
	}



	/**
	 * Return the value associated with the column: LASTNAME
	 */
	public java.lang.String getLastname () {
		return lastname;
	}

	/**
	 * Set the value related to the column: LASTNAME
	 * @param lastname the LASTNAME value
	 */
	public void setLastname (java.lang.String lastname) {
		this.lastname = lastname;
	}



	/**
	 * Return the value associated with the column: IS_LOWER18
	 */
	public boolean isLower18 () {
		return lower18;
	}

	/**
	 * Set the value related to the column: IS_LOWER18
	 * @param lower18 the IS_LOWER18 value
	 */
	public void setLower18 (boolean lower18) {
		this.lower18 = lower18;
	}



	/**
	 * Return the value associated with the column: PASSWORD
	 */
	public java.lang.String getPassword () {
		return password;
	}

	/**
	 * Set the value related to the column: PASSWORD
	 * @param password the PASSWORD value
	 */
	public void setPassword (java.lang.String password) {
		this.password = password;
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
	 * Return the value associated with the column: PREFERRED_CATEGORY
	 */
	public net.gencat.ctti.canigo.samples.prototip.model.Category getPreferredCategory () {
		return preferredCategory;
	}

	/**
	 * Set the value related to the column: PREFERRED_CATEGORY
	 * @param preferredCategory the PREFERRED_CATEGORY value
	 */
	public void setPreferredCategory (net.gencat.ctti.canigo.samples.prototip.model.Category preferredCategory) {
		this.preferredCategory = preferredCategory;
	}



	/**
	 * Return the value associated with the column: PREFERRED_PRODUCT
	 */
	public net.gencat.ctti.canigo.samples.prototip.model.Product getPreferredProduct () {
		return preferredProduct;
	}

	/**
	 * Set the value related to the column: PREFERRED_PRODUCT
	 * @param preferredProduct the PREFERRED_PRODUCT value
	 */
	public void setPreferredProduct (net.gencat.ctti.canigo.samples.prototip.model.Product preferredProduct) {
		this.preferredProduct = preferredProduct;
	}





	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof net.gencat.ctti.canigo.samples.prototip.model.Account)) return false;
		else {
			net.gencat.ctti.canigo.samples.prototip.model.Account account = (net.gencat.ctti.canigo.samples.prototip.model.Account) obj;
			if (null == this.getId() || null == account.getId()) return false;
			else return (this.getId().equals(account.getId()));
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


	public String getAllAnimals() {
		return allAnimals;
	}

	public void setAllAnimals(String allAnimals) {
		this.allAnimals = allAnimals;
	}


	public List getAccounts() {
//		
//		Account account = new Account("ACID",null,null,null,null,null,null,null,"eulus",null,null,null,null);
//		List llista = new ArrayList();
//		llista.add(account);
		return this.accounts;
	}

	public void setAccounts(List accounts) {
		this.accounts = accounts;
	}

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getSeleccio1() {
		return seleccio1;
	}
	
	

	public void setSeleccio1(String seleccio1) {
		this.seleccio1 = seleccio1;
	}

	public String getSeleccio2() {
		return seleccio2;
	}

	public void setSeleccio2(String seleccio2) {
		this.seleccio2 = seleccio2;
	}



}