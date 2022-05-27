const initialState = {
  isLoading: false,
  isRefresh: true,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_REFRESH':
      return {
        ...state,
        isRefresh: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

export default globalReducer;
