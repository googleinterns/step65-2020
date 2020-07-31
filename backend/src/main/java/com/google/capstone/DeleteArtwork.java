package com.google.capstone;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** 
 * Deletes artwork from datastore when requested by artwork id
 */
@WebServlet("/api/v1/delete-artwork")
public class DeleteArtwork extends HttpServlet {

  private static final BlobstoreService blobstore = BlobstoreServiceFactory.getBlobstoreService();

  private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    long id = Long.parseLong(request.getParameter("id"));
    Key artEntityKey = KeyFactory.createKey("ImageInformation", id);

    Entity artwork = null;
    try{
      artwork = datastore.get(artEntityKey);
    } catch(EntityNotFoundException e) {
      String errorMsg = "Unable to retrieve image";
      response.sendError(500, errorMsg);
    }

    blobstore.delete(blobKey);
    datastore.delete(artEntityKey);
  }
}
