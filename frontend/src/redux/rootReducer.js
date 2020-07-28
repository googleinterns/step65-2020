import {combineReducers} from 'redux';
import museumArtworks from './museumArtworkReducer';
import userArtworks from './userArtworkReducer';
import {firebaseReducer} from 'react-redux-firebase';

export default combineReducers({
  museumArtworks,
  userArtworks,
  firebase: firebaseReducer,
});
