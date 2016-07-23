import { takeEvery, takeLatest } from 'redux-saga'
import { take, actionChannel , put, call, fork, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import * as actions from '../actions/actions';
import apiUrl from '../config/config';
import { browserHistory ,  hashHistory } from 'react-router';


/************************APIS*******************/
// NEED TO HANDLE ERROR STATES WITH SNACKBAR MESSAGES

/*
What is this ?

official definition : redux-saga is a library that aims to make side effects
 (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) in React/Redux applications easier and better.

Cherry handles all API calls here except for register and verify user OTP
*/

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

	//check and serve from cache if they exist
	let cacheUrl = apiUrl+'/v2/memory/allmemories.json'
	console.log(cacheUrl);
	caches.match(cacheUrl).then(function(response){
		console.log('LOGGING CACHE MEMORIES');
		//console.log(response);
		if (!response) {
			throw Error('No data');
		}
		return response.json();
  	}).then((data) => {
		if(data.memories){

			console.log('LOGGING CACHE MEMORIES DATA 2');
			console.log(data);
			 put(actions.receiveMemories(cacheMemories));
			return data;
		}


  }).catch(function(err) {
	  console.log(err);


	})


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

function toggleWebLinkApi(params){
	const user = getUser();
	const token = user.authToken;
	console.log(params);
	const url = apiUrl+'/v2/weblink/'+params.memoryId+'.json';
	const myHeaders = new Headers({
	  'authToken' : token,
	  'Content-Type': 'application/x-www-form-urlencoded'
	});
	let config = {
		method : 'POST',
		headers : myHeaders,
		body: 'isEnabled='+JSON.stringify(params.webLinkBool)
	}
	return fetch(url,config)
	.then((response) => response.json())
	.then((json) => {
		console.log(json)
		return json;
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
	data.append('returnImage', 'true')


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

function updateUserInfoApi(params){
	const user = getUser();
	const token = user.authToken;

	console.log(params);
	console.log(user);
	let data = new FormData()
	data.append('image', params.image)
	data.append('name' , params.name)
	data.append('returnImage', 'true')

	const url = apiUrl+'/v1/profile/'+user.profile.id+'/updateUserInfo.json';
	const myHeaders = new Headers({
	    'authToken': token

	});
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

function createMemoryApi(params){
	const user = getUser();
	const token = user.authToken;

	console.log(params);
	let form = new FormData();
	form.append('memory',params.memory);
	//form.append('moments',params.moments);
	const url = apiUrl+'/v1/memory.json';
	const myHeaders = new Headers({
		authtoken:token,
		'Accept': 'application/json, application/xml, text/play, text/html, *.*',
	             'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'

	});
	let config = {
		method : 'POST',
		headers : myHeaders,
		body: 'memory='+JSON.stringify(params.memory)+'&moments='+JSON.stringify(params.moments)+'&returnMoments=true'
	}
	return fetch(url,config)
	.then((response) => response.json())
	.then((json) => {
		console.log('COLLECTING JSON AFTER CREATING MEMORY');
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

function setUser(updatedUser){
	localStorage.setItem('cherryToken',JSON.stringify(updatedUser));
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



//a function that comprehensively handles adding new moments flow
//as well as updating state for according ui changes
function* addMoments(action){
	console.log(action);
	const user = getUser();
	console.log('USERUSERUSERUSER');
	console.log(user);
	yield put(actions.uploadingMoments({toUploadCount:action.data.files.length}));
	let addMomentsResponse = yield call(addMomentsApi , action.data);
	console.log(addMomentsResponse);
	/*for (var i = 0; i < addMomentsResponse.moments.length; i++) {
		let imageId = yield call(uploadImage , {data:{momentId:addMomentsResponse.moments[i].id,file:action.data.files[i]}})
		console.log(imageId);
		addMomentsResponse.moments[i].image.id = imageId.imageId
	}*/
	yield addMomentsResponse.moments.map((moment,i) => call(uploadImage , {data:{moment:moment,momentId:moment.id,file:action.data.files[i]}}))
	let momentIds = '';
	addMomentsResponse.moments.map((moment,i) => {
		if(i == addMomentsResponse.moments.length - 1){
			momentIds = momentIds + (moment.id).toString()
		}else{
			momentIds = momentIds + (moment.id).toString() + ','
		}
	})
	console.log(' IMAGES UPLOADED');
	console.log(addMomentsResponse.moments);
	yield call(publishMomentsApi , {momentIds:momentIds,memoryId:action.data.memoryId})
	addMomentsResponse.moments.map((moment,i) => {
		moment.isPublished = true;
		if(user.profile){
			moment.owner.name = user.profile.name;
			moment.owner.photo = user.profile.photo;
		}
	})
	console.log(addMomentsResponse.moments);
	console.log(' MOMENTS PUBLISHED ');
	yield put(actions.refineMoments({moments : {moments:addMomentsResponse.moments} , userId:user.profile.id}))
	yield put(actions.momentsFinishedUploading())
}

//a function that handles cleanup after LOGOUT_USER is called
function* uploadImage(action){
	console.log('in HERE');
	const  payload  = action.data;
	//const files = action.data.files
	let imageId =	yield call(uploadImageApi , action.data);
	action.data.moment.image={id:imageId.image.imageId,CURRENT_IMAGE:'https://docs.google.com/uc?id='+imageId.image.fileStoreId,COMPRESSED:'https://docs.google.com/uc?id='+imageId.image.fileStoreId};
	action.data.moment.imageUrl=imageId.image.thumbURL;
	yield put(actions.imageFinishedUploading())
	return action.data.moment;
}

//a function that handles cleanup after LOGOUT_USER is called
function* toggleWebLink(action){
	console.log('sagas : getweblink');
	let webLinkResponse =	yield call(toggleWebLinkApi , action.data);
	let enabled = action.data.webLinkBool;
	let shortCode ;
	console.log(webLinkResponse.weblink);
	if(!webLinkResponse.weblink){
		shortCode = null;
		enabled = false;
	}else{
		shortCode = webLinkResponse.weblink;
	}
	yield put(actions.setWebLink( {memoryId : action.data.memoryId , shortCode : shortCode , enabled : enabled}))
	//return action.data.moment;
}


//a function that handles cleanup after LOGOUT_USER is called
function* updateUser(action){
	console.log('sagas : updateUser');
	console.log(action.data);
	let updateUserResponse =	yield call(updateUserInfoApi , action.data);
	let user  = getUser();
	user.profile.name = action.data.name;
	user.profile.photo = updateUserResponse.imageUrl;
	console.log(user);
	setUser(user)
	console.log(updateUserResponse);
	hashHistory.push('/memories');
//	yield put(actions.setWebLink( {memoryId : action.data.memoryId , shortCode : shortCode , enabled : enabled}))
	//return action.data.moment;
}

//a function that handles cleanup after LOGOUT_USER is called
function* createMemory(action){
	const user = getUser();
	console.log('sagas : createMemory');
	console.log(action.data.moments);
	console.log(user);
	const  payload = {};
	payload.memory = action.data.memory;
	//const files = action.data.files
	payload.memory.members = [{
		identifier : user.profile.identifier,
		addedBy:user.profile.id,
		permission:'ADMIN',
		profile : {
			id: user.profile.id
		},
		localName : user.profile.name
	}];
	if(action.data.moments.length > 0){
		console.log('lol');
		payload.returnMoments = true;
		payload.coverMoment = action.data.moments[0].id;
		payload.moments = action.data.moments;
	}else{
		payload.moments = []
	}
	//call uploader with uploadText creating memory
	const createMemoryResponse = yield call(createMemoryApi , payload)
	console.log(createMemoryResponse);

	//in a perfect world should call addMoments either directly the function or action based on sagas best practice
	if(createMemoryResponse.moments.length > 0){
		yield createMemoryResponse.moments.map((moment,i) => call(uploadImage , {data:{moment:moment,momentId:moment.id,file:action.data.files[i]}}))
		let momentIds = '';

		createMemoryResponse.moments.map((moment,i) => {
			if(i == createMemoryResponse.moments.length - 1){
				momentIds = momentIds + (moment.id).toString()
			}else{
				momentIds = momentIds + (moment.id).toString() + ','
			}
		})
		console.log(' IMAGES UPLOADED');
		console.log(createMemoryResponse.moments);
		yield call(publishMomentsApi , {momentIds:momentIds,memoryId:action.data.memory.id})
	}
	yield put(actions.createMemorySuccess(createMemoryResponse))

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

//watcher function for creating new memory
function* watchCreateMemory(){
	yield* takeEvery('CREATE_MEMORY', createMemory);
}

//watcher function for creating new memory
function* watchToggleWebLink(){
	console.log('agagin toggling');
	yield* takeEvery('TOGGLE_WEBLINK', toggleWebLink);
}

//watcher function for updating user info at signup for now
function* watchUpdateUser(){
	console.log('updating ingo ');
	yield* takeEvery('UPDATE_USER', updateUser);
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
  , watchUpdateUser()
  , watchToggleWebLink()
  , watchFetchMoments()
  , watchCreateMemory()
  , watchLikeMoment()
  , watchAddMoments()
  , watchUploadImage()
]
}
