import 'babel-polyfill';

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose } from 'redux';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import App from './App';
import { memoriesReducer } from './reducers/reducers';
import { authReducer } from './reducers/auth';
import SmartMessage from './components/components';
import AuthenticatedComponentView from './components/AuthenticatedComponent';
import MomentsView from './components/MomentsView';
import Login from './components/Login';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/index'
import createLogger from 'redux-logger';

injectTapEventPlugin();
let initState = {
	memory : {
		id:1,
		title:'init'
	},
	isFetching : true
}


const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
	memories:memoriesReducer,
	auth:authReducer,
	routing: routerReducer
})

let store = createStore(rootReducer,
	{},
	compose(
	applyMiddleware(thunkMiddleware , loggerMiddleware, createSagaMiddleware(rootSaga)),
	window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const rootEl = document.getElementById('root');

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const requireAuth = (nextState , replace) => {
	console.log('STATE');
	console.log(store.getState().auth.isAuthenticated);
	if (!store.getState().auth.isAuthenticated) {
		console.log('requireAuth FAILED');
		replace({
	      pathname: '/login',
	      state: { nextPathname: nextState.location.pathname }
	    })
		//browserHistory.push('/login');

	}else{

		//check if user is present else dispatch action to fetch user , also verify that token hasn't expired
		console.log('requireAuth SUCCESS');
	}
}

const verifyAuth = (nextState,replace) => {
	if(!store.getState().auth.isAuthenticated){

	}else{
		replace({
		  pathname: '/memories',
		  state: { nextPathname: nextState.location.pathname }
		})
	}
}


render( < Provider store = {store}>
	{ /* Tell the Router to use our enhanced history */ }
      <Router history={browserHistory}>
        <Route path="/" component={App}  >

          <Route path='/login' component={Login} onEnter={verifyAuth}/>
          <Route path='/memories' component={AuthenticatedComponentView} onEnter={requireAuth} />
		  <Route path='/memory/:memoryId' component={MomentsView} />

    	</Route>
      </Router>
	</Provider>, rootEl);
