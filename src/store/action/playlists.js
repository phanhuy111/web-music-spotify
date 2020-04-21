import { put, takeEvery,fork } from 'redux-saga/effects';
import apiSpotify from '../../services/apiSpotify'



export const createPlaylist = (token, playlist ,id) => {
  return {
    type: 'CREATE_PLAYLIST',
    token,
    playlist,
    id
  }
};

export const createPlaylistSuccess = payload => {
  return {
    type: 'CREATE_PLAYLIST_SUCCESS',
    payload
  }
};

export const createPlaylistFailure = payload => {
  return {
    type: 'CREATE_PLAYLIST_FAILURE',
    payload
  }
};

export const getPlaylist = (token, id) => {
  return {
    type: 'GET_PLAYLIST',
    token,
    id
  }
};

export const getPlaylistTrack = (token, idPlaylist) => {
  return {
    type: 'GET_PLAYLIST_TRACK',
    token,
    idPlaylist
  }
};

  export const getPlaylistTrackSuccess = payload => {
    return {
      type: 'GET_PLAYLIST_TRACK_SUCCESS',
      payload
    }
  };

  export const getPlaylistTrackFailure = payload => {
    return {
      type: 'GET_PLAYLIST_TRACK_FAILURE',
      payload
    }
  };

  export const getPlaylistsSuccess = payload => {
    return {
      type: 'GET_PLAYLIST_SUCCESS',
      payload
    }
  };  
  
  export const getPlaylistsFailure = payload => {
    return {
      type: 'GET_PLAYLIST_FAILURE',
      payload
    }
  };  

export function* getPlaylists(action) {
  try {
    const response = yield apiSpotify.getPlaylists(action.token, action.id)
    yield put(getPlaylistsSuccess(response.data));
  } catch (err) {
    yield put(getPlaylistsFailure({ error: err.message }));
  }
}

export function* getPlaylistTracks(action) {
  try {
    const response = yield apiSpotify.getPlaylistById(action.token, action.idPlaylist)
    yield put(getPlaylistTrackSuccess(response.data));
  } catch (err) {
    yield put(getPlaylistTrackFailure({ error: err.message }));
  }
}

export function* createPlaylists(action) {
  try {
    const response = yield apiSpotify.createPlaylist(action.token, action.playlist, action.id)
    yield put(createPlaylistSuccess({success: response}));
  } catch (err) {
    yield put(createPlaylistFailure({ error: err.message }));
  }
}

function* Saga() {
    yield takeEvery('GET_PLAYLIST', getPlaylists);
    yield takeEvery('GET_PLAYLIST_TRACK', getPlaylistTracks);
    yield takeEvery('CREATE_PLAYLIST', createPlaylists);
}

export const playlistsSaga = [
    fork(Saga)
]
