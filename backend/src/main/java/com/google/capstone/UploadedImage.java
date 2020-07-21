package com.google.capstone;
 
import com.google.appengine.api.datastore.Entity;
 
/**
 * Uploaded Image information from user and blobKey from blobStore
 * that will be used to be converted to json format
 */
public final class UploadedImage {
  //name title description timestamp blobkey
  private final long id;
  private final String artistName;
  private final String artTitle;
  private final String description;
  private final String blobkey;
  private final String url;
  private final long timestamp;
 
  public UploadedImage(long id, String artistName, String artTitle, String description, 
      String blobkey, String url, long timestamp) {
    this.id = id; 
    this.artistName = artistName;
    this.artTitle = artTitle;
    this.description = description;
    this.blobkey = blobkey;
    this.url = url;
    this.timestamp = timestamp;
  }
 
  public static UploadedImage convertToObject(Entity entity) {
    long id = entity.getKey().getId();
    String artistName = (String) entity.getProperty("artistName");
    String artTitle = (String) entity.getProperty("artTitle");
    String description = (String) entity.getProperty("description");
    String blobKey = (String) entity.getProperty("blobKey");
    String url = (String) entity.getProperty("url");
    long timestamp = (long) entity.getProperty("timestamp");
    return new UploadedImage(id, artistName, artTitle, description, blobKey, url, timestamp);
  }
}
