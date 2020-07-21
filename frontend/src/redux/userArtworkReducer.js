import {
  FETCH_USER_ARTWORKS_BEGIN,
  FETCH_USER_ARTWORKS_SUCCESS,
  FETCH_USER_ARTWORKS_FAILURE,
  FETCH_SINGLE_USER_ARTWORK_BEGIN,
  FETCH_SINGLE_USER_ARTWORK_FAILURE,
  FETCH_SINGLE_USER_ARTWORK_SUCCESS, SET_CURRENT_USER_ARTWORK,
} from './userArtworkActions';


const initialState = {
  artworks: new Map(),
  loading: false,
  error: null,
  currentArtwork: null,
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
        error: null,
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
        error: action.payload.error,
        artworks: new Map(),
      };
    case FETCH_SINGLE_USER_ARTWORK_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SINGLE_USER_ARTWORK_SUCCESS:
      return {
        ...state,
        loading: false,
        currentArtwork: action.payload.artwork,
      };

    case FETCH_SINGLE_USER_ARTWORK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        artwork: new Map(),
      };

    case SET_CURRENT_USER_ARTWORK:
      return {
        ...state,
        currentArtwork: state.artworks.get(action.payload.id),
      };

    default:
      return state;
  }
}
