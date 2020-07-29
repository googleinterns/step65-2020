package com.google.capstone;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
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
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    long id = Long.parseLong(request.getParameter("id"));

    /*FilterPredicate fp = new FilterPredicate("id", FilterOperator.EQUAL, id);
    
    Query query = new Query("ImageInformation").setFilter(fp).addSort("timestamp", SortDirection.DESCENDING);
   
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    
    List<UploadedImage> images = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      UploadedImage image = UploadedImage.convertToObject(entity);
      images.add(image);
    }*/

    Key artEntityKey = KeyFactory.createKey("ImageInformation", id);

    //BlobstoreService blobstore = BlobstoreServiceFactory.getBlobstoreService();
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    //blobstore.delete(artEntityKey);
    datastore.delete(artEntityKey);
  }
}