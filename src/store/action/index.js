import { all } from "redux-saga/effects";
import { playlistsSaga } from "./playlists";
import { loginSaga } from './auth'
import { browseSaga } from './browse'
import { albumsSaga } from './albums'
import { artistsSaga } from './artists'
import { songsSaga } from './songs'
import { playerSaga } from './player'
import { searchSaga } from './search'


export default function* rootSaga() {
  yield all([
      ...playlistsSaga,
      ...albumsSaga,
      ...artistsSaga,
      ...songsSaga,
      ...loginSaga,
      ...browseSaga,
      ...playerSaga,
      ...searchSaga,
  ]);
}