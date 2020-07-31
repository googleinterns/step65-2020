package com.google.capstone;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


/** Servlet responsible for finding if their is a favorite matching the parameters.
 *  A Favorite is returned if found, otherwise null.
 * */
@WebServlet(name = "findFavorite", value = "/api/v1/find-favorite")
public class FindFavorite extends HttpServlet {

  private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  private static final Gson gson = new Gson();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String uid = request.getParameter("uid");
    String artworkId = request.getParameter("artwork-id");
    String collection = request.getParameter("collection");

    response.setContentType("application/json");
    response.getWriter().println(gson.toJson(findFavorite(uid, artworkId, collection)));
  }

  private Favorite findFavorite(String uid, String artworkId, String collection) {
    Filter artworkIdFilter = new FilterPredicate("artworkId", FilterOperator.EQUAL, artworkId);
    Filter collectionFilter = new FilterPredicate("collection", FilterOperator.EQUAL, collection);
    Filter artworkIdAndCollectionFilter = CompositeFilterOperator.and(artworkIdFilter, collectionFilter);

    Query query = new Query(uid + "Favorites").setFilter(artworkIdAndCollectionFilter);
    List<Entity> results = datastore.prepare(query).asList(FetchOptions.Builder.withLimit(1));

    List<Favorite> favorites = results.stream()
        .map(entity -> Favorite.entityToFavoriteConverter(entity))
        .collect(Collectors.toList());
    return favorites.isEmpty() ? null : favorites.get(0);
  }
}
