import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../redux/rootReducer';
import createSagaMiddleware from "redux-saga";

import rootSaga from '../actions/search-bar-actions';
// @REMOTE REDUCERS
import { createLogger } from 'redux-logger'

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export default function configStore(initialState) {
    
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(logger, sagaMiddleware),
        compose(window.devToolsExtension ? window.devToolsExtension() : f => f),
      );
  
    sagaMiddleware.run(rootSaga);

    return  store;
  }

