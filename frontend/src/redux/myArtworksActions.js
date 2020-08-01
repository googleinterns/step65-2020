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

export function fetchMyArtworks(uid) {
  return (dispatch) => {
    dispatch(fetchMyArtworksBegin());
    fetch(`api/v1/get-my-artworks?uid=${uid}`)
        .then((response) => response.json())
        .then((artworks) => artworksJsonToMap(artworks))
        .then((artworksMap) => {
          dispatch(fetchMyArtworksSuccess(artworksMap));
          return artworksMap;
        })
        .catch((error) =>
          dispatch(fetchMyArtworksFailure(error)),
        );
  };
}

export const FETCH_MY_ARTWORKS_BEGIN = 'FETCH_MY_ARTWORKS_BEGIN';
export const FETCH_MY_ARTWORKS_SUCCESS =
    'FETCH_MY_ARTWORKS_SUCCESS';
export const FETCH_MY_ARTWORKS_FAILURE =
    'FETCH_MY_ARTWORKS_FAILURE';

export const fetchMyArtworksBegin = () => ({
  type: FETCH_MY_ARTWORKS_BEGIN,
});

export const fetchMyArtworksSuccess = (artworks) => ({
  type: FETCH_MY_ARTWORKS_SUCCESS,
  payload: {artworks},
});

export const fetchMyArtworksFailure = (error) => ({
  type: FETCH_MY_ARTWORKS_FAILURE,
  payload: {error},
});

