// reducers.js
const initialState = {
    responseData: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_RESPONSE_DATA':
        return {
          ...state,
          responseData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  