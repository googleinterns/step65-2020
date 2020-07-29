package com.google.capstone;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.FetchOptions.Builder;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for counting number of images */
@WebServlet("/api/v1/uploadsCount")
public class UploadsCount extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("ImageInformation");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    PreparedQuery results = datastore.prepare(query);
    int count = results.countEntities(FetchOptions.Builder.withDefaults());

    response.setContentType("text/html");
    response.getWriter().println(count);
  }
}
