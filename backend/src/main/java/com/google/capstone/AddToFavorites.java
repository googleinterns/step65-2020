package com.google.capstone;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet used to add a favorited artwork to the user's list of favorites in Datastore.
 */
@WebServlet("/api/v1/add-to-favorites")
public class AddToFavorites extends HttpServlet {
  private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) {
    String uid = request.getParameter("uid");
    String collection = request.getParameter("collection");
    String artworkId = request.getParameter("artwork-id");
    String name = request.getParameter("name");
    String alt = request.getParameter("alt");
    String url = request.getParameter("url");
    long timestamp = System.currentTimeMillis();

    Entity favoritesEntity = new Entity(uid + "Favorites");
    favoritesEntity.setProperty("collection", collection);
    favoritesEntity.setProperty("artworkId", artworkId);
    favoritesEntity.setProperty("name", name);
    favoritesEntity.setProperty("alt", alt);
    favoritesEntity.setProperty("url", url);
    favoritesEntity.setProperty("timestamp", timestamp);

    datastore.put(favoritesEntity);
  }
}
