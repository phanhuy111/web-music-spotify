  const initialState = {
    volume: 50,
    isLoading: false,
    error: null,
    songPlaying: false, // play song
    timeElapsed: 0,  // time song
    songId: 0,  // song id
    songPaused: true, // pause song
    songChoosen: null,
    source: null,
  };

  // song.items.track.preview_url
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_VOLUME':
            return { ...state, volume: action.volume };
        case 'PLAY_SONG':
            return { 
                ...state, 
                songPlaying: true, 
                songDetails: action.song,
                songId: action.song.id,
                timeElapsed: 0,
                songPaused: false 
            };
        case 'PAUSE_SONG':
            return { ...state, songPaused: true };
        case 'STOP_SONG':
            return { 
                ...state, 
                songPlaying: false,
                songDetails: null,
                timeElapsed: 0,
                songPaused: true
            };
        case 'RESUME_SONG':
            return { ...state, songPaused: false };
        case 'GET_SONG_CHOOSEN':
            return { ...state, songChoosen: action.id , indexSong: action.index };
        case 'INCREASE_SONG_TIME':
            return { ...state, timeElapsed: action.time};
        case 'GET_SOURCE':
            return { ...state, source: action.src};                      
        default:
            return state;
    }
  };


  
