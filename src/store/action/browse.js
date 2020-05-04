import { put, takeEvery, fork } from "redux-saga/effects";
import apiSpotify from "../../services/apiSpotify";

export const getGener = (token) => {
  return {
    type: "GET_GENER",
    token,
  };
};

export const getFeature = (token) => {
  return {
    type: "GET_FEATURE",
    token,
  };
};

export const getRelease = (token) => {
  return {
    type: "GET_RELEASE",
    token,
  };
};

export const getGenerSuccess = (payload) => {
  return {
    type: "GET_GENER_SUCCESS",
    payload,
  };
};

export const getGenerFailure = (payload) => {
  return {
    type: "GET_GENER_FAILURE",
    payload,
  };
};

// feature

export const getFeatureSuccess = (payload) => {
  return {
    type: "GET_FEATURE_SUCCESS",
    payload,
  };
};

export const getFeatureFailure = (payload) => {
  return {
    type: "GET_FEATURE_FAILURE",
    payload,
  };
};

// release

export const getReleaseSuccess = (payload) => {
  return {
    type: "GET_RELEASE_SUCCESS",
    payload,
  };
};

export const getReleaseFailure = (payload) => {
  return {
    type: "GET_RELEASE_FAILURE",
    payload,
  };
};

export function* getGeners(action) {
  try {
    const response = yield apiSpotify.browseCategories(action.token);
    // const response1 = yield apiSpotify.(action.token)
    yield put(getGenerSuccess(response.data));
  } catch (err) {
    yield put(getGenerFailure({ error: err.message }));
  }
}

export function* getFeatures(action) {
  try {
    const response = yield apiSpotify.browseFeature(action.token);
    yield put(getFeatureSuccess(response.data));
  } catch (err) {
    yield put(getFeatureFailure({ error: err.message }));
  }
}

export function* getReleases(action) {
  try {
    const response = yield apiSpotify.browseNewReleases(action.token);
    yield put(getReleaseSuccess(response.data));
  } catch (err) {
    yield put(getReleaseFailure({ error: err.message }));
  }
}

function* Saga() {
  yield takeEvery("GET_GENER", getGeners);
  yield takeEvery("GET_FEATURE", getFeatures);
  yield takeEvery("GET_RELEASE", getReleases);
}

export const browseSaga = [fork(Saga)];
