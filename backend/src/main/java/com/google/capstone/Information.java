package com.google.capstone;

public final class Information  {
  private final long id;
  private final String description;
  private final long timestamp;

  public Information(long id, String description, long timestamp) {
    this.id = id;
    this.description = description;
    this.timestamp = timestamp;
  }
}
