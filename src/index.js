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
import { testReducer } from './reducers/reducers';
import { authReducer } from './reducers/auth';
import SmartMessage from './components/components';
import Login from './components/Login';
import { AuthenticatedComponent } from './components/AuthenticatedComponent';
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
	memory:testReducer,
	auth:authReducer,
	routing: routerReducer
})

let store = createStore(rootReducer,
	{},
	compose(
	applyMiddleware(thunkMiddleware , loggerMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const rootEl = document.getElementById('root');

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const requireAuth = (nextState , transition ,cb) => {
	console.log('STATE');
	console.log(store.getState().auth.isAuthenticated);
	if (!store.getState().auth.isAuthenticated) {
		console.log('requireAuth FAILED');

		browserHistory.push('/login');
		return;
	}else{

		console.log('requireAuth SUCCESS');
	}
}




render( < Provider store = {store}>
	{ /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
        <Route path="/" component={App}>
			<IndexRoute component={SmartMessage}/>
          <Route path="/login" component={Login}/>
          <Route path="/authenticated" component={SmartMessage} onEnter={requireAuth}/>
        </Route>
      </Router>
	</Provider>, rootEl);
