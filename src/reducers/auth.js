const initAuth = {
    authToken: null,
    isAuthenticated: false,
    isFetching: false,
    didInvalidate: false,
    isRegistered: false,
    lastUpdated: null,
	errorMessage : '',
    verificationId:'',
    profile: {
        name: null,
        id: null,
        photo: null
    }
}




const authReducer = (state = initAuth, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            //console.log("reducer: authReducer REGISTER_USER");
            return state;
        case 'REGISTER_REQUEST':
            //console.log("reducer: authReducer REGISTER_REQUEST");
            return {...state,
                isFetching: true
            };
		case 'REGISTER_SUCCESS':
			//console.log("reducer: authReducer REGISTER_SUCCESS");
			// on receiving the verification token from the server set verificationId somewhere
			return {...state,
                isFetching: false,
				isRegistered : true,
                verificationId : action.id
            };
			return state;
		case 'REGISTER_FAIL':
			//console.log("reducer: authReducer REGISTER_FAIL");

			return{ ...state,
            	isFetching : false,
            	isAuthenticated : false,
				isRegistered : false,
				errorMessage : action.errMsg

            }

			//return state;
        case 'SET_ERROR_MESSAGE' :
        //console.log("reducer: authReducer SET_ERRORMESSAGE");
            return {...state , errorMessage : action.msg};
        case 'VERIFY_USER':
            //console.log("reducer: authReducer VERIFY_USER");
            return state;
        case 'VERIFY_SUCCESS':
            //console.log("reducer: authReducer VERIFY_SUCCESS");
            //set user and authToken on success
            /*return Object.assign({} , state , {
            	isFetching : false,
            	isAuthenticated : true,
            	authToken : action.data.authToken,
            	profile : actions.data.profile
            })*/

            return state;
        case 'VERIFY_REQUEST':
            //console.log("reducer: authReducer VERIFY_REQUEST");
            //on sending a verify request to verify api update state (show loading icon etc)
            return  {...state,
                isFetching: true,
                isAuthenticated: false
            };

        case 'VERIFY_FAIL':
            //console.log("reducer: authReducer VERIFY_FAIL");
            // on verify request fail , update state and redirect to login ???
            /*return Object.assign({} , state , {
            	isFetching : false,
            	isAuthenticated : false,
            	errorMessage : action.message
            })*/
            return state;
        default:
            return state;

    }
}


export {
    authReducer
};
