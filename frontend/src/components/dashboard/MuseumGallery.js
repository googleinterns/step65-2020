import React, {useState, useEffect} from 'react';
import Gallery from './Gallery';
import Banner from './Banner';
import AICimg from './images/aic-inside.jpg';
import Container from '@material-ui/core/Container';
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

export default function MuseumGallery(props) {
  const API = 'https://aggregator-data.artic.edu/api/v1/artworks?limit=9';

  const [artworksInfo, setArtworksInfo] = useState();

  // from https://github.com/art-institute-of-chicago/browser-extension/blob/master/script.js
  const getIIIFLevel = (artwork, displayWidth) => {
    return {
      url: 'https://www.artic.edu/iiif/2/' + artwork.image_id + '/full/' + displayWidth + ',/0/default.jpg',
      width: displayWidth,
      height: Math.floor(artwork.thumbnail.height *
        displayWidth / artwork.thumbnail.width),
    };
  };
  const getArtworkInfo = (artwork) => {
    const alt = artwork.thumbnail.alt_text;
    const linkToImage = getIIIFLevel(artwork, 500);
    const title = artwork.title;
    const artworkInfo = new Map();
    artworkInfo.set('alt', alt);
    artworkInfo.set('url', linkToImage.url);
    artworkInfo.set('title', title);
    return artworkInfo;
  };
  useEffect(() => {
    const artworksArr = [];
    fetch(API, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
        .then((response) => response.json())
        .then((artworks) => {
          for (let i = 0; i < artworks.data.length; i++){
            const artwork = artworks.data[i];
            if (artwork.thumbnail != null) {
              artworksArr.push(getArtworkInfo(artwork));
            }
          }
          setArtworksInfo(artworksArr);
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
        <Gallery artworks={artworksInfo}/>
      </Container>
    </>
  );
}
