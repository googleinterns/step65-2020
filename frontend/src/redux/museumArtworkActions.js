function getMuseumArworks() {
  const API = 'https://aggregator-data.artic.edu/api/v1/artworks?limit=9';
  return fetch(API, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
      .then(handleErrors)
      .then((res) => res.json())
      .then((artworks) => artworks.data);
  //
  // const artworksArr = [];
  // fetch(API, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((artworks) => {
  //     for (const artwork of artworks.data) {
  //       if (artwork.thumbnail != null) {
  //         artworksArr.push(getArtworkInfo(artwork));
  //       }
  //     }
  //     setArtworksInfo(artworksArr);
  //   });
}

export function fetchMuseumArtworks() {
  return (dispatch) => {
    dispatch(fetchMuseumArtworksBegin());
    return getMuseumArworks()
        .then((json) => {
          dispatch(fetchMuseumArtworksSuccess(json.artworks));
          return json.artworks;
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
