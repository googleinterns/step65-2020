function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function getFavorites(uid) {
  return fetch(`/api/v1/get-favorites?uid=${uid}`)
      .then(handleErrors);
}

export function dispatchFavorites(dispatch, uid) {
  dispatch(fetchFavoritesBegin());
  return getFavorites(uid)
      .then((response) => response.json())
      .then((artworkIds) => {
        dispatch(fetchFavoritesSuccess(artworkIds));
        return artworkIds;
      })
      .catch((error) =>
        dispatch(fetchFavoritesFailure(error)),
      );
}

export function fetchFavorites(uid) {
  return (dispatch) => {
    dispatchFavorites(dispatch, uid);
  };
}

export function updateFavorites(uid, collection, artworkId) {
  return (dispatch) => {
    const params = new URLSearchParams();
    params.append('uid', uid);
    params.append('collection', collection);
    params.append('artwork-id', artworkId);
    fetch('/api/v1/add-to-favorites', {method: 'POST', body: params})
        .then(() => dispatch(addFavorite()))
        .then(() => dispatchFavorites(dispatch, uid));
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

export const fetchFavoritesBegin = () => ({
  type: FETCH_FAVORITES_BEGIN,
});

export const fetchFavoritesSuccess = (artworkIds) => ({
  type: FETCH_FAVORITES_SUCCESS,
  payload: {artworkIds},
});

export const fetchFavoritesFailure = (error) => ({
  type: FETCH_FAVORITES_FAILURE,
  payload: {error},
});

export const addFavorite = () => ({
  type: ADD_FAVORITE,
});
