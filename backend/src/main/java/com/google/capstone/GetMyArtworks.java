package com.google.capstone;
 
import com.google.capstone.UploadedImage;
 
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.FilterOperator;

import com.google.gson.Gson;

import java.io.IOException; 
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet that gets user's uploaded images
 */
@WebServlet("/api/v1/get-my-artworks")
public class GetMyArtworks extends HttpServlet {
 
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String uid = request.getParameter("uid");
    FilterPredicate fp = new FilterPredicate("uniqueUserID", FilterOperator.EQUAL, uid);
    
    Query query = new Query("ImageInformation").setFilter(fp).addSort("timestamp", SortDirection.DESCENDING);
   
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    
    List<UploadedImage> images = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      UploadedImage image = UploadedImage.convertToObject(entity);
      images.add(image);
    }
 
    String json = convertToJson(images);
    
    response.setContentType("text/json");
    response.getWriter().println(json);
  }
 
  public static String convertToJson(List<UploadedImage> arr) {
    Gson gson = new Gson();
    String json = gson.toJson(arr);
    return json;
  }
}
