import { put, takeEvery, fork } from "redux-saga/effects";
import apiSpotify from "~/services/apiSpotify";

export const getSong = (token) => {
  return {
    type: "GET_SONG",
    token,
  };
};

export const getSongsSuccess = (payload) => {
  return {
    type: "GET_SONGS_SUCCESS",
    payload,
  };
};

export const getSongsFailure = (payload) => {
  return {
    type: "GET_SONGS_FAILURE",
    payload,
  };
};

export const addTrack = (token, uri, id) => {
  return {
    type: "ADD_TRACK",
    token,
    uri,
    id,
  };
};

export const addTrackSuccess = (payload) => {
  return {
    type: "ADD_TRACK_SUCCESS",
    payload,
  };
};

export const addTrackFailure = (payload) => {
  return {
    type: "ADD_TRACK_FAILURE",
    payload,
  };
};

export function* getSongs(action) {
  try {
    const response = yield apiSpotify.getSongs(action.token);
    yield put(getSongsSuccess(response.data));
  } catch (err) {
    yield put(getSongsFailure({ error: err.message }));
  }
}

export function* addTrackPlaylist(action) {
  try {
    const response = yield apiSpotify.addTrack(
      action.token,
      action.uri,
      action.id
    );
    yield put(addTrackSuccess(response.data));
  } catch (err) {
    yield put(addTrackFailure({ error: err.message }));
  }
}

function* Saga() {
  yield takeEvery("GET_SONG", getSongs);
  yield takeEvery("ADD_TRACK", addTrackPlaylist);
}

export const songsSaga = [fork(Saga)];
