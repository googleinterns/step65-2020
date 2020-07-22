import {combineReducers} from 'redux';
import museumArtworks from './museumArtworkReducer';
import userArtworks from './userArtworkReducer';

export default combineReducers({
  museumArtworks,
  userArtworks,
});
