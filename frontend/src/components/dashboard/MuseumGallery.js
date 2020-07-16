import React from 'react';
import Gallery from './gallery-components/Gallery';
import Banner from './gallery-components/Banner';
import AICimg from './images/aic-inside.jpg';
import Container from '@material-ui/core/Container';
import {useSelector} from 'react-redux';
import SearchAndFilterBar from './gallery-components/SearchAndFilterBar';


export default function MuseumGallery() {
  const artworksMap = useSelector((state) => (state.museumArtworks.artworks));
  const artworks = Array.from(artworksMap);

  return (
    <>
      <Banner
        title="Museum Gallery"
        description="Explore the Art Institute of Chicago!"
        imgURL={AICimg}
      />
      <Container>
        <SearchAndFilterBar/>
        <Gallery artworks={artworks}/>
      </Container>
    </>
  );
}


