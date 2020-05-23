import { fork } from "redux-saga/effects";

export const updateVolume = (volume) => {
  return {
    type: "UPDATE_VOLUME",
    volume,
  };
};

export const getSongChoosen = (index) => {
  return {
    type: "GET_SONG_CHOOSEN",
    index,
  };
};

export const resetTime = () => {
  return {
    type: "RESET_TIME",
  };
};

export const changeSource = (src) => {
  return {
    type: "GET_SOURCE",
    src,
  };
};

export const playSong = (song) => {
  return {
    type: "PLAY_SONG",
    song,
  };
};

export const increaseSongTime = (time) => {
  return {
    type: "INCREASE_SONG_TIME",
    time,
  };
};

export const stopSong = () => {
  return {
    type: "STOP_SONG",
  };
};

export const pauseSong = () => {
  return {
    type: "PAUSE_SONG",
  };
};

export const resumeSong = () => {
  return {
    type: "RESUME_SONG",
  };
};

function* Saga() {}

export const playerSaga = [fork(Saga)];
