    import fetch from 'isomorphic-fetch';
    import apiUrl from '../config/config';
	import { browserHistory , hashHistory } from 'react-router';
	import * as customGa from '../analytics/ga';


    //todo get user , memories only if needed , need to make a separate thunk for this
    //actions types

    const FETCH_MEMORIES = 'FETCH_MEMORIES';
    const FETCH_MEMORIES_SUCCESS = 'FETCH_MEMORIES_SUCCESS';
    const FETCH_MEMORIES_FAIL = 'FETCH_MEMORIES_FAIL';
    const RECEIVE_MEMORIES = 'RECEIVE_MEMORIES';
    const PURGE_MEMORIES = 'PURGE_MEMORIES';
	const SET_ISLOADED = 'SET_ISLOADED';

	const FETCH_MOMENTS = 'FETCH_MOMENTS';
    const FETCH_MOMENTS_SUCCESS = 'FETCH_MOMENTS_SUCCESS';
    const FETCH_MOMENTS_FAIL = 'FETCH_MOMENTS_FAIL';
    const REFINE_MOMENTS = 'REFINE_MOMENTS';
    const PURGE_MOMENTS = 'PURGE_MOMENTS';
	const LIKE_MOMENT = 'LIKE_MOMENT';
	const LIKE_MOMENT_SUCCESS = 'LIKE_MOMENT_SUCCESS';
	const ADD_MOMENTS = 'ADD_MOMENTS';
	const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
	const PUBLISH_MOMENTS = 'PUBLISH_MOMENTS';
	const UPLOADING_MOMENTS = 'UPLOADING_MOMENTS';
	const MOMENTS_FINISHED_UPLOADING = 'MOMENTS_FINISHED_UPLOADING';
	const IMAGE_FINISHED_UPLOADING = 'IMAGE_FINISHED_UPLOADING';


	const TOGGLE_WEBLINK = 'TOGGLE_WEBLINK';
	const SET_WEBLINK = 'SET_WEBLINK';

	const CREATE_MEMORY = 'CREATE_MEMORY';
	const CREATE_MEMORY_SUCCESS = 'CREATE_MEMORY_SUCCESS';
	const CREATE_MEMORY_FAIL = 'CREATE_MEMORY_FAIL';

	const FETCH_PUBLIC_MOMENTS = 'FETCH_PUBLIC_MOMENTS';
	const FETCH_PUBLIC_MEMORY = 'FETCH_PUBLIC_MEMORY';
	const SET_IS_LOADED_PUBLIC_MEMORY = 'SET_IS_LOADED_PUBLIC_MEMORY';
	const RECEIVE_CURRENT_MEMORY = 'RECEIVE_CURRENT_MEMORY';
	const REJECT_CURRENT_MEMORY = 'REJECT_CURRENT_MEMORY';

	const PURGE_USER = 'PURGE_USER';
	const SET_TITLE = 'SET_TITLE';

	const LOGOUT_USER = 'LOGOUT_USER';
    const REGISTER_USER = 'REGISTER_USER';
    const UPDATE_USER = 'UPDATE_USER';
    const REGISTER_REQUEST = 'REGISTER_REQUEST';
    const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
    const REGISTER_FAIL = 'REGISTER_FAIL';
    const VERIFY_USER = 'VERIFY_USER';
    const VERIFY_REQUEST = 'VERIFY_REQUEST';
    const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
    const VERIFY_FAIL = 'VERIFY_FAIL';
    const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

    //action creators
const addMoments = (payload) => {
	let gaPayload = {
		category : 'MOMENTS_ACTIONS',
		action:'ADD_MOMENTS'
	};

	customGa.event(gaPayload);
	return {
		type : ADD_MOMENTS,
		data : payload
	}
}

const uploadImage = (payload) => {
	return {
		type : UPLOAD_IMAGE,
		data : payload
	}
}

const publishMoments = (payload) => {
	return {
		type : PUBLISH_MOMENTS,
		data : payload
	}
}

const toggleWebLink = (payload) => {
	console.log('internal toggling');
	return {
		type :TOGGLE_WEBLINK,
		data : payload
	}
}

const setWebLink = (payload) => {
	return {
		type : SET_WEBLINK,
		data : payload
	}
}


const uploadingMoments = (payload) => {
	return {
		type : UPLOADING_MOMENTS,
		data : payload
	}
}

const imageFinishedUploading = (payload) => {
	return {
		type : IMAGE_FINISHED_UPLOADING,
		data : payload
	}
}

