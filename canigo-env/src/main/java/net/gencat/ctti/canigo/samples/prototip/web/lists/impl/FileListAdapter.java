package net.gencat.ctti.canigo.samples.prototip.web.lists.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import net.gencat.ctti.canigo.samples.prototip.model.UploadedFile;
import net.mlw.vlh.DefaultListBackedValueList;
import net.mlw.vlh.ValueList;
import net.mlw.vlh.ValueListInfo;
import net.mlw.vlh.adapter.AbstractValueListAdapter;
import net.mlw.vlh.web.tag.support.Spacer;
import net.gencat.ctti.canigo.services.file.FileSystemService;
import net.gencat.ctti.canigo.services.logging.LoggingService;
import net.gencat.ctti.canigo.services.web.lists.exception.WebListsServiceException;

public class FileListAdapter extends AbstractValueListAdapter {
    private String currentDirFilterName = null;

    private FileSystemService fileService = null;

    private LoggingService logService = null;

    private String tempDir = null;

    public FileListAdapter() {
        super();
    }

    public ValueList getValueList(String name, ValueListInfo info) {
        if (this.currentDirFilterName == null||this.tempDir == null) {
            throw new WebListsServiceException(
                    "canigo.samples.prototip.current_dir_filter_name_not_specified");
        }
        if (info.getSortingColumn() == null) {
            info.setPrimarySortColumn(getDefaultSortColumn());
            info.setPrimarySortDirection(getDefaultSortDirectionInteger());
        }

        if (info.getPagingNumberPer() == Integer.MAX_VALUE) {
            info.setPagingNumberPer(getDefaultNumberPerPage());
        }

        String currentDir = (String) info.getFilters().get(
                this.currentDirFilterName);
        this.logService.getLog(this.getClass()).debug("CurrentDirFilterName="+this.currentDirFilterName+" with value "+currentDir);
        if (currentDir == null||"".equals(currentDir)){
            this.logService.getLog(this.getClass()).debug("current dir is null or blank");
            List dummyList = new ArrayList();
            dummyList.add( new Spacer() );
            return new DefaultListBackedValueList(dummyList, info);
        }
        if(currentDir.indexOf(File.separator)==-1){
            currentDir = currentDir + File.separator;
        }

        boolean doPage = ((getAdapterType() & DO_PAGE) == 0);
        List list = new ArrayList();

        if (doPage) {
            this.logService.getLog(this.getClass()).debug(
                    "getValueList(String adapterName = " + name
                            + ", ValueListInfo info = " + info
                            + ") - Start to paging result set");

            List allFiles = new ArrayList();
            Iterator it = this.fileService.listFiles(new File(currentDir),
                    null, false).iterator();
            while (it.hasNext()) {
                allFiles.add(it.next());
            }
            this.logService.getLog(this.getClass()).debug("All files from "+currentDir+" size is "+allFiles.size());
            if (allFiles.size() > 0) {
                int pageNumber = info.getPagingPage();
                int numberPerPage = (info.getPagingNumberPer() > 0) ? info
                        .getPagingNumberPer() : getDefaultNumberPerPage();
                this.logService.getLog(this.getClass()).debug("pageNumber="+pageNumber+",numberPerPage="+numberPerPage);
                for (int i = (pageNumber-1) * numberPerPage; i < pageNumber * numberPerPage; i++) {
                    File f = (File)allFiles.get(i);
                    String path = f.getAbsolutePath().indexOf(File.separator)!=-1?f.getAbsolutePath().substring(0,f.getAbsolutePath().lastIndexOf(File.separator)+1):f.getAbsolutePath();
                    list.add(new UploadedFile(f.getName(),null,path));

                    if (i == allFiles.size() - 1) {
                        break;
                    }
                }

                info.setTotalNumberOfEntries(allFiles.size());
                this.logService.getLog(this.getClass()).debug("Paged list size is "+list.size());
            }

            this.logService.getLog(this.getClass()).debug("Sorting finished.");
        } else {
            this.logService.getLog(this.getClass()).debug(
                    "Retrieving a list directly from the all files.");
            Iterator it = this.fileService.listFiles(new File(currentDir),
                    null, false).iterator();
            while (it.hasNext()) {
                File f = (File)it.next();
                String path = f.getAbsolutePath().indexOf(File.separator)!=-1?f.getAbsolutePath().substring(0,f.getAbsolutePath().lastIndexOf(File.separator)+1):f.getAbsolutePath();
                list.add(new UploadedFile(f.getName(),null,path));
            }
            info.setTotalNumberOfEntries(list.size());
        }

        return new DefaultListBackedValueList(list, info);
    }

    /**
     * @return Returns the currentDirFilter.
     */
    public String getCurrentDirFilterName() {
        return currentDirFilterName;
    }

    /**
     * @param currentDirFilter
     *            The currentDirFilter to set.
     */
    public void setCurrentDirFilterName(String currentDirFilterName) {
        this.currentDirFilterName = currentDirFilterName;
    }

    /**
     * @return Returns the fileService.
     */
    public FileSystemService getFileService() {
        return fileService;
    }

    /**
     * @param fileService
     *            The fileService to set.
     */
    public void setFileService(FileSystemService fileService) {
        this.fileService = fileService;
    }

    /**
     * @return Returns the tempDir.
     */
    public String getTempDir() {
        return tempDir;
    }

    /**
     * @param tempDir
     *            The tempDir to set.
     */
    public void setTempDir(String tempDir) {
        this.tempDir = tempDir;
    }

    /**
     * @return Returns the logService.
     */
    public LoggingService getLogService() {
        return logService;
    }

    /**
     * @param logService
     *            The logService to set.
     */
    public void setLogService(LoggingService logService) {
        this.logService = logService;
    }

}
