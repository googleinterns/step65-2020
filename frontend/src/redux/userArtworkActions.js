function convertToArtworkInfo(artwork) {
  const artworkInfo = new Map();
  artworkInfo.set('id', artwork.id);
  artworkInfo.set('alt', artwork.altText);
  artworkInfo.set('url', '/api/v1/get-blob?blob-key='.concat(artwork.blobKey));
  artworkInfo.set('title', artwork.artTitle);
  artworkInfo.set('artist', artwork.artistName);
  artworkInfo.set('description', artwork.description);
  return artworkInfo;
}

function artworksJsonToMap(artworks) {
  const artworksMap = new Map();
  for (const artwork of artworks) {
    artworksMap.set(artwork.id.toString(), convertToArtworkInfo(artwork));
  }
  return artworksMap;
}

export function fetchUserArtworks() {
  return (dispatch) => {
    dispatch(fetchUserArtworksBegin());
    fetch('api/v1/serveUploads')
        .then((response) => response.json())
        .then((artworks) => artworksJsonToMap(artworks))
        .then((artworksMap) => {
          dispatch(fetchUserArtworksSuccess(artworksMap));
          return artworksMap;
        })
        .catch((error) =>
          dispatch(fetchUserArtworksFailure(error)),
        );
  };
}

export function fetchSingleUserArtwork(id) {
  return (dispatch) => {
    dispatch(fetchSingleUserArtworkBegin());
    fetch(`/api/v1/get-image?id=${id}`)
        .then((response) => response.json())
        .then((artwork) => {
          return convertToArtworkInfo(artwork);
        })
        .then((artwork) => {
          dispatch(fetchSingleUserArtworkSuccess(artwork));
          return artwork;
        })
        .catch((error) =>
          dispatch(fetchSingleUserArtworkFailure(error)),
        );
  };
}

export const FETCH_USER_ARTWORKS_BEGIN =
    'FETCH_USER_ARTWORKS_BEGIN';
export const FETCH_USER_ARTWORKS_SUCCESS =
    'FETCH_USER_ARTWORKS_SUCCESS';
export const FETCH_USER_ARTWORKS_FAILURE =
    'FETCH_USER_ARTWORKS_FAILURE';
export const FETCH_SINGLE_USER_ARTWORK_BEGIN =
    'FETCH_SINGLE_USER_ARTWORK_BEGIN';
export const FETCH_SINGLE_USER_ARTWORK_SUCCESS =
    'FETCH_SINGLE_USER_ARTWORK_SUCCESS';
export const FETCH_SINGLE_USER_ARTWORK_FAILURE =
    'FETCH_SINGLE_USER_ARTWORK_FAILURE';
export const SET_CURRENT_USER_ARTWORK =
    'SET_CURRENT_USER_ARTWORK';

export const fetchUserArtworksBegin = () => ({
  type: FETCH_USER_ARTWORKS_BEGIN,
});

export const fetchUserArtworksSuccess = (artworks) => ({
  type: FETCH_USER_ARTWORKS_SUCCESS,
  payload: {artworks},
});

export const fetchUserArtworksFailure = (error) => ({
  type: FETCH_USER_ARTWORKS_FAILURE,
  payload: {error},
});

export const fetchSingleUserArtworkBegin = () => ({
  type: FETCH_SINGLE_USER_ARTWORK_BEGIN,
});

export const fetchSingleUserArtworkSuccess = (artwork) => ({
  type: FETCH_SINGLE_USER_ARTWORK_SUCCESS,
  payload: {artwork},
});

export const fetchSingleUserArtworkFailure = (error) => ({
  type: FETCH_SINGLE_USER_ARTWORK_FAILURE,
  payload: {error},
});

export const setCurrentUserArtwork = (id) => ({
  type: SET_CURRENT_USER_ARTWORK,
  payload: {id},
});

