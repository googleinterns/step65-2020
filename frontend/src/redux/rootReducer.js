import {combineReducers} from 'redux';
import museumArtworks from './museumArtworkReducer';
import userArtworks from './userArtworkReducer';
import favorites from './favorites/favoritesReducer';
import {firebaseReducer} from 'react-redux-firebase';

export default combineReducers({
  museumArtworks,
  userArtworks,
  favorites,
  firebase: firebaseReducer,
});
