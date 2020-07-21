import {
  FETCH_MUSEUM_ARTWORKS_BEGIN,
  FETCH_MUSEUM_ARTWORKS_SUCCESS,
  FETCH_MUSEUM_ARTWORKS_FAILURE,
} from './museumArtworkActions';

const initialState = {
  artworks: new Map(),
  loading: false,
  error: null,
};

export default function museumArtworkReducer(
    state = initialState,
    action,
) {
  switch (action.type) {
    case FETCH_MUSEUM_ARTWORKS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_MUSEUM_ARTWORKS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        artworks: action.payload.artworks,
      };

    case FETCH_MUSEUM_ARTWORKS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // eslint-disable-next-line max-len
      // Since it failed, we don't have items to display anymore, so set it empty.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        artworks: new Map(),
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
