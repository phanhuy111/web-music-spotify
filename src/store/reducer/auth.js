  const initialState = {
    isLogin: false,
    isLoading: false,
    access_token: null,
    err: null,
    user: {},
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, access_token: action.token };
      case 'LOGIN_SUCCESS':
        return { ...state, user: action.payload, isLogin: true , id: action.payload.id};
      case 'LOGIN_FAILURE':
        return { ...state, isLogin: false, err: action.payload};       
      case 'LOGOUT':
        return { ...state, isLogin: false, access_token: null, user: {}};
      default: 
        return state;
    }
  }

  