const momentsFinishedUploading = (payload) => {
	return {
		type : MOMENTS_FINISHED_UPLOADING,
		data : payload
	}
}

    const validateCredentials = (creds) => {

		//DEMO CASE
		if(creds.identifier == '5555555551' || creds.identifier == '5555555552'){
			return '';
		}
		//DEMO CASE END
        if(creds.identifier == null || creds.identifier == '' ){
            return '*required field';
        }
        let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
		let truth;
		try {
			let phoneNumber = phoneUtil.parse(creds.identifier, 'IN');

			 truth =  phoneUtil.isValidNumber(phoneNumber);
		} catch (e) {
			truth = false;

		}


        if(truth){
            return '';
        }else {
            return 'check your number';
		}
        //dispatch error message action
    }

    // Meet our first thunk action creator!
    // Though its insides are different, you would use it just like any other action creator:

const updateUser = (payload) => {
	return {
		type : UPDATE_USER,
		data : payload
	}
}


    const registerUser = (creds) => {
        /*	return async action */
		let gaPayload = {
			category : 'LOGIN',
			action:'REGISTER_USER'
		}
		customGa.event(gaPayload)
        const { identifier , identifierType , verificationMode , dial_code} = creds;
        let validation='';

        return dispatch => {
            // We dispatch requestLogin to kickoff the call to the API . THIS WILL DEPEND ON THE AUTH FLOW WE DECIDE EVENTUALLY , JUST REGISTER_USER FOR NOW.

            dispatch(registerRequest(creds));
            validation = validateCredentials(creds);
            //console.log(validation);

            if(validation == ''){

            }else{
                //don't executr if validation fails
                dispatch(registerFail(validation));
                return;
            }

            let config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'identifier='+'%2b'+dial_code.slice(1,dial_code.length)+identifier+'&identifierType='+identifierType+'&verificationMode='+verificationMode
            }
            let url = apiUrl + '/register.json';
			return fetch(url, config)
    		.then((response) => {return response.json()})
                .then((json) => {

                    if (!json.verificationId) {
                        //ideally see what the server sends
                        dispatch(registerFail('invalid number'));
                    } else {

                        dispatch(registerSuccess(json.verificationId));
						if(identifier == '5555555551' || 5555555551){

						//	dispatch(verifyUser(json.verificationId,333,'+'+dial_code.slice(1,dial_code.length)+identifier,'/memories'));
						}
                        //need to send verifyuser request
                    }
                })
    			.catch((json) => {

                    dispatch(registerFail('network error'));
    			})

        }

    }

    const registerRequest = (data) => {
        // return async action using thunk middleware
        return {
            type: REGISTER_REQUEST,
            data: data
        }

    }


    const getUserProfile = (data) => {
        //use this function to fetch user data when authToken is already present on initial page load
        //save this data as auth
    }

    const registerSuccess = (id) => {
        return {
            type: REGISTER_SUCCESS,
            id: id
        }
    }

    const registerFail = (msg) => {
        return {
            type: REGISTER_FAIL,
            errMsg: msg
        }
    }

    const setErrorMessage = (msg) => {
        return {
            type: SET_ERROR_MESSAGE,
            errMsg: msg
        }
    }

    const verifyRequest = (data) => {
        //update state , actual network call made in verifyUser()
        return {
            type: VERIFY_REQUEST,
            data: data
        }

    }

    const verifySuccess = (data) => {
        return {
            type: VERIFY_SUCCESS,
            data: data
        }

    }

    const verifyFailed = (msg) => {
        return {
            type: VERIFY_FAIL,
            msg: msg
        }
    }

	const createMemory = (data) => {
		return {
			type: CREATE_MEMORY,
			data: data
		}
	}

	const createMemorySuccess = (data) => {
		return {
			type: CREATE_MEMORY_SUCCESS,
			data: data
		}
	}


    const verifyUser = (id,otp,identifier,redirectRoute) => {
		let gaPayload = {
			category : 'LOGIN',
			action:'VERIFY_USER'
		}
		customGa.event(gaPayload)
        let url = apiUrl + '/verify/' + id + '.json';
        let config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'otp='+otp
        }
        return dispatch => {
            //dispatch() dispatch requestverify
			dispatch(verifyRequest());
            return fetch(url, config)
			.then((response) => response.json())
                .then((json) => {
                    if (json.authToken) {
						//if success ideally should redirect to original link Done
						//if user is anonymous shouldn't redirect ,should show prompt for setting name and profile pic
						json.identifier = identifier;
						dispatch(verifySuccess(json));
						let gaPayload = {
							category : 'LOGIN',
							action:'VERIFY_SUCCESS'
						}
						customGa.event(gaPayload);
						if(json.profile.name){

							if(redirectRoute == ''){
									hashHistory.replace('/memories');
							}else{
								console.log('redirectRoute');
								console.log(redirectRoute);
										hashHistory.replace(redirectRoute);
							}
						}
                    } else {
						console.log('CHECK ERROR MESSAGE');
						console.log(json.err.errorMessage);
						let gaPayload = {
							category : 'LOGIN',
							action:'VERIFY_FAIL'

						}
						customGa.event(gaPayload);
						if(json.err.errorMessage){
							dispatch(verifyFailed(json.err.errorMessage));
						}else{
							dispatch(verifyFailed('Incorrect otp'));
						}
                    }
                })
        }

    }

	const logOutUser = () => {
		//Need to remove token from localStorage
		let gaPayload = {
			category : 'LOGIN',
			action:'LOGOUT_USER'
		}
		customGa.event(gaPayload);
		return {
			type: LOGOUT_USER
		}
	}



    const fetchMemories = (token) => {
		//needs to be an async action
        return {
            type: FETCH_MEMORIES,
			token : token

        }
    }

	const fetchmemories = (memoryId) => {
		//gotta set the url ad config and makesure auth header has been set
		return dispatch => {
			return fetch(url , config)
			.then((response) => response.json())
			.then((json) => {
				dispatch(fetchMemoriesSuccess(json));
			})
			.catch((json) => {
				dispatch(fetchMemoriesFail(json));

			})
		}
	}

    const receiveMemories = (json) => {
        return {
            type: RECEIVE_MEMORIES,
            memories: json
        }
    }

	const receiveCurrentMemory = (data) => {
		return {
			type: 'RECEIVE_CURRENT_MEMORY',
			data:data
		}
	}

	const rejectCurrentMemory = (data) => {
		return {
			type: 'REJECT_CURRENT_MEMORY',
			data:data
		}
	}

	const purgeUser = () => {
		return {
			type: PURGE_USER
		}
	}
	//purges all memories from cache and state
	const purgeMemories = () => {
		return {
			type: PURGE_MEMORIES
		}
	}

