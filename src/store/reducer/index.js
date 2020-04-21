import { combineReducers } from 'redux';

import playlists from './playlists';
import browse from './browse';
import songs from './songs';
import artists from './artists'
import albums from './albums'
import player from './player';
import auth from './auth'
import search from './search'

export default combineReducers({
  playlists,
  player,
  auth,
  browse,
  artists,
  songs,
  albums,
  search
});
