import {
  FETCH_FAVORITES_BEGIN,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAILURE,
  FETCH_FAVORITES_COUNT,
  SET_CURRENT_FAVORITE,
} from './favoritesActions';

const initialState = {
  artworks: [],
  currentFavorite: null,
  loading: false,
  error: false,
  count: 0,
};

export default function favoritesReducer(
    state = initialState,
    action,
) {
  switch (action.type) {
    case FETCH_FAVORITES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_FAVORITES_SUCCESS:
      return {
        ...state,
        loading: false,
        artworks: action.payload.artworks,
      };

    case FETCH_FAVORITES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        artworks: [],
      };

    case FETCH_FAVORITES_COUNT:
      return {
        ...state,
        count: action.payload.count,
      };

    case SET_CURRENT_FAVORITE:
      return {
        ...state,
        currentFavorite: action.payload.currentFavorite,
      };

    default:
      return state;
  }
}
