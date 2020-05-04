const initialState = {
  volume: 50,
  isLoading: false,
  error: null,
  timeElapsed: 0, // time song
  songId: 0, // song id
  songPlaying: false, // play song
  songPaused: true, // pause song
  songResume: false,
  songChoosen: null,
  source: null,
};

// song.items.track.preview_url

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_VOLUME":
      return { ...state, volume: action.volume };
    case "PLAY_SONG":
      return {
        ...state,
        songPlaying: true,
        songPaused: false,
        songDetails: action.song,
        songResume: false,
        songId: action.song.id,
        timeElapsed: 0,
      };
    case "RESET_TIME":
      return {
        ...state,
        timeElapsed: 0,
      };
    case "PAUSE_SONG":
      return {
        ...state,
        songPaused: true,
        songResume: true,
      };
    case "STOP_SONG":
      return {
        ...state,
        songPlaying: false,
        songPaused: true,
        songDetails: null,
        timeElapsed: 0,
      };
    case "RESUME_SONG":
      return { ...state, songPaused: false, songResume: false };
    case "GET_SONG_CHOOSEN":
      return { ...state, indexSong: action.index };
    case "INCREASE_SONG_TIME":
      return { ...state, timeElapsed: action.time };
    case "GET_SOURCE":
      return { ...state, source: action.src };
    default:
      return state;
  }
};
