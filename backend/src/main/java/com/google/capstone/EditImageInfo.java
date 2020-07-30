package com.google.capstone;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** 
 * Updates either alt text or description of the image in Datastore.
 */
@WebServlet("/api/v1/edit-info")
public class EditImageInfo extends HttpServlet {

  private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String param = request.getParameter("selection");
    long id = Long.parseLong(request.getParameter("id"));
    Key artEntityKey = KeyFactory.createKey("ImageInformation", id);
    String newContent = request.getParameter("image-info");

    try{
      Entity artwork = datastore.get(artEntityKey);
      artwork.setProperty(param, newContent);

      datastore.put(artwork);
    } catch(EntityNotFoundException e) {
      String errorMsg = "Unable to retrieve image";
      response.sendError(500, errorMsg);
    }

    response.sendRedirect(request.getParameter("redirectUrl"));
  }
}
