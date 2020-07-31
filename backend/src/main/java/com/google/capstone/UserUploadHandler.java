package com.google.capstone;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.blobstore.UploadOptions;
import com.google.appengine.api.blobstore.FileInfo;
 
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
 
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
 
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
 
/**
 * Servlet used to handle image upload to Google Cloud Storage using the Blobstore API
 * Also uploads Image information, blobkey, and servingURL to the Datastore
 */
@WebServlet("/api/v1/uploadImgs")
public class UserUploadHandler extends HttpServlet{
 
  public static final String GCS_BUCKET_NAME = "upload-imgs";
 
  private static final BlobstoreService blobstore = BlobstoreServiceFactory.getBlobstoreService();
 
  private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
 
  /**
   * Creates an upload URL to send the image to in GCS.
   * is used in the fetch that returns URL to action in form
   */  
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UploadOptions opts = UploadOptions.Builder.withGoogleStorageBucketName(GCS_BUCKET_NAME);
    String uploadUrl = blobstore.createUploadUrl("/api/v1/uploadImgs", opts);
 
    response.setContentType("text/html");
    response.getOutputStream().println(uploadUrl);
  }
  
  /**
   * Gets image information from form and stores in Datastore 
   * Also creates and store blobKey and serveUrl
   */
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      Map<String, List<BlobKey>> blobs = blobstore.getUploads(request);
      List<BlobKey> blobKeys = blobs.get("selectedFile"); 

      //gets info from form, entered by user
      String artistName = request.getParameter("artistName");
      String artTitle = request.getParameter("artTitle");
      String altText = request.getParameter("altText");
      String description = request.getParameter("description");
      String uniqueUserID = request.getParameter("uniqueUserID");
      long timestamp = System.currentTimeMillis();
 
      //ImageInformation entity to be added into datastore
      Entity mssgEntity = new Entity("ImageInformation");
      mssgEntity.setProperty("artistName", artistName);
      mssgEntity.setProperty("artTitle", artTitle);
      mssgEntity.setProperty("altText", altText);
      mssgEntity.setProperty("description", description);
      mssgEntity.setProperty("uniqueUserID", uniqueUserID);
      mssgEntity.setProperty("timestamp", timestamp);
 
      mssgEntity.setProperty("blobKey", blobKeys.get(0).getKeyString());
      
      datastore.put(mssgEntity);  
      
      response.sendRedirect(request.getParameter("redirectUrl"));
  }
}
