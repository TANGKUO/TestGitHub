package net.gencat.ctti.canigo.samples.prototip.model.base;

import java.lang.Comparable;
import java.io.Serializable;


/**
 * This is an object that contains data related to the UPLOADED_FILE table.
 * Do not modify this class because it will be overwritten if the configuration file
 * related to this class is modified.
 *
 * @hibernate.class
 *  table="UPLOADED_FILE"
 */

public abstract class BaseUploadedFile  implements Comparable, Serializable {

	public static String REF = "UploadedFile";
	public static String PROP_BYTES = "bytes";
	public static String PROP_PATH = "path";
	public static String PROP_ID = "id";


	// constructors
	public BaseUploadedFile () {
		initialize();
	}

	/**
	 * Constructor for primary key
	 */
	public BaseUploadedFile (java.lang.String id) {
		this.setId(id);
		initialize();
	}

	/**
	 * Constructor for required fields
	 */
	public BaseUploadedFile (
		java.lang.String id,
		byte[] bytes,
		java.lang.String path) {

		this.setId(id);
		this.setBytes(bytes);
		this.setPath(path);
		initialize();
	}

	protected void initialize () {}



	private int hashCode = Integer.MIN_VALUE;

	// primary key
	private java.lang.String id;

	// fields
	private byte[] bytes;
	private java.lang.String path;



	/**
	 * Return the unique identifier of this class
     * @hibernate.id
     *  generator-class="assigned"
     *  column="NAME"
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
	 * Return the value associated with the column: BYTES
	 */
	public byte[] getBytes () {
		return bytes;
	}

	/**
	 * Set the value related to the column: BYTES
	 * @param bytes the BYTES value
	 */
	public void setBytes (byte[] bytes) {
		this.bytes = bytes;
	}



	/**
	 * Return the value associated with the column: PATH
	 */
	public java.lang.String getPath () {
		return path;
	}

	/**
	 * Set the value related to the column: PATH
	 * @param path the PATH value
	 */
	public void setPath (java.lang.String path) {
		this.path = path;
	}





	public boolean equals (Object obj) {
		if (null == obj) return false;
		if (!(obj instanceof net.gencat.ctti.canigo.samples.prototip.model.UploadedFile)) return false;
		else {
			net.gencat.ctti.canigo.samples.prototip.model.UploadedFile uploadedFile = (net.gencat.ctti.canigo.samples.prototip.model.UploadedFile) obj;
			if (null == this.getId() || null == uploadedFile.getId()) return false;
			else return (this.getId().equals(uploadedFile.getId()));
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