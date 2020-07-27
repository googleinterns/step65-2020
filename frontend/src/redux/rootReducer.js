import {combineReducers} from 'redux';
import museumArtworks from './museumArtworkReducer';
import userArtworks from './userArtworkReducer';
import myArtworks from './myArtworksReducer';
import {firebaseReducer} from 'react-redux-firebase';

export default combineReducers({
  museumArtworks,
  userArtworks,
  myArtworks,
  firebase: firebaseReducer,
});
