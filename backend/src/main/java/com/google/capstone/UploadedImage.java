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
  private final String blobkey;
  private final String url;
  private final long timestamp;
 
  public UploadedImage(long id, String artistName, String artTitle, String altText, 
      String description, String blobkey, String url, long timestamp) {
    this.id = id; 
    this.artistName = artistName;
    this.artTitle = artTitle;
    this.altText = altText;
    this.description = description;
    this.blobkey = blobkey;
    this.url = url;
    this.timestamp = timestamp;
  }
 
  public static UploadedImage convertToObject(Entity entity) {
    long id = entity.getKey().getId();
    String artistName = (String) entity.getProperty("artistName");
    String artTitle = (String) entity.getProperty("artTitle");
    String altText = (String) entity.getProperty("altText");
    String description = (String) entity.getProperty("description");
    String blobKey = (String) entity.getProperty("blobKey");
    String url = (String) entity.getProperty("url");
    long timestamp = (long) entity.getProperty("timestamp");
    return new UploadedImage(id, artistName, artTitle, altText, description, blobKey, url, timestamp);
  }
}
