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
@WebServlet(name = "GetFavorites", value = "/api/v1/get-favorites")
public class GetFavorites extends HttpServlet {
  private static final int NUM_FAVORITES = 9;
  private static final int DEFAULT_PAGE = 1;
  private static final Gson gson = new Gson();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String uid = request.getParameter("uid");
    int page = getParameter(request, "page", DEFAULT_PAGE);
    Query query = new Query(uid + "Favorites").addSort("timestamp", SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    List<Entity> results = datastore.prepare(query).asList(FetchOptions.Builder
            .withOffset((page-1) * NUM_FAVORITES)
            .limit(NUM_FAVORITES));

    List<Favorite> favorites =
            results.stream()
                    .map(entity -> Favorite.entityToFavoriteConverter(entity))
                    .collect(Collectors.toList());

    response.setContentType("application/json");
    response.getWriter().println(gson.toJson(favorites));
  }

  /**
   * Returns the request parameter or default value if invalid.
   */
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
}
