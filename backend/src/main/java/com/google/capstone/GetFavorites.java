package com.google.capstone;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



/** Servlet responsible for getting favorites for a given user. */
@WebServlet(name = "GetFavorites", value = "/get-favorites")
public class GetFavorites extends HttpServlet {
  //vWill later be passed in as a parameter once pagination is done.
  private static final int MAX_FAVORITES = 20;
  private static final Gson gson = new Gson();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String uid = request.getParameter("uid");
    Query query = new Query(uid + "Favorites").addSort("timestamp", SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    List<Entity> results = datastore.prepare(query).asList(FetchOptions.Builder.withLimit(MAX_FAVORITES));

    List<Favorite> comments =
            results.stream()
                    .map(entity -> Favorite.entityToFavoriteConverter(entity))
                    .collect(Collectors.toList());

    response.setContentType("application/json");
    response.getWriter().println(gson.toJson(comments));
  }
}