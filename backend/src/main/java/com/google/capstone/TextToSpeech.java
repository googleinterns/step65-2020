package com.google.capstone;


import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.cloud.texttospeech.v1.AudioConfig;
import com.google.cloud.texttospeech.v1.AudioEncoding;
import com.google.cloud.texttospeech.v1.SsmlVoiceGender;
import com.google.cloud.texttospeech.v1.SynthesisInput;
import com.google.cloud.texttospeech.v1.SynthesizeSpeechResponse;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.VoiceSelectionParams;
import com.google.protobuf.ByteString;
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
      } catch (IOException e) {
        response.sendError(500, "Unable to generate audio file.");
      }
    } else {
      response.sendError(400, "Invalid text.");
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

  private void createFile(ByteString audioContents, HttpServletResponse response) throws IOException {
    try (OutputStream out = new FileOutputStream("output.mp3")) {
      out.write(audioContents.toByteArray());
    } catch (IOException e) {
      response.sendError(500, "Unable to create audio file.");
    }
  }

}
