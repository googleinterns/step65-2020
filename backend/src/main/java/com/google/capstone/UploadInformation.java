package com.google.capstone;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.capstone.Information;

import java.io.IOException;
import java.lang.String;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Servlet that stores art information in a datastore and retrieves that data to conver to json
@WebServlet("/api/v1/uploadInfo")
public class UploadInformation extends HttpServlet {
  
  /** 
   * doGet funtion that gets the information from the data store and 
   * then converts the data to json format. Currently there is no fetch function that uses this.
   */

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("ImageInformation").addSort("timestamp", SortDirection.DESCENDING);
   
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Information> infos = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String artistName = (String) entity.getProperty("artistName");
      String artTitle = (String) entity.getProperty("artTitle");
      String description = (String) entity.getProperty("description");
      long timestamp = (long) entity.getProperty("timestamp");
      String fullParagraph = artTitle + " by " + artistName + ": " + description;
      
      Information info = new Information(id, fullParagraph, timestamp);
      infos.add(info);
    }

    String json = convertToJson(infos);

    response.setContentType("application/json;");
    response.getWriter().println(json); 
  }
  
  public String convertToJson(List<Information> arr) {
    Gson gson = new Gson();
    String json = gson.toJson(arr);
    return json;
  }
  
  // doPost gets the data from the text fields and then puts them into the datastore 
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String artistName = getParameter(request, "artistName", "");
    String artTitle = getParameter(request, "artTitle", "");
    String description = getParameter(request, "description", "");
    long timestamp = System.currentTimeMillis();

    Entity mssgEntity = new Entity("ImageInformation");
    mssgEntity.setProperty("artistName", artistName);
    mssgEntity.setProperty("artTitle", artTitle);
    mssgEntity.setProperty("description", description);
    mssgEntity.setProperty("timestamp", timestamp);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(mssgEntity);

    response.sendRedirect("/user-uploads-gallery");
  }

  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }

}
