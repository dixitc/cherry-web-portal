const initAuth = {
    authToken: null,
    isAuthenticated: false,
    isFetching: false,
    didInvalidate: false,
    isRegistered: false,
    lastUpdated: null,
	errorMessage : null,
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
            return Object.assign({}, state, {
                isFetching: true
            });
		case 'REGISTER_SUCCESS':
			//console.log("reducer: authReducer REGISTER_SUCCESS");
			// on receiving the verification token from the server set verificationId somewhere
			return Object.assign({}, state, {
                isFetching: false,
				isRegistered : true
            });
			return state;
		case 'REGISTER_FAIL':
			//console.log("reducer: authReducer REGISTER_FAIL");

			return Object.assign({} , state , {
            	isFetching : false,
            	isAuthenticated : false,
				isRegistered : false,
				errorMessage : action.error,
            	authToken : action.data.authToken,
            	profile : actions.data.profile
            })

			//return state;
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
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            })

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
