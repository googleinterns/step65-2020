package com.google.capstone;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet used to add a favorited artwork to the user's list of favorites in Datatstore.
 */
@WebServlet("/api/v1/delete-favorite")
public class DeleteFavorite extends HttpServlet {
  private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String uid = request.getParameter("uid");
    long id = getFavoriteId(request, response);

    Key favoriteEntityKey = KeyFactory.createKey(uid + "Favorites", id);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    try {
      datastore.delete(favoriteEntityKey);
    } catch(IllegalArgumentException e) {
      response.sendError(400, "Invalid favorite ID.");
    }
  }

  /**
   * Returns the favorite id parameter of the request or -1 if invalid and set error code.
   */
  private long getFavoriteId(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String favoriteIdString = request.getParameter("id");
    long favoriteId;
    try {
      favoriteId = Long.parseLong(favoriteIdString);
    } catch (NumberFormatException e) {
      response.sendError(400, "Invalid favorite ID format.");
      return -1;
    }
    return favoriteId;
  }
}
