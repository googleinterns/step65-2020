import {
  FETCH_MUSEUM_ARTWORKS_BEGIN,
  FETCH_MUSEUM_ARTWORKS_SUCCESS,
  FETCH_MUSEUM_ARTWORKS_FAILURE,
  FETCH_RANDOM_ARTWORK_BEGIN,
  FETCH_RANDOM_ARTWORK_SUCCESS,
  FETCH_RANDOM_ARTWORK_FAILURE,
  FETCH_SINGLE_MUSEUM_ARTWORK_BEGIN,
  FETCH_SINGLE_MUSEUM_ARTWORK_SUCCESS,
  FETCH_SINGLE_MUSEUM_ARTWORK_FAILURE,
  SET_CURRENT_MUSEUM_ARTWORK,
} from './museumArtworkActions';

const initialState = {
  artworks: new Map(),
  numOfResults: 0,
  numOfPgs: 0,
  randomArtworkId: null,
  loading: false,
  error: false,
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
        error: false,
      };

    case FETCH_MUSEUM_ARTWORKS_SUCCESS:
      return {
        ...state,
        loading: false,
        artworks: action.payload.artworks,
        numOfPgs: action.payload.numOfPgs,
        numOfResults: action.payload.numOfResults,
      };

    case FETCH_MUSEUM_ARTWORKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        artworks: new Map(),
        numOfPgs: 0,
        numOfResults: 0,
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

    case FETCH_RANDOM_ARTWORK_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_RANDOM_ARTWORK_SUCCESS:
      return {
        ...state,
        loading: false,
        randomArtworkId: action.payload.randomArtworkId,
      };

    case FETCH_RANDOM_ARTWORK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        randomArtworkId: null,
      };

    default:
      return state;
  }
}
