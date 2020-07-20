import React from 'react';
import Gallery from './gallery-components/Gallery';
import Banner from './gallery-components/Banner';
import AICimg from './images/aic-inside.jpg';
import Container from '@material-ui/core/Container';
import SearchAndFilterBar from './gallery-components/SearchAndFilterBar';


export default function MuseumGallery() {

  return (
    <>
      <Banner
        title="Museum Gallery"
        description="Explore the Art Institute of Chicago!"
        imgURL={AICimg}
      />
      <Container>
        <SearchAndFilterBar/>
        <Gallery isMuseum={true}/>
      </Container>
    </>
  );
}


