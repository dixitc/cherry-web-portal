import { takeEvery, takeLatest } from 'redux-saga'
import { take, actionChannel , put, call, fork, select } from 'redux-saga/effects';
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


//params : [ shortCode ]
function fetchPublicMemoryApi (params) {

	const url = apiUrl+'/v2/weblink/'+params.shortCode+'/getMemory.json';

	let config = {
      method: 'GET'
	}

	return fetch(url , config)
	.then((response) => response.json())
	.then((json) => {
		return json;
	})
}


//params : [ shortCode ]
function fetchPublicMomentsApi (params) {


	const { page , rp } = params;
	const url = apiUrl+'/v2/weblink/'+params.memoryId+'/getMoments.json?page='+page+'&rp='+rp;

	let config = {
      method: 'GET'
	}

	return fetch(url , config)
	.then((response) => response.json())
	.then((json) => {
		return json;
	})
}



function likeMomentApi(params){
	const user = getUser();
	const token = user.authToken;

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

		return json
	})
}


function uploadImageApi(params){
	/*setTimeout(() => {
		console.log(i+'th image successfully uploaded');

		return {uploaded:true};
	},1000)*/
	const user = getUser();
	const token = user.authToken;
	console.log(params.file);
	console.log(params);
	const url = apiUrl+'/v1/memory/moments/'+params.momentId+'/image.json';
	const myHeaders = new Headers({
		'authToken': token

	});

	let data = new FormData()
	data.append('imageFile', params.file)
	data.append('version', 'COMPRESSED')

	let config = {
		method : 'POST',
		headers : myHeaders,
		body: data
	}
	return fetch(url,config)
	.then((response) => response.json())
	.then((json) => {
		console.log('COLLECTING JSON');
		console.log(json);
		return json
	})
}


function addMomentsApi(params){
	const user = getUser();
	const token = user.authToken;
	console.log(params.newMoments);
	console.log(params);
	const url = apiUrl+'/v1/memory/'+params.memoryId+'/moments.json';
	const myHeaders = new Headers({
	    'authToken': token,
	    'Content-Type': 'application/x-www-form-urlencoded'

	});
	let config = {
		method : 'POST',
		headers : myHeaders,
		body: 'newMoments='+JSON.stringify(params.newMoments)+'&returnMoments=true'
	}
	return fetch(url,config)
	.then((response) => response.json())
	.then((json) => {
		console.log('COLLECTING JSON');
		console.log(json);
		return json
	})
}


function publishMomentsApi(params){
	const user = getUser();
	const token = user.authToken;

	console.log(params);

	const url = apiUrl+'/v1/memory/'+params.memoryId+'/publishmoments.json';
	const myHeaders = new Headers({
	    'authToken': token,
	    'Content-Type': 'application/x-www-form-urlencoded'

	});
	let config = {
		method : 'POST',
		headers : myHeaders,
		body: 'momentIds=' + params.momentIds
	}
	return fetch(url,config)
	.then((response) => response.json())
	.then((json) => {
		console.log('COLLECTING JSON');
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


function* fetchPublicMemory(action){

			yield put(actions.purgeMemories());

	const publicMemory = yield call(fetchPublicMemoryApi , action.data);
	console.log('SAGAS FETCHPUBLICMEMORYAPI RESPONSE JSON');
	console.log(publicMemory);
	if(publicMemory.memory){
		yield put(actions.receiveCurrentMemory(publicMemory));
	}else if(publicMemory.err){
		yield put(actions.rejectCurrentMemory('rejected'));
	}
	//This checks if all moments have been loaded or not

//	yield put(actions.receiveMemories({memories:[publicMemory.memory]}));

	 /*This should effectively pass moments and userId and add a hasLiked field to all moments*/
	//yield put(actions.refineMoments(moments,userId));
}


function* fetchPublicMoments(action){
	if(action.data.page == 0){
			yield put(actions.purgeMoments(moments));
	}
	const moments = yield call(fetchPublicMomentsApi , action.data);
	//This checks if all moments have been loaded or not


	if (moments.moments.length < action.data.rp){
		yield put(actions.setIsLoadedPublicMemory('asdf'));
	}

	yield put(actions.refineMoments( {moments : moments , userId:'xxx'}));
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


	const  payload  = action.data;

	let likeReponse = yield call(likeMomentApi , action.data);
	console.log(likeReponse);
	// check if likeReponse idicates successfull completion
	if(likeReponse = {}){

		yield put(actions.likeMomentSuccess(payload));
	}
	//else snackbar error message

}



//a function that handles cleanup after LOGOUT_USER is called
function* addMoments(action){


	//const  payload  = action.data;
	//const files = action.data.files
	let addMomentsReponse = yield call(addMomentsApi , action.data);
	console.log(addMomentsReponse);
	yield addMomentsReponse.moments.map((moment,i) => call(uploadImage , {data:{momentId:moment.id,file:action.data.files[i]}}))
	let momentIds = '';
	addMomentsReponse.moments.map((moment,i) => {
		if(i == addMomentsReponse.moments.length - 1){
			momentIds = momentIds + (moment.id).toString()
		}else{
			momentIds = momentIds + (moment.id).toString() + ','
		}
	})
	console.log((momentIds).toString());
	console.log(' IMAGES UPLOADED');
	yield call(publishMomentsApi , {momentIds:momentIds,memoryId:action.data.memoryId})
	console.log(' MOMENTS PUBLISHED ');
}

//a function that handles cleanup after LOGOUT_USER is called
function* uploadImage(action){

	console.log('in HERE');
	const  payload  = action.data;
	//const files = action.data.files
	 yield call(uploadImageApi , action.data);


}


/*******************WATCHERS*****************/

function* watchUploadImage() {
  // 1- Create a channel for request actions
  const requestChan = yield actionChannel('UPLOAD_IMAGE')
  while (true) {
    // 2- take from the channel
    const {payload} = yield take(requestChan)
    // 3- Note that we're using a blocking call
    yield call(uploadImage, payload)
  }
}

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

//watcher function for fetchPublicMemory
function* watchFetchPublicMemory(){
	yield* takeLatest('FETCH_PUBLIC_MEMORY', fetchPublicMemory);
}

//watcher function for fetchPublicMoments
function* watchFetchPublicMoments(){
	yield* takeLatest('FETCH_PUBLIC_MOMENTS', fetchPublicMoments);
}


//watcher function for like some Moment
function* watchLikeMoment(){
	yield* takeEvery('LIKE_MOMENT', likeMoment);
}

//watcher function for like some Moment
function* watchAddMoments(){
	yield* takeEvery('ADD_MOMENTS', addMoments);
}

//watcher function for like some Moment
/* function* watchUploadImage(){
	yield* take('UPLOAD_IMAGE', uploadImage);
} */


export default function* root() {


  yield [watchFetchMemories()
  , watchFetchPublicMemory()
  , watchFetchPublicMoments()
  , watchVerifySuccess()
  , watchLogOut()
  , watchFetchMoments()
  , watchLikeMoment()
  , watchAddMoments()
  , watchUploadImage()
]
}
