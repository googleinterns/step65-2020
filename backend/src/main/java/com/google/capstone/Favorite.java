package com.google.capstone;

import com.google.appengine.api.datastore.Entity;

/**
 * Datatype to represent a favorite object.
 */
public class Favorite {
  private final String uid;
  private final String collection;
  private final String artworkId;
  private final String name;
  private final String alt;
  private final String url;
  private final long timestamp;

  public Favorite(String uid, String collection, String artworkId,
                  String name, String alt, String url, long timestamp) {
    this.uid = uid;
    this.collection = collection;
    this.artworkId = artworkId;
    this.name = name;
    this.alt = alt;
    this.url = url;
    this.timestamp = timestamp;
  }

  public static Favorite entityToFavoriteConverter(Entity entity) {
    String uid = (String) entity.getProperty("uid");
    String collection = (String) entity.getProperty("collection");
    String artworkId = (String) entity.getProperty("artworkId");
    String name = (String) entity.getProperty("name");
    String alt = (String) entity.getProperty("alt");
    String url = (String) entity.getProperty("url");
    long timestamp = (long) entity.getProperty("timestamp");
    return new Favorite(uid, collection, artworkId, name, alt, url, timestamp);
  }
}
