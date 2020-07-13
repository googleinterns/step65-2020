import React, {useEffect} from 'react';
import Gallery from './Gallery';
import Banner from './Banner';
import AICimg from './images/aic-inside.jpg';
import Container from '@material-ui/core/Container';
import {fetchMuseumArtworks} from '../../redux/museumArtworkActions';
import {useDispatch, useSelector} from 'react-redux';

export default function MuseumGallery() {
  const artworks = useSelector((state) => (state.museumArtworks.artworks));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMuseumArtworks());
  }, [dispatch]);

  return (
    <>
      <Banner
        title="Museum Gallery"
        description="Explore the Art Institute of Chicago!"
        imgURL={AICimg}
      />
      <img id="photo" alt=""/>
      <Container>
        <Gallery artworks={artworks}/>
      </Container>
    </>
  );
}


