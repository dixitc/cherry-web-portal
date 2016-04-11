import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import * as actions from '../actions/actions';
import apiUrl from '../config/config';
/************************subroutines********************/
function fetchMemoriesApi (token) {
	const url = apiUrl+'/v2/memory/allmemories.json';
	console.log("TOKEN");
	console.log(token);
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
	console.log("GOT JSON MEMORIES");
	console.log(memories);
	yield put(actions.receiveMemories(memories));
}

function* setAuthToken(action){
	console.log('ACTION AUTHING TOKEN');
	console.log(action.authToken);

}


/*******************wathcers*****************/

function* mySaga() {
  yield* takeEvery("FETCH_MEMORIES", fetchMemories);
}





export default function* root() {


  yield fork(mySaga)
}
