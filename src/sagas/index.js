import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import * as actions from '../actions/actions';
import apiUrl from '../config/config';
import { browserHistory } from 'react-router';


/************************subroutines*******************/
function fetchMemoriesApi (token) {
	const url = apiUrl+'/v2/memory/allmemories.json';

	const myHeaders = new Headers({
  'authToken' : token
});
	let config = {
      method: 'GET',
      headers :  myHeaders
	}
	return fetch(url , config)
	.then((response) => response.json())
	.then((json) => {
		return json;
	})
}

function* fetchMemories(action){
	const memories = yield call(fetchMemoriesApi , action.token);
	console.log('GOT JSON MEMORIES');
	console.log(memories);
	yield put(actions.receiveMemories(memories));
}

function* setAuthToken(action){

	localStorage.setItem('cherryToken',JSON.stringify(action.data));
}

//a function that handles cleanup after LOGOUT_USER is called
function* cleanUpLogOut(action){

	localStorage.removeItem('cherryToken');
	yield put(actions.purgeMemories());
	browserHistory.replace('/login');
	//yield put(actions.purgeUser());
}
/*******************wathcers*****************/

function* watchFetchMemories() {
  yield* takeEvery("FETCH_MEMORIES", fetchMemories);
}

function* watchVerifySuccess() {
  yield* takeEvery('VERIFY_SUCCESS', setAuthToken);
}

//watcher function for logout
function* watchLogOut(){
	yield* takeEvery('LOGOUT_USER', cleanUpLogOut);
}





export default function* root() {


  yield fork(watchFetchMemories),
  yield fork(watchVerifySuccess),
  yield fork(watchLogOut)

}
