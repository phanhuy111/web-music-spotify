const initialState = {
    artists: {},
    artistTrack:{},
    isLoading: false,
    error: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ARTISTS_SUCCESS':
        return { ...state, loading: false, artists: action.payload };
      case 'GET_ARTISTS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'GET_ARTIST_TRACK_SUCCESS':
        return { ...state, loading: false, artistTrack: action.payload };
      case 'GET_ARTIST_TRACK_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };