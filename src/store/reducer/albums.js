const initialState = {
    albums: {},
    albumTrack:{},
    isLoading: false,
    error: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ALBUMS_SUCCESS':
        return { ...state, loading: false, albums: action.payload };
      case 'GET_ALBUMS_FAILURE':
        return { ...state, loading: true, error: action.payload };
      case 'GET_ALBUM_TRACK_SUCCESS':
        return { ...state, loading: false, albumTrack: action.payload };
      case 'GET_ALBUM_TRACK_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };