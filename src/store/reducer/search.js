
const initialState = {
    songResult: {},
    searchError: {},
    isSearch: false
  };
  
export default (state = initialState, action) => {
    switch (action.type) {
        case "SEARCH_SONGS_SUCCESS":
            return {
              ...state,
              songResult: action.payload,
              isSearch: true
            };
        
        case "SEARCH_SONGS_ERROR":
            return {
              ...state,
              searchSongsError: action.payload,
            };
      default:
        return state;
    }
  };

