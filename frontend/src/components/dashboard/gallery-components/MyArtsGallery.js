import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import ImgMediaCard from './ImgMediaCard';
import {generateTextToSpeech,
  getUserAudioTranscript} from '../textToSpeechHelpers';
import {useSelector} from 'react-redux';


export default function MyArtsGallery() {
  const artworksMap = useSelector((state) =>
    state.myArtworks.artworks);
  const loading = useSelector((state) =>
    state.myArtworks.loading);
  const artworks = Array.from(artworksMap);
  const isMyArt = useState(true);

  let cards;
  if (!loading && artworks) {
    cards = artworks.map(([key, artwork]) => (
      <Grid key={key} item>
        <ImgMediaCard
          name={artwork.get('title')}
          link={`/gallery/user/${key}`}
          alt={artwork.get('alt')}
          url={artwork.get('url')}
          id={artwork.get('id')}
          isMyArt={isMyArt}
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
