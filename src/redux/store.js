import { createStore, applyMiddleware } from "redux";

/*
Useful for debugging redux --> logger 
Is a logger middleware that console.logs the actions fired and change of state
*/
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
