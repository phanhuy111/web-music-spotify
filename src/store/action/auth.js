import {  put, takeEvery ,fork } from 'redux-saga/effects';
import apiSpotify from '../../services/apiSpotify'

  export const login = token => {
    return{
      type: 'LOGIN',
      token
    }
  }

  export const logout = () => {
    return{
      type: 'LOGOUT'
    }
  }
  
  export const loginSuccess = payload => {
    return {
      type: 'LOGIN_SUCCESS',
      payload
    }
  };
  
  export const loginFailure = payload => {
    return {
      type: 'LOGIN_FAILURE',
      payload
    }
  };

  // redux-saga
export function* loginSpotify(action) {
    try {
      const response = yield apiSpotify.checkAccessToken(action.token)
      yield put(loginSuccess(response.data));
    } catch (err) {
      yield put(loginFailure({ error: err.message }));
    }
}

function* Saga() {
  yield takeEvery('LOGIN', loginSpotify)
}

export const loginSaga = [
  fork(Saga)
]