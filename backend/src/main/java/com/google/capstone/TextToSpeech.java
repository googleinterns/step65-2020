package com.google.capstone;


import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

<<<<<<< HEAD
=======
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
>>>>>>> master
import com.google.cloud.texttospeech.v1.AudioConfig;
import com.google.cloud.texttospeech.v1.AudioEncoding;
import com.google.cloud.texttospeech.v1.SsmlVoiceGender;
import com.google.cloud.texttospeech.v1.SynthesisInput;
import com.google.cloud.texttospeech.v1.SynthesizeSpeechResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.VoiceSelectionParams;
import com.google.protobuf.ByteString;
<<<<<<< HEAD
import java.io.FileOutputStream;
import java.io.OutputStream;



@WebServlet(name = "TextToSpeech", value = "/api/v1/tts")
public class TextToSpeech extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String textString = request.getParameter("text");
    if (!textString.isEmpty()) {
      try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
        ByteString audioContents = generateAudio(textToSpeechClient, textString);
        createFile(audioContents, response);
=======


/*
 * Servlet takes input of object id & text and generates an audio file from the text.
 * Audio file can be found at 'https://storage.cloud.google.com/tts-audio/object-id'
 */
@WebServlet(name = "TextToSpeech", value = "/api/v1/tts")
public class TextToSpeech extends HttpServlet {

  private static final String PROJECT_ID = "igunda-isangimino-nstroupe";
  private static final String BUCKET_NAME = "tts-audio";
  private static final String TTS_LINK = "https://storage.cloud.google.com/tts-audio/";

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String textString = request.getParameter("text");
    String objectIdString = request.getParameter("id");
    if (!textString.isEmpty() && !objectIdString.isEmpty()) {
      try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create()) {
        ByteString audioContents = generateAudio(textToSpeechClient, textString);
        uploadAudio(audioContents, response, objectIdString);
>>>>>>> master
      } catch (IOException e) {
        response.sendError(500, "Unable to generate audio file.");
      }
    } else {
<<<<<<< HEAD
      response.sendError(400, "Invalid text.");
=======
      response.sendError(400, "Invalid text or object id.");
>>>>>>> master
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
    return ttsResponse.getAudioContent();
  }

  private void uploadAudio(ByteString audioContents, HttpServletResponse response, String objectIdString) throws IOException {
    Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).build().getService();
    BlobId blobId = BlobId.of(BUCKET_NAME, objectIdString);
    BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("audio/mpeg").build();
    storage.create(blobInfo, audioContents.toByteArray());
    response.setContentType("text/plain");
    response.getWriter().println(TTS_LINK + objectIdString);
  }

}
