import { put, takeEvery,fork } from 'redux-saga/effects';
import apiSpotify from '../../services/apiSpotify'

  export const getSong = (token) => {
    return {
      type: 'GET_SONG',
      token
    }
  };
  
  export const getSongsSuccess = payload => {
    return {
      type: 'GET_SONGS_SUCCESS',
      payload
    }
  };  
  
  export const getSongsFailure = payload => {
    return {
      type: 'GET_SONGS_FAILURE',
      payload
    }
  };  

export function* getSongs(action) {
  try {
    const response = yield apiSpotify.getSongs(action.token)
    yield put(getSongsSuccess(response.data));
  } catch (err) {
    yield put(getSongsFailure({ error: err.message }));
  }
}

function* Saga() {
    yield takeEvery('GET_SONG', getSongs);
}

export const songsSaga = [
    fork(Saga)
]
