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


/** Servlet responsible for counting number of favorites for given user */
@WebServlet(name = "GetFavoritesCount", value = "/api/v1/get-favorites-count")
public class GetFavoritesCount extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String uid = request.getParameter("uid");
    Query query = new Query(uid + "Favorites");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    PreparedQuery results = datastore.prepare(query);
    int count = results.countEntities(FetchOptions.Builder.withDefaults());

    System.out.println(count);
    System.out.println(uid);

    response.setContentType("text/html");
    response.getWriter().println(count);
  }
}