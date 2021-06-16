// https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers

// The initial state is basically a null user (ID)
const initialState = {
  user: null,
};

/*
This is essentially a function which takes the current state
and an action as an argument and returns a new state result. 
i.e. (state, action) => newState
*/
const userReducer = (state = initialState, action) => {
  // Conditional for the current action type
  if (action.type.localeCompare("SET_CURRENT_USER") === 0) {
    // Return a new state object
    return {
      // Which has the existing data but also..
      ...state,
      // The new user object (just an ID at this point)
      user: action.payload,
    };
  } else {
    // Otherwise we return the state unchanged
    // (usually when the reducer doesnt pick up the certain action)
    return state;
  }
};

export default userReducer;
