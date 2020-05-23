import { put, takeEvery, fork } from "redux-saga/effects";
import apiSpotify from "~/services/apiSpotify";

export const isSearching = (value, token) => {
  return {
    type: "IS_SEARCHING",
    value,
    token,
  };
};

export const searchSuccess = (payload) => {
  // console.log(payload);
  return {
    type: "SEARCH_SUCCESS",
    payload,
  };
};

export const searchFailure = (payload) => {
  return {
    type: "SEARCH_FAILURE",
    payload,
  };
};

export function* searching(action) {
  try {
    const response = yield apiSpotify.searchFeature(action.value, action.token);
    yield put(searchSuccess(response.data));
  } catch (err) {
    yield put(searchFailure({ error: err.message }));
  }
}

function* Saga() {
  yield takeEvery("IS_SEARCHING", searching);
}

export const searchSaga = [fork(Saga)];
