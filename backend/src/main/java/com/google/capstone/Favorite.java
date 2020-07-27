package com.google.capstone;

import com.google.appengine.api.datastore.Entity;

public class Favorite {
  private final String uid;
  private final String isMuseum;
  private final String artworkId;
  private final long timestamp;

  public Favorite(String uid, String isMuseum, String artworkId, long timestamp) {
    this.uid = uid;
    this.isMuseum = isMuseum;
    this.artworkId = artworkId;
    this.timestamp = timestamp;
  }

  public static Favorite entityToFavoriteConverter(Entity entity) {
    String uid = (String) entity.getProperty("uid");
    String isMuseum = (String) entity.getProperty("isMuseum");
    String artworkId = (String) entity.getProperty("artworkId");
    long timestamp = (long) entity.getProperty("timestamp");
    return new Favorite(uid, isMuseum, artworkId, timestamp);
  }
}
