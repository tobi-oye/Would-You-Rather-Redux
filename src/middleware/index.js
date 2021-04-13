import thunk from "redux-thunk";
import logger from "./logger";
import { applyMiddleware, compose } from "redux";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default composeEnhancers(applyMiddleware(thunk, logger));
