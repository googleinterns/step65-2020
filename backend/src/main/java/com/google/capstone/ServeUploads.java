package com.google.capstone;
 
import com.google.capstone.UploadedImage;
 
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;

import com.google.gson.Gson;

import java.io.IOException; 
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet that gets all stored entities from Datastore
 * Turns entities to UploadedImage objects and converts to json
 * then returns the json in response
 */
@WebServlet("/api/v1/serveUploads")
public class ServeUploads extends HttpServlet {
 
  private static final int MAX_NUM_IMAGES = 9;
  private static final int DEFAULT_PAGE_NUM = 1;

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("ImageInformation").addSort("timestamp", SortDirection.DESCENDING);
   
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery prepdQuery = datastore.prepare(query);
    
    int pageNum = getParameter(request, "uploadsPageNum", DEFAULT_PAGE_NUM);

    List<Entity> results = prepdQuery.asList(FetchOptions.Builder
      .withOffset((pageNum-1) * MAX_NUM_IMAGES)
      .limit(MAX_NUM_IMAGES));
    
    List<UploadedImage> images = new ArrayList<>();
    for (Entity entity : results) {
      UploadedImage image = UploadedImage.convertToObject(entity);
      images.add(image);
    }
 
    String json = convertToJson(images);
    
    response.setContentType("text/json");
    response.getWriter().println(json);
  }

  private int getParameter(HttpServletRequest request, String parameterName, int defaultValue) {
    String parameterString = request.getParameter(parameterName);
    int parameter;
    try {
      parameter = Integer.parseInt(parameterString);
    } catch (NumberFormatException e) {
      return defaultValue;
    }
    return parameter;
  }
 
  public static String convertToJson(List<UploadedImage> arr) {
    Gson gson = new Gson();
    String json = gson.toJson(arr);
    return json;
  }
}
