const initialState = {
    songs: {},
    isLoading: false,
    error: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_SONGS_SUCCESS':
        return { ...state, loading: false, songs: action.payload };
      case 'GET_SONGS_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };