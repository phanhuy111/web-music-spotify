const initialState = {
  playlist: {},
  playlistTrack:{},
  isLoading: false,
  error: null,
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAYLIST_SUCCESS':
      return { ...state, loading: false, playlist: action.payload };
    case 'GET_PLAYLIST_FAILURE':
      return { ...state, loading: true, error: action.payload };
    case 'GET_PLAYLIST_TRACK_SUCCESS':
        return { ...state, loading: false, playlistTrack: action.payload };
    case 'GET_PLAYLIST_TRACK_FAILURE':
        return { ...state, loading: true, error: action.payload };
    case 'CREATE_PLAYLIST_SUCCESS':
          return { ...state, loading: false, message: action.payload };
    case 'CREATE_PLAYLIST_FAILURE':
          return { ...state, loading: true, error: action.payload };
    default:
      return state;
  }
};