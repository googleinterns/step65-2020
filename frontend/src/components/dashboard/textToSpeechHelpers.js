export function getAudioTranscript(artwork) {
  const title = artwork.get('title');
  const artist = artwork.get('artist');
  const alt = artwork.get('alt');
  const strippedDescription = strip(artwork.get('description'));
  const department = artwork.get('department');
  return `This is a piece from the ${department} collection 
        titled ${title} by ${artist}. 
        It is ${alt}. ${strippedDescription}`;
}

function strip(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function generateTextToSpeech(audioTranscript, id) {
  const params = new URLSearchParams();
  params.append('text', audioTranscript);
  params.append('id', id);
  return fetch('/api/v1/tts', {method: 'POST', body: params});
}
