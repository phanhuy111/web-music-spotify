const initialState = {
    gener: {},
    feature:{},
    release:{},
    isLoading: false,
    error: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_GENER_SUCCESS':
        return { ...state, loading: false, gener: action.payload };
      case 'GET_GENER_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'GET_FEATURE_SUCCESS':
        return { ...state, loading: false, feature: action.payload };
      case 'GET_FEATURE_FAILURE':
        return { ...state, loading: false, error: action.payload };
      case 'GET_RELEASE_SUCCESS':
        return { ...state, loading: false, release: action.payload };
      case 'GET_RELEASE_FAILURE':
        return { ...state, loading: false, error: action.payload };  
      default:
        return state;
    }
  };