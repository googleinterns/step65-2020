package com.google.capstone;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;

import com.google.gson.Gson;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Endpoint to get single image given id
 */
@WebServlet("/getImage")
public class ServeImage extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    long id = Long.parseLong(request.getParameter("id"));

    Key imageEntityKey = KeyFactory.createKey("ImageInformation", id);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity imageEntity = null;
    try{
      imageEntity = datastore.get(imageEntityKey);
    } catch (EntityNotFoundException e) {
      String errorMsg = "Invalid object id.";
      response.sendError(400, errorMsg);
    }

    UploadedImage imageObject = UploadedImage.convertToObject(imageEntity);

    String json = convertToJson(imageObject);
    
    response.setContentType("text/json");
    response.getWriter().println(json);
  }

  public static String convertToJson(UploadedImage img) {
    Gson gson = new Gson();
    String json = gson.toJson(img);
    return json;
  }
}
