package com.google.capstone;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.blobstore.FileInfo;
import com.google.appengine.api.blobstore.UploadOptions;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
public class UploadImg extends HttpServlet{

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
   * doesn't do anything other than handle the redirect from the backend back to the frontend (as of now)
   */
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      BlobstoreService blobstore = BlobstoreServiceFactory.getBlobstoreService();

      Map<String, List<FileInfo>> uploads = blobstore.getFileInfos(request);
      List<FileInfo> fileInfos = uploads.get("files");

      //deployment link
      //response.sendRedirect("https://igunda-isangimino-nstroupe.uc.r.appspot.com/user-uploads-gallery");
      //development link
      response.sendRedirect("https://3001-ba659410-163c-49e0-b45f-c22c5b2dc8b5.us-central1.cloudshell.dev/user-uploads-gallery");
  }
}
