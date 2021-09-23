import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from "redux-thunk";
import CreateRootReducer from './reducers/index';
// import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

export default function configureStore(history, initialState = {}) {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middlewares = [routerMiddleware(history), thunk];

    return createStore(
        CreateRootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );
  }