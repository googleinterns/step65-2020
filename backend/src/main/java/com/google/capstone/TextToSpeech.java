package com.google.capstone;


import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageException;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.texttospeech.v1.AudioConfig;
import com.google.cloud.texttospeech.v1.AudioEncoding;
import com.google.cloud.texttospeech.v1.SsmlVoiceGender;
import com.google.cloud.texttospeech.v1.SynthesisInput;
import com.google.cloud.texttospeech.v1.SynthesizeSpeechResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.VoiceSelectionParams;
import com.google.protobuf.ByteString;


/*
 * Servlet takes input of object id & text and generates an audio file from the text.
 * Returns the Google Cloud Storage BlobKey that can be used get the blob:
 * "/api/v1/get-blob?blob-key={blobKey}"
 */
@WebServlet(name = "TextToSpeech", value = "/api/v1/tts")
public class TextToSpeech extends HttpServlet {

  private static final Logger logger = Logger.getLogger(TextToSpeech.class.getName());
  private static final String PROJECT_ID = "igunda-isangimino-nstroupe";
  private static final String BUCKET_NAME = "tts-audio";


  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String textString = request.getParameter("text");
    String objectIdString = request.getParameter("id");
    if (!textString.isEmpty() && !objectIdString.isEmpty()) {
      try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
        ByteString audioContents = generateAudio(textToSpeechClient, textString);
        uploadAudio(audioContents, response, objectIdString);
        String blobKey = generateBlobKey(objectIdString);
        response.setContentType("text/plain");
        response.getWriter().println(blobKey);
      } catch (IOException e) {
        String errorMsg = "Unable to generate audio file.";
        logger.severe(errorMsg);
        response.sendError(500, errorMsg);
      }
    } else {
      String errorMsg = "Invalid text or object id.";
      logger.severe(errorMsg);
      response.sendError(400, errorMsg);
    }
  }

  private ByteString generateAudio(TextToSpeechClient textToSpeechClient, String textString) {
    SynthesisInput input = SynthesisInput.newBuilder().setText(textString).build();
    VoiceSelectionParams voice =
            VoiceSelectionParams.newBuilder()
                    .setLanguageCode("en-US")
                    .setSsmlGender(SsmlVoiceGender.NEUTRAL)
                    .build();
    AudioConfig audioConfig =
            AudioConfig.newBuilder().setAudioEncoding(AudioEncoding.MP3).build();
    SynthesizeSpeechResponse ttsResponse =
            textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);
    logger.info("Text successfully synthesized to speech.");
    return ttsResponse.getAudioContent();
  }

  private void uploadAudio(ByteString audioContents, HttpServletResponse response, String objectIdString) throws IOException {
    Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).build().getService();
    BlobId blobId = BlobId.of(BUCKET_NAME, objectIdString);
    BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("audio/mpeg").build();
    try {
      storage.create(blobInfo, audioContents.toByteArray());
    } catch (StorageException e) {
      logger.severe("Audio file unable to be uploaded to Google Cloud Storage.");
    }
    logger.info("Audio file successfully uploaded to Google Cloud Storage.");
  }

  private String generateBlobKey(String objectIdString) {
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    BlobKey blobKey = blobstoreService.createGsBlobKey(
            "/gs/" + BUCKET_NAME + "/" + objectIdString);
    return blobKey.getKeyString();
  }

}
