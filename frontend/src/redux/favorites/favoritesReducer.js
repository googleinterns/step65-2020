import {
  FETCH_FAVORITES_BEGIN,
  FETCH_FAVORITES_SUCCESS,
  FETCH_FAVORITES_FAILURE,
} from './favoritesActions';

const initialState = {
  artworkIds: [],
  artworks: [],
  loading: false,
  error: false,
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
        artworkIds: action.payload.artworkIds,
      };

    case FETCH_FAVORITES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        artworkIds: [],
      };

    default:
      return state;
  }
}
