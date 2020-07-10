import React, {useState, useEffect} from 'react';
import Gallery from './Gallery';
import Banner from './Banner';
import AICimg from './images/aic-inside.jpg';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import {fetchMuseumArtworks} from '../../redux/museumArtworkActions';

function MuseumGallery({artworks, loading, error}) {
  // const {artworks, loading, error} = this.props;
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
    this.props.dispatch(fetchMuseumArtworks())
        .then(() => {
          const artworksArr = [];
          for (const artwork of artworks) {
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

const mapStateToProps = (state) => ({
  artworks: state.museumArtworks.artworks,
  loading: state.museumArtworks.loading,
  error: state.museumArtworks.error,
});

export default connect(mapStateToProps)(MuseumGallery);
