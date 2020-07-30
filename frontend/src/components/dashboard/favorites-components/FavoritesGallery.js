import React from 'react';
import Grid from '@material-ui/core/Grid';
import ImgMediaCard from '../gallery-components/ImgMediaCard';
import {useSelector} from 'react-redux';


export default function FavoritesGallery() {
  const artworks = useSelector((state) =>
    state.favorites.artworks);
  const loading = useSelector((state) =>
    state.favorites.loading);

  let cards;
  if (!loading && artworks) {
    cards = artworks.map((artwork, value) => (
      <Grid key={value} item>
        <ImgMediaCard
          name={artwork.name}
          link={`/gallery/${artwork.collection}/${artwork.artworkId}`}
          alt={artwork.alt}
          url={artwork.url}
        />
      </Grid>
    ));
  }


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
