import React, {useEffect} from 'react';
import Gallery from './Gallery';
import Banner from './Banner';
import AICimg from './images/aic-inside.jpg';
import React from 'react';
import Gallery from './Gallery';
import Banner from './Banner';
import AICimg from './images/aic-inside.jpg';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';

export default function MuseumGallery(props) {
  const API = 'https://aggregator-data.artic.edu/api/v1/artworks/249689?limit=2';

  // from https://github.com/art-institute-of-chicago/browser-extension/blob/master/script.js
  const getIIIFLevel = (artwork, displayWidth) => {
    return {
      url: 'https://www.artic.edu/iiif/2/' + artwork.image_id + '/full/' + displayWidth + ',/0/default.jpg',
      width: displayWidth,
      height: Math.floor(artwork.thumbnail.height *
        displayWidth / artwork.thumbnail.width),
    };
  };

  useEffect(() => {
    fetch(API, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
        .then((response) => response.json())
        .then((result) => {
          document.getElementById('photo')
              .setAttribute('alt', result.data.thumbnail.alt_text);
          const linkToImage = getIIIFLevel(result.data, 500);
          document.getElementById('photo').setAttribute('src', linkToImage.url);
        });
  });

  return (
    <>
      <Banner
        title="Museum Gallery"
        description="Explore the Art Institute of Chicago!"
        imgURL={AICimg}
      />
      <img id="photo" alt=""/>
      <Container>
        <Gallery />
      </Container>
    </>
  );
}
