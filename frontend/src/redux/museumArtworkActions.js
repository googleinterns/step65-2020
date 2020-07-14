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
  const artist = artwork.artist_title;
  const description = artwork.description;
  const artworkInfo = new Map();
  artworkInfo.set('alt', alt);
  artworkInfo.set('url', linkToImage.url);
  artworkInfo.set('title', title);
  artworkInfo.set('artist', artist);
  artworkInfo.set('description', description);
  return artworkInfo;
};

function getMuseumArtworks(param) {
  const API = 'https://aggregator-data.artic.edu/api/v1/'+param;
  return fetch(API, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
      .then(handleErrors)
      .then((res) => res.json());
}

function filterArtworks(artworks) {
  const artworksMap = new Map();
  for (const artwork of artworks) {
    if (artwork.thumbnail != null) {
      artworksMap.set(artwork.id.toString(), getArtworkInfo(artwork));
    }
  }
  return artworksMap;
}

export function fetchMuseumArtworks(page, limit) {
  return (dispatch) => {
    dispatch(fetchMuseumArtworksBegin());
    return getMuseumArtworks('artworks?page='+ page +'&limit=' + limit)
        .then((artworks) => artworks.data)
        .then((artworks) => {
          return filterArtworks(artworks);
        })
        .then((artworks) => {
          dispatch(fetchMuseumArtworksSuccess(artworks));
          return artworks;
        })
        .catch((error) =>
          dispatch(fetchMuseumArtworksFailure(error)),
        );
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_MUSEUM_ARTWORKS_BEGIN =
  'FETCH_MUSEUM_ARTWORKS_BEGIN';
export const FETCH_MUSEUM_ARTWORKS_SUCCESS =
  'FETCH_MUSEUM_ARTWORKS_SUCCESS';
export const FETCH_MUSEUM_ARTWORKS_FAILURE =
  'FETCH_MUSEUM_ARTWORKS_FAILURE';

export const fetchMuseumArtworksBegin = () => ({
  type: FETCH_MUSEUM_ARTWORKS_BEGIN,
});

export const fetchMuseumArtworksSuccess = (artworks) => ({
  type: FETCH_MUSEUM_ARTWORKS_SUCCESS,
  payload: {artworks},
});

export const fetchMuseumArtworksFailure = (error) => ({
  type: FETCH_MUSEUM_ARTWORKS_FAILURE,
  payload: {error},
});
