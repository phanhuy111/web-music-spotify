import { put, takeEvery,fork } from 'redux-saga/effects';
import apiSpotify from '../../services/apiSpotify'

export const getAlbum = (token) => {
  return {
    type: 'GET_ALBUMS',
    token
  }
};

export const getAlbumTrack = (token, id) => {
  return {
    type: 'GET_ALBUM_TRACK',
    token,
    id
  }
};

export const getAlbumTrackSuccess = payload => {
  return {
    type: 'GET_ALBUM_TRACK_SUCCESS',
    payload
  }
};

export const getAlbumTrackFailure = payload => {
  return {
    type: 'GET_ALBUM_TRACK_FAILURE',
    payload
  }
};
  
  export const getAlbumsSuccess = payload => {
    return {
      type: 'GET_ALBUMS_SUCCESS',
      payload
    }
  };  
  
  export const getAlbumsFailure = payload => {
    return {
      type: 'GET_ALBUMS_FAILURE',
      payload
    }
  };  

export function* getAlbums(action) {
  try {
    const response = yield apiSpotify.getAlbums(action.token)
    yield put(getAlbumsSuccess(response.data));
  } catch (err) {
    yield put(getAlbumsFailure({ error: err.message }));
  }
}

export function* getAlbumTracks(action) {
  try {
    const response = yield apiSpotify.getAlbumTrack(action.token, action.id)
    yield put(getAlbumTrackSuccess(response.data));
  } catch (err) {
    yield put(getAlbumTrackFailure({ error: err.message }));
  }
}

function* Saga() {
    yield takeEvery('GET_ALBUMS', getAlbums);
    yield takeEvery('GET_ALBUM_TRACK', getAlbumTracks);
}

export const albumsSaga = [
    fork(Saga)
]
