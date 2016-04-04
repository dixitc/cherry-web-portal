import fetch from 'isomorphic-fetch';
import apiUrl from '../config/config';


//actions types
const DO_SOMETHING = 'DO_SOMETHING';
const FETCH_MEMORIES = 'FETCH_MEMORIES';
const RECEIVE_MEMORIES = 'RECEIVE_MEMORIES';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const REGISTER_USER = 'REGISTER_USER';

/*
async action types
{
type : 'FETCH_MEMORIES',
id : memoryId
}

{
type: 'REGISTER_USER',
creds: {
	identifier:"",
	identifierType:"PHONE",
	verificationMode:"OTP_MSG"
}
}

*/



//action creators

const doSomething = (text) => {

    return {
        type: 'DO_SOMETHING',
        text: text
    }

}



const registerUser = (creds) => {
	let config = {
		method: "POST",
		headers: {'Content-Type':'application/x-www-form-urlencoded'},
		body: 'identifier=${creds.identifier}&identifierType=${creds.identifierType}&verificationMode=${creds.verificationMode}'
	}
	let url = apiUrl + "register.json"l;
	return dispatch => {
		// We dispatch requestLogin to kickoff the call to the API
		dispatch(requestLogin(creds))

		return fetch(url , config)
			.then((response) => {
				if(!resposne.verificationId){
					dispatch(loginFailure(response));
				}else {
					dispatch(verifyUser(response.verificationId));
				}
			})
	}

}

const verifyUser = (id) => {
	let url = apiUrl + "verify/"+id+".json";
	let config = {
		method: "POST",
		headers: {'Content-Type':'application/x-www-form-urlencoded'},
		body: 'otp=783sdf'
	}
	return dispatch => {
		//dispatch() dispatch requestverify
		return fetch(url , config)
			.then((response) => {
				if(resposne.authToken){
					dispatch(verifySuccess(response));
				}else {
					dispatch(verifyFailed(response));
				}
			})
	}

}


// have to use redux-thunk to setup async actionCreators

const fetchMemories = (memoryId) => {
	return {
		type: 'FETCH_MEMORIES',
		id : memoryId
	}
}

const receiveMemories = (json) => {
	return {
		type: 'RECEIVE_MEMORIES',
		memories : json
	}
}

//export action creator and call like dispatch(actionCreator(a,b))
export default doSomething;
