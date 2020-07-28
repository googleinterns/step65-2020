import {
  FETCH_MUSEUM_ARTWORKS_BEGIN,
  FETCH_MUSEUM_ARTWORKS_SUCCESS,
  FETCH_MUSEUM_ARTWORKS_FAILURE,
  FETCH_SINGLE_MUSEUM_ARTWORK_BEGIN,
  FETCH_SINGLE_MUSEUM_ARTWORK_SUCCESS,
  FETCH_SINGLE_MUSEUM_ARTWORK_FAILURE,
  SET_CURRENT_MUSEUM_ARTWORK,
} from './museumArtworkActions';

const initialState = {
  artworks: new Map(),
  numOfPgs: 0,
  loading: false,
  error: null,
  currentArtwork: null,
};

export default function museumArtworkReducer(
    state = initialState,
    action,
) {
  switch (action.type) {
    case FETCH_MUSEUM_ARTWORKS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_MUSEUM_ARTWORKS_SUCCESS:
      return {
        ...state,
        loading: false,
        artworks: action.payload.artworks,
        numOfPgs: action.payload.numOfPgs,
      };

    case FETCH_MUSEUM_ARTWORKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        artworks: new Map(),
        numOfPgs: 0,
      };
    case FETCH_SINGLE_MUSEUM_ARTWORK_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SINGLE_MUSEUM_ARTWORK_SUCCESS:
      return {
        ...state,
        loading: false,
        currentArtwork: action.payload.artwork,
      };

    case FETCH_SINGLE_MUSEUM_ARTWORK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        artwork: new Map(),
      };

    case SET_CURRENT_MUSEUM_ARTWORK:
      return {
        ...state,
        currentArtwork: state.artworks.get(action.payload.id),
      };

    default:
      return state;
  }
}
