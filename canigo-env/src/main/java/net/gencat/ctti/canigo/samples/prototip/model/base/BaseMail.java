package net.gencat.ctti.canigo.samples.prototip.model.base;

import java.lang.Comparable;
import java.io.Serializable;


/**
 * This is an object that contains data related to the MAIL table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="MAIL"
 */

public abstract class BaseMail  implements Comparable, Serializable {

	public static String REF = "Mail";
	public static String PROP_SUBJECT = "subject";
	public static String PROP_MESSAGE = "message";
	public static String PROP_TO_ADDRESS = "toAddress";
	public static String PROP_ID = "id";
	public static String PROP_FROM_ADDRESS = "fromAddress";


	// constructors
	public BaseMail () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseMail (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	/**
	 * Constructor for required fields
	 */
	public BaseMail (
		java.lang.String id,
		java.lang.String fromAddress,
		java.lang.String toAddress,
		java.lang.String subject,
		java.lang.String message) {

		this.setId(id);
		this.setFromAddress(fromAddress);
		this.setToAddress(toAddress);
		this.setSubject(subject);
		this.setMessage(message);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private java.lang.String fromAddress;
	private java.lang.String toAddress;
	private java.lang.String subject;
	private java.lang.String message;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="sequence"
     *  column="MAILID"
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
	 * Return the value associated with the column: FROM_ADDRESS
	 */
	public java.lang.String getFromAddress () {
		return fromAddress;
	}

	/**
	 * Set the value related to the column: FROM_ADDRESS
	 * @param fromAddress the FROM_ADDRESS value
	 */
	public void setFromAddress (java.lang.String fromAddress) {
		this.fromAddress = fromAddress;
	}



	/**
	 * Return the value associated with the column: TO_ADDRESS
	 */
	public java.lang.String getToAddress () {
		return toAddress;
	}

	/**
	 * Set the value related to the column: TO_ADDRESS
	 * @param toAddress the TO_ADDRESS value
	 */
	public void setToAddress (java.lang.String toAddress) {
		this.toAddress = toAddress;
	}



	/**
	 * Return the value associated with the column: SUBJECT
	 */
	public java.lang.String getSubject () {
		return subject;
	}

	/**
	 * Set the value related to the column: SUBJECT
	 * @param subject the SUBJECT value
	 */
	public void setSubject (java.lang.String subject) {
		this.subject = subject;
	}



	/**
	 * Return the value associated with the column: MESSAGE
	 */
	public java.lang.String getMessage () {
		return message;
	}

	/**
	 * Set the value related to the column: MESSAGE
	 * @param message the MESSAGE value
	 */
	public void setMessage (java.lang.String message) {
		this.message = message;
	}





	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof net.gencat.ctti.canigo.samples.prototip.model.Mail)) return false;
		else {
			net.gencat.ctti.canigo.samples.prototip.model.Mail mail = (net.gencat.ctti.canigo.samples.prototip.model.Mail) obj;
			if (null == this.getId() || null == mail.getId()) return false;
			else return (this.getId().equals(mail.getId()));
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