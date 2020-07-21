function convertToArtworkInfo(artwork) {
  const artworkInfo = new Map();
  artworkInfo.set('id', artwork.id);
  //artworkInfo.set('alt', artwork.alt);
  artworkInfo.set('url', artwork.url);
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
    fetch("api/v1/serveUploads")
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

export const FETCH_USER_ARTWORKS_BEGIN = 'FETCH_USER_ARTWORKS_BEGIN';
export const FETCH_USER_ARTWORKS_SUCCESS =
    'FETCH_USER_ARTWORKS_SUCCESS';
export const FETCH_USER_ARTWORKS_FAILURE =
    'FETCH_USER_ARTWORKS_FAILURE';

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
