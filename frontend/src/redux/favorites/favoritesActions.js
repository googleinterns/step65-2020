function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function getFavoritesCount(uid) {
  return (dispatch) => {
    fetch(`/api/v1/get-favorites-count?uid=${uid}`)
        .then((response) => response.text())
        .then((countString) => parseInt(countString))
        .then((count) => dispatch(fetchFavoritesCount(count)));
  };
}

function getFavorites(uid, page) {
  return fetch(`/api/v1/get-favorites?uid=${uid}&page=${page}`)
      .then(handleErrors);
}

export function dispatchFavorites(dispatch, uid, page) {
  dispatch(fetchFavoritesBegin());
  return getFavorites(uid, page)
      .then((response) => response.json())
      .then((artworks) => {
        dispatch(fetchFavoritesSuccess(artworks));
        return artworks;
      })
      .catch((error) =>
        dispatch(fetchFavoritesFailure(error)),
      );
}

export function fetchFavorites(uid, page = 1) {
  return (dispatch) => {
    dispatchFavorites(dispatch, uid, page);
  };
}

export function updateFavorites(uid, collection, artworkId, name, alt, url) {
  return (dispatch) => {
    const params = new URLSearchParams();
    params.append('uid', uid);
    params.append('collection', collection);
    params.append('artwork-id', artworkId);
    params.append('name', name);
    params.append('alt', alt);
    params.append('url', url);
    fetch('/api/v1/add-to-favorites', {method: 'POST', body: params})
        .then(() => dispatch(addFavorite()))
        .then(() => dispatchFavorites(dispatch, uid));
  };
}

function getFindFavorite(uid, artworkId, collection) {
  return fetch(`/api/v1/find-favorite?` +
      `uid=${uid}&artwork-id=${artworkId}&collection=${collection}`)
      .then((response) => response.json());
}

export function findFavorite(uid, artworkId, collection) {
  return (dispatch) => {
    return getFindFavorite(uid, artworkId, collection)
        .then((currentFavorite) =>
          dispatch(setCurrentFavorite(currentFavorite)));
  };
}


export const FETCH_FAVORITES_BEGIN =
    'FETCH_FAVORITES_BEGIN';
export const FETCH_FAVORITES_SUCCESS =
    'FETCH_FAVORITES_SUCCESS';
export const FETCH_FAVORITES_FAILURE =
    'FETCH_FAVORITES_FAILURE';
export const ADD_FAVORITE =
    'ADD_FAVORITE';
export const FETCH_FAVORITES_COUNT =
    'FETCH_FAVORITES_COUNT';
export const SET_CURRENT_FAVORITE =
    'SET_CURRENT_FAVORITE';

export const fetchFavoritesBegin = () => ({
  type: FETCH_FAVORITES_BEGIN,
});

export const fetchFavoritesSuccess = (artworks) => ({
  type: FETCH_FAVORITES_SUCCESS,
  payload: {artworks},
});

export const fetchFavoritesFailure = (error) => ({
  type: FETCH_FAVORITES_FAILURE,
  payload: {error},
});

export const addFavorite = () => ({
  type: ADD_FAVORITE,
});

export const fetchFavoritesCount = (count) => ({
  type: FETCH_FAVORITES_COUNT,
  payload: {count},
});

export const setCurrentFavorite = (currentFavorite) => ({
  type: SET_CURRENT_FAVORITE,
  payload: {currentFavorite},
});
