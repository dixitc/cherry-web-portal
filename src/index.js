import 'babel-polyfill';

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose } from 'redux';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Router , IndexRedirect, Route, browserHistory , hashHistory , IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer , routerMiddleware } from 'react-router-redux';
import App from './App';
import { memoriesReducer } from './reducers/memoriesReducer';
import { momentsReducer } from './reducers/momentsReducer';
import { titleReducer } from './reducers/titleReducer';
import { authReducer } from './reducers/auth';
import SmartMessage from './components/components';
import AuthenticatedComponentView from './components/AuthenticatedComponent';
import MomentsView from './components/MomentsView';
import MemoriesView from './components/MemoriesView';
import Login from './components/Login';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/index'
import createLogger from 'redux-logger';
import { doSomething , fetchMemories } from './actions/actions';

injectTapEventPlugin();
let initState = {
	memory : {
		id:1,
		title:'init'
	},
	isFetching : true
}

const middleware = routerMiddleware(hashHistory)

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
	memories : memoriesReducer,
	auth : authReducer,
	moments : momentsReducer,
	title : titleReducer,
	routing : routerReducer
})

let store = createStore(rootReducer,
	{},
	compose(
		applyMiddleware(thunkMiddleware , loggerMiddleware, createSagaMiddleware(rootSaga) , middleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f

  )
);

const rootEl = document.getElementById('root');

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

const requireAuth = (nextState , replace) => {
	console.log('STATE');
	console.log(nextState.location.pathname);
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
	console.log(nextState);
	if(!store.getState().auth.isAuthenticated){

	}else{
		replace({
		  pathname: '/memories',
		  state: { nextPathname: nextState.location.pathname }
		})
	}
}

const handleMomentsRoute = (nextState , replace) => {


	if(store.getState().memories.memories.length > 0){

	}else{

		if(store.getState().auth.isAuthenticated){
			let memoryId =  nextState.location.pathname.replace('/memory/', '');
			//store.dispatch(fetchMemories(store.getState().auth.authToken))

		}else{
			replace({
				pathname : '/login',
				state: { nextPathname: nextState.location.pathname }
			})
		}
	}
}

//const rootPath = window.location.pathname;
const rootPath = '';
console.log('rootPathrootPathrootPathrootPathrootPath');
console.log(rootPath);

render( < Provider store = {store}>
	{ /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
        <Route path={rootPath+'/'} component={App}>
			<IndexRedirect to={rootPath+'/login'} />
          <Route path={rootPath+'/login'} component={Login}/>
          <Route path={rootPath+'/memories'} component={AuthenticatedComponentView} onEnter={requireAuth}>
			  <IndexRoute component={MemoriesView}/>
			  <Route path={rootPath+'/memory/:memoryId'} component={MomentsView} onEnter={handleMomentsRoute}/>
		  </Route>

    	</Route>
      </Router>
	</Provider>, rootEl);
