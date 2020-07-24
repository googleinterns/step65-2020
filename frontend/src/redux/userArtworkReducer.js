import {
  FETCH_USER_ARTWORKS_BEGIN,
  FETCH_USER_ARTWORKS_SUCCESS,
  FETCH_USER_ARTWORKS_FAILURE,
} from './userArtworkActions';

const initialState = {
  artworks: new Map(),
  loading: false,
  error: false,
};

export default function userArtworkReducer(
    state = initialState,
    action,
) {
  switch (action.type) {
    case FETCH_USER_ARTWORKS_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_USER_ARTWORKS_SUCCESS:
      return {
        ...state,
        loading: false,
        artworks: action.payload.artworks,
      };

    case FETCH_USER_ARTWORKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        artworks: new Map(),
      };

    default:
      return state;
  }
}
