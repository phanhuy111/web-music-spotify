import { put, takeEvery, fork } from "redux-saga/effects";
import apiSpotify from "~/services/apiSpotify";

export const getArtist = (token) => {
  return {
    type: "GET_ARTIST",
    token,
  };
};

export const getArtistTrack = (token, id) => {
  return {
    type: "GET_ARTIST_TRACK",
    token,
    id,
  };
};

export const getArtistsSuccess = (payload) => {
  return {
    type: "GET_ARTISTS_SUCCESS",
    payload,
  };
};

export const getArtistTrackSuccess = (payload) => {
  return {
    type: "GET_ARTIST_TRACK_SUCCESS",
    payload,
  };
};

export const getArtistsFailure = (payload) => {
  return {
    type: "GET_ARTISTS_FAILURE",
    payload,
  };
};

export const getArtistTrackFailure = (payload) => {
  return {
    type: "GET_ARTIST_TRACK_FAILURE",
    payload,
  };
};

export function* getArtists(action) {
  try {
    const response = yield apiSpotify.getArtists(action.token);
    yield put(getArtistsSuccess(response.data));
  } catch (err) {
    yield put(getArtistsFailure({ error: err.message }));
  }
}

export function* getArtistTracks(action) {
  try {
    const response = yield apiSpotify.getArtistTrack(action.token, action.id);
    yield put(getArtistTrackSuccess(response.data));
  } catch (err) {
    yield put(getArtistTrackFailure({ error: err.message }));
  }
}

function* Saga() {
  yield takeEvery("GET_ARTIST", getArtists);
  yield takeEvery("GET_ARTIST_TRACK", getArtistTracks);
}

export const artistsSaga = [fork(Saga)];
