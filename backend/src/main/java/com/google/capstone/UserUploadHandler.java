package com.google.capstone;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.blobstore.FileInfo;
import com.google.appengine.api.blobstore.UploadOptions;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet used to handle image upload to Google Cloud Storage using the Blobstore API
 * Successfully uploads images, but redirects to backend server so needs fixing
 */
@WebServlet("/api/v1/uploadImgs")
public class UserUploadHandler extends HttpServlet{

  public static final String GCS_BUCKET_NAME = "upload-imgs";

  /**
   * creates an upload URL to send the image to in GCS.
   * is used in the fetch that returns URL to action in form
   */  
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    BlobstoreService blobstore = BlobstoreServiceFactory.getBlobstoreService();
    
    UploadOptions opts = UploadOptions.Builder.withGoogleStorageBucketName(GCS_BUCKET_NAME);
    String uploadUrl = blobstore.createUploadUrl("/api/v1/uploadImgs", opts);

    response.setContentType("text/html");
    response.getOutputStream().println(uploadUrl);
  }
  
  /**
   * Gets image information from form and stores in Datastore 
   * Note to self: store blobkey for access?
   */
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      String artistName = getParameter(request, "artistName");
      String artTitle = getParameter(request, "artTitle");
      String description = getParameter(request, "description");
      long timestamp = System.currentTimeMillis();

      Entity mssgEntity = new Entity("ImageInformation");
      mssgEntity.setProperty("artistName", artistName);
      mssgEntity.setProperty("artTitle", artTitle);
      mssgEntity.setProperty("description", description);
      mssgEntity.setProperty("timestamp", timestamp);

      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      datastore.put(mssgEntity); 
      
      //deployment link
      //response.sendRedirect("https://igunda-isangimino-nstroupe.uc.r.appspot.com/user-uploads-gallery");
      //development link
      response.sendRedirect("https://3001-ba659410-163c-49e0-b45f-c22c5b2dc8b5.us-central1.cloudshell.dev/user-uploads-gallery");
  }
  
  private String getParameter(HttpServletRequest request, String name) {
    String value = request.getParameter(name);
    return value;
  }
}
