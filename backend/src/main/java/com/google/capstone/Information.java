package com.google.capstone;

/**
 * Information object used to store the information, id, and time
 * that will be used to be converted to json format
 */

public final class Information {
  private final long id;
  private final String description;
  private final long timestamp;

  public Information(long id, String description, long timestamp) {
    this.id = id;
    this.description = description;
    this.timestamp = timestamp;
  }
}
