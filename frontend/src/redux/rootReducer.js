import {combineReducers} from 'redux';
import museumArtworks from './museumArtworkReducer';
import userArtworks from './userArtworkReducer';
import myArtworks from './myArtworksReducer';
import favorites from './favorites/favoritesReducer';
import {firebaseReducer} from 'react-redux-firebase';

export default combineReducers({
  museumArtworks,
  userArtworks,
  myArtworks,
  favorites,
  firebase: firebaseReducer,
});
