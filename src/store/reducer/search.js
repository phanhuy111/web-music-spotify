const initialState = {
  songResult: {},
  searchError: {},
  isSearch: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_SUCCESS":
      // console.log(action.payload);
      return {
        ...state,
        songResult: action.payload,
        isSearch: true,
      };
    case "SEARCH_FAILURE":
      return {
        ...state,
        searchSongsError: action.payload,
      };
    default:
      return state;
  }
};
