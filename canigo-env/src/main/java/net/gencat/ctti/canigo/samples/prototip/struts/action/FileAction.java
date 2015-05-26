package net.gencat.ctti.canigo.samples.prototip.struts.action;

import java.io.File;

import net.gencat.ctti.canigo.samples.prototip.exceptions.UnknownDirectory;
import net.gencat.ctti.canigo.samples.prototip.model.UploadedFile;
import net.gencat.ctti.canigo.services.file.FileNamingService;
import net.gencat.ctti.canigo.services.file.FileSystemService;
import net.gencat.ctti.canigo.services.fileupload.FileUploadService;
import net.gencat.ctti.canigo.services.fileupload.UploadedFiles;
import net.gencat.ctti.canigo.services.web.lists.ValueListActionHelper;
import net.gencat.ctti.canigo.services.web.struts.DispatchActionSupport;
import net.gencat.ctti.canigo.services.web.struts.SpringBindingActionForm;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class FileAction extends DispatchActionSupport {
    private ValueListActionHelper valueListActionHelper;
    private FileSystemService fileSystemService = null;
    private FileNamingService fileNamingService = null;
    private FileUploadService fileUploadService = null;
    private static String[] UPLOADED_FILES = new String[]{"file"};
    
    public ActionForward search(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        UploadedFile vo = (UploadedFile) actionForm.getTarget();
        // Esta comprobación debería estar en un BO
        if(vo.getCurrentDir()!=null&&!"".equals(vo.getCurrentDir())){
            File f = new File(vo.getCurrentDir());
            if(!f.exists()) {
                throw new UnknownDirectory("business_error.unknown_dir",new Object[]{vo.getCurrentDir()});
            }
        }   
        valueListActionHelper.search(mapping, form, request, response);
        return mapping.findForward("list");
    }
    public ActionForward create(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {
        return mapping.findForward("create");
    } 
    public ActionForward upload(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response) throws Exception {

        UploadedFiles uploadedFiles = this.fileUploadService.getUploadedFiles(request,UPLOADED_FILES);
        this.logService.getLog(this.getClass()).debug("UploadedFiles = "+uploadedFiles);
        if(uploadedFiles!=null){            
            this.logService.getLog(this.getClass()).debug("UploadedFiles has files? "+uploadedFiles.hasFiles());
            net.gencat.ctti.canigo.services.fileupload.UploadedFile uF = uploadedFiles.getFile(UPLOADED_FILES[0]);
            this.logService.getLog(this.getClass()).debug("UploadedFile is "+uF);
            SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
            UploadedFile vo = (UploadedFile) actionForm.getTarget();
            String absolutePath = !vo.getCurrentDir().endsWith(File.separator)?vo.getCurrentDir() + File.separator:vo.getCurrentDir();
            absolutePath = absolutePath+uF.getOriginalFilename();
            this.logService.getLog(this.getClass()).debug("Transferring file to "+absolutePath);
            File target = new File(absolutePath);
            if(!target.exists()){
                uF.transferTo(target);
            }
            else {
                // TODO launch business exception and show an error
                this.logService.getLog(this.getClass()).debug("Skipping file "+absolutePath+". Already exists" );
            }
            
        }
        
        return mapping.findForward("success");
    } 
    
    public ValueListActionHelper getValueListActionHelper() {
        return valueListActionHelper;
    }

    public void setValueListActionHelper(
            ValueListActionHelper valueListActionHelper) {
        this.valueListActionHelper = valueListActionHelper;
    }
    public ActionForward delete(ActionMapping mapping, ActionForm form,
            javax.servlet.http.HttpServletRequest request,
            javax.servlet.http.HttpServletResponse response)
            throws Exception {
        SpringBindingActionForm actionForm = (SpringBindingActionForm) form;
        UploadedFile vo = (UploadedFile) actionForm.getTarget();
        if(vo.getCurrentDir()!=null&&!"".equals(vo.getCurrentDir())){
            String absolutePath = !vo.getCurrentDir().endsWith(File.separator)?vo.getCurrentDir() + File.separator:vo.getCurrentDir();
            absolutePath = absolutePath+vo.getId();
            File target = new File(absolutePath);
            if(target.exists()){
                this.fileSystemService.forceDelete(target);
            }
        }
        return mapping.findForward("success");
    }


    /**
     * @return Returns the fileService.
     */
    public FileSystemService getFileSystemService() {
        return fileSystemService;
    }


    /**
     * @param fileService The fileService to set.
     */
    public void setFileSystemService(FileSystemService fileService) {
        this.fileSystemService = fileService;
    }


    /**
     * @return Returns the fileNamingService.
     */
    public FileNamingService getFileNamingService() {
        return fileNamingService;
    }


    /**
     * @param fileNamingService The fileNamingService to set.
     */
    public void setFileNamingService(FileNamingService fileNamingService) {
        this.fileNamingService = fileNamingService;
    }
    /**
     * @return Returns the fileUploadService.
     */
    public FileUploadService getFileUploadService() {
        return fileUploadService;
    }
    /**
     * @param fileUploadService The fileUploadService to set.
     */
    public void setFileUploadService(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
}
