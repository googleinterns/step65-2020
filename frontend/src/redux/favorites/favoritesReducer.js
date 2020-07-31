import {
  FETCH_FAVORITES_BEGIN,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAILURE,
} from './favoritesActions';

const initialState = {
  artworks: [],
  loading: false,
  error: null,
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
        error: action.payload.error,
        artworks: [],
      };

    default:
      return state;
  }
}
