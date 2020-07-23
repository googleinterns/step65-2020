package com.google.capstone;
 
import com.google.appengine.api.datastore.Entity;
 
/**
 * Uploaded Image information from user and blobKey from blobStore
 * that will be used to be converted to json format
 */
public final class UploadedImage {
  private final long id;
  private final String artistName;
  private final String artTitle;
  private final String altText;
  private final String description;
  private final String blobKey;
  private final long timestamp;
 
  public UploadedImage(long id, String artistName, String artTitle, String altText, 
      String description, String blobKey, long timestamp) {
    this.id = id; 
    this.artistName = artistName;
    this.artTitle = artTitle;
    this.altText = altText;
    this.description = description;
    this.blobKey = blobKey;
    this.timestamp = timestamp;
  }
 
  public static UploadedImage convertToObject(Entity entity) {
    long id = entity.getKey().getId();
    String artistName = (String) entity.getProperty("artistName");
    String artTitle = (String) entity.getProperty("artTitle");
    String altText = (String) entity.getProperty("altText");
    String description = (String) entity.getProperty("description");
    String blobKey = (String) entity.getProperty("blobKey");
    long timestamp = (long) entity.getProperty("timestamp");
    return new UploadedImage(id, artistName, artTitle, altText, description, blobKey, timestamp);
  }
}
