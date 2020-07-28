import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import MyArtImgMediaCard from './MyArtImgMediaCard';
import {generateTextToSpeech,
  getUserAudioTranscript} from '../textToSpeechHelpers';
import {useSelector} from 'react-redux';


export default function MyArtsGallery() {
  const artworksMap = useSelector((state) =>
    state.myArtworks.artworks);
  const loading = useSelector((state) =>
    state.myArtworks.loading);
  const artworks = Array.from(artworksMap);

  let cards;
  if (!loading && artworks) {
    cards = artworks.map(([key, artwork]) => (
      <Grid key={key} item>
        <MyArtImgMediaCard
          name={artwork.get('title')}
          link={`/gallery/user/${key}`}
          alt={artwork.get('alt')}
          url={artwork.get('url')}
          id={artwork.get('id')}
        />
      </Grid>
    ));
  }

  // generate audio before users view artwork to reduce audio wait time
  useEffect(() => {
    if (!loading && artworks) {
      artworks.forEach(([id, artwork]) => {
        generateTextToSpeech(
            getUserAudioTranscript(artwork), id);
      });
    }
  });

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        {artworks ? cards : <p>Loading...</p>}
      </Grid>
    </>
  );
}