//call to fetch moments , listened for in saga
	const fetchMoments = (data) => {
		//needs to be an async action
        return {
            type: FETCH_MOMENTS,
			data : data

        }
    }


	const fetchPublicMemory = (data) => {
		return {
			type:'FETCH_PUBLIC_MEMORY',
			data: data
		}
	}


	const fetchPublicMoments = (data) => {
		return {
			type:'FETCH_PUBLIC_MOMENTS',
			data: data
		}
	}

	const setIsLoadedPublicMemory = (data) => {
		return {
			type:'SET_IS_LOADED_PUBLIC_MEMORY',
			data:data
		}
	}


	//on moments receive success
	    const refineMoments = (json) => {
	        return {
	            type: REFINE_MOMENTS,
	            data: json
	        }
	    }

	const likeMoment = (payload) => {
		return {
			type : LIKE_MOMENT,
			data : payload
		}
	}

	const likeMomentSuccess = (payload) => {
		return {
			type : LIKE_MOMENT_SUCCESS,
			data : payload
		}
	}


    	const setTitle = (payload) => {
    		return {
    			type : SET_TITLE,
    			title : payload
    		}
    	}

//purge all moments ?? or only moments of a certain memory
	const purgeMoments = () => {
		return {
			type: PURGE_MOMENTS
		}
	}

	const setIsLoaded = (payload) => {
		return {
			type: SET_ISLOADED,
			data : payload
		}
	}

    //export action creator and call like dispatch(actionCreator(a,b))
    //eventually move all action names into constants
	//eventually separate out action according to what the action is
    export {

    	registerUser,
        registerRequest,
        registerFail,
        registerSuccess,
        verifyUser,
		updateUser,
        verifyFailed,
        verifySuccess,
        setErrorMessage,
		fetchMemories,
		likeMoment,
		createMemory,
		createMemorySuccess,
		toggleWebLink,
		setWebLink,
		addMoments,
		publishMoments,
		uploadingMoments,
		imageFinishedUploading,
		momentsFinishedUploading,
		uploadImage,
		likeMomentSuccess,
		receiveMemories,
		receiveCurrentMemory,
		rejectCurrentMemory,
		purgeMemories,
		logOutUser,
		fetchMoments,
		fetchPublicMemory,
		setIsLoadedPublicMemory,
		fetchPublicMoments,
		refineMoments,
		logOutUser,
		setIsLoaded,
		purgeMoments,
        setTitle,
		purgeUser
    };
