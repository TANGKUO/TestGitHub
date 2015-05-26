package net.gencat.ctti.canigo.samples.prototip.model;

import net.gencat.ctti.canigo.samples.prototip.model.base.BaseUploadedFile;



public class UploadedFile extends BaseUploadedFile {
	private static final long serialVersionUID = 1L;

    private String currentDir = null;
    
	public UploadedFile () {
		super();
	}

	/**
	 * Constructor for primary key
	 */
	public UploadedFile (java.lang.String id) {
		super(id);
	}

	/**
	 * Constructor for required fields
	 */
	public UploadedFile (
		java.lang.String id,
		byte[] bytes,
		java.lang.String path) {

		super (
			id,
			bytes,
			path);
	}

    /**
     * @return Returns the currentDir.
     */
    public String getCurrentDir() {
        return currentDir;
    }

    /**
     * @param currentDir The currentDir to set.
     */
    public void setCurrentDir(String currentDir) {
        this.currentDir = currentDir;
    }
}