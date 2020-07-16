import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import ImgMediaCard from './ImgMediaCard';
import PropTypes from 'prop-types';
import {generateTextToSpeech, getAudioTranscript} from '../textToSpeechHelpers';
import {useSelector} from 'react-redux';


export default function Gallery({size}) {
  const artworksMap = useSelector((state) => (state.museumArtworks.artworks));
  const loading = useSelector((state) => (state.museumArtworks.loading));
  let artworks = Array.from(artworksMap);
  if (size) {
    artworks = artworks.slice(0, size);
  }

  let cards;
  if (!loading && artworks) {
    cards = artworks.map(([key, artwork]) => (
      <Grid key={key} item>
        <ImgMediaCard
          name={artwork.get('title')}
          link={`/gallery/${key}`}
          alt={artwork.get('alt')}
          url={artwork.get('url')}
        />
      </Grid>
    ));
  }

  // generate audio before users view artwork to reduce audio wait time
  useEffect(() => {
    if (!loading && artworks) {
      artworks.forEach(([id, artwork]) => {
        generateTextToSpeech(getAudioTranscript(artwork), id);
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

Gallery.propTypes = {
  size: PropTypes.number,
};
