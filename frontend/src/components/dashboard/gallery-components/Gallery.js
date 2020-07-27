import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import ImgMediaCard from './ImgMediaCard';
import PropTypes from 'prop-types';
import {generateTextToSpeech, getMuseumAudioTranscript,
  getUserAudioTranscript} from '../textToSpeechHelpers';
import {useSelector, useDispatch} from 'react-redux';
import {fetchMuseumArtworks} from '../../../redux/museumArtworkActions';


export default function Gallery({size, isMuseum, isPreview}) {
  const artworksMap = useSelector((state) =>
    (isMuseum ? state.museumArtworks.artworks : state.userArtworks.artworks));
  const loading = useSelector((state) =>
    (isMuseum ? state.museumArtworks.loading: state.userArtworks.loading));
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
          link={`/gallery/${isMuseum ? 'museum' : 'user'}/${key}`}
          alt={artwork.get('alt')}
          url={artwork.get('url')}
        />
      </Grid>
    ));
  }

  const dispatch = useDispatch();
  const LIMIT = 9;
  const FIRST_PAGE = 1;
  const EMPTY_QUERY = '';
  useEffect(() => {
    if (isPreview) {
      dispatch(fetchMuseumArtworks(FIRST_PAGE, LIMIT, EMPTY_QUERY));
    }
  }, [dispatch]);

  // generate audio before users view artwork to reduce audio wait time
  useEffect(() => {
    if (!loading && artworks) {
      artworks.forEach(([id, artwork]) => {
        generateTextToSpeech(isMuseum ?
            getMuseumAudioTranscript(artwork) :
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

Gallery.propTypes = {
  size: PropTypes.number,
  isMuseum: PropTypes.bool,
  isPreview: PropTypes.bool,
};
