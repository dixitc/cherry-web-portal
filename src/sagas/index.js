import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import * as actions from '../actions/actions';
import apiUrl from '../config/config';
import { browserHistory ,  hashHistory } from 'react-router';


/************************APIS*******************/
// NEED TO HANDLE ERROR STATES
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
	if(memories.length > 0){
		yield put(actions.purgeMemories());
	}
	console.log('GOT JSON MEMORIES');
	console.log(memories);
	yield put(actions.receiveMemories(memories));
}

//params : [ memoryId , authToken ]
function fetchMomentsApi (params) {
	const page =params.page ,
	rp =params.rp;
	//const url = apiUrl+'/v2/memory/'+params[0]+'/allmoments.json';
	const url = apiUrl+'/v2/memory/'+params.memoryId+'/allmoments.json?page='+page+'&rp='+rp;

	const myHeaders = new Headers({
	  'authToken' : params.token
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

function* likeMomentApi(params){
	const user = getUser();
	const token = user.authToken;
	console.log('TOKEN '+token );
	const url = apiUrl+'/v1/memory/'+params.memoryId+'/like/'+params.momentId+'.json';
	const myHeaders = new Headers({
	  'authToken' : token,
	  'Content-Type': 'application/x-www-form-urlencoded'
	});
	let config = {
		method : 'POST',
		headers : myHeaders,
		body: 'like='+params.like
	}
	return fetch(url,config)
	.then((response) => response.json())
	.then((json) => {
		console.log(json);
		return json
	})
}

/*******************HANDLERS*******************/

function* fetchMoments(action){
	if(action.data.page == 0){
			yield put(actions.purgeMoments(moments));
	}
	const moments = yield call(fetchMomentsApi , action.data);
	const user = getUser();
	//This checks if all moments have been loaded or not

	if (moments.moments.length < action.data.rp){
		yield put(actions.setIsLoaded({memoryId : action.data.memoryId , isLoaded : true}));
	}

	yield put(actions.refineMoments( {moments : moments , userId:user.profile.id}));
	 /*This should effectively pass moments and userId and add a hasLiked field to all moments*/
	//yield put(actions.refineMoments(moments,userId));
}

function getUser(){
	return JSON.parse(localStorage.getItem('cherryToken'))
}


function* setAuthToken(action){
	localStorage.setItem('cherryToken',JSON.stringify(action.data));
}

//a function that handles cleanup after LOGOUT_USER is called
function* cleanUpLogOut(action){

	localStorage.removeItem('cherryToken');
	yield put(actions.purgeMemories());
	yield put(actions.purgeMoments());
	 hashHistory.replace('/login');
	//yield put(actions.purgeUser());
}


//a function that handles cleanup after LOGOUT_USER is called
function* likeMoment(action){
	console.log(' indexSaga : likeMoment');
	console.log(action);
	const  payload  = action.data;
	console.log(payload);
	let likeReponse = yield call(likeMomentApi , action.data);
	// check if likeReponse idicates successfull completion
	if(likeReponse = {}){

		yield put(actions.likeMomentSuccess(payload));
	}
	//else snackbar error message

}
/*******************WATCHERS*****************/

function* watchFetchMemories() {
  yield* takeEvery('FETCH_MEMORIES', fetchMemories);
}

function* watchVerifySuccess() {
  yield* takeEvery('VERIFY_SUCCESS', setAuthToken);
}

//watcher function for logout
function* watchLogOut(){
	yield* takeEvery('LOGOUT_USER', cleanUpLogOut);
}


//watcher function for fetchMoments
function* watchFetchMoments(){
	yield* takeLatest('FETCH_MOMENTS', fetchMoments);
}


//watcher function for like some Moment
function* watchLikeMoment(){
	yield* takeEvery('LIKE_MOMENT', likeMoment);
}






export default function* root() {


  yield fork(watchFetchMemories),
  yield fork(watchVerifySuccess),
  yield fork(watchLogOut)
  yield fork(watchFetchMoments)
  yield fork(watchLikeMoment)

}
