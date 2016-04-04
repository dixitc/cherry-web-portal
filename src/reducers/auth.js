
const initAuth = {
	isAuthenticated : false,
	authToken : null,
	profile: {
		name: null,
		id: null,
		photo: null
	}
}


const authReducer = (state=initAuth , action) => {
	switch (action.type) {
		case 'REGISTER_USER':
			console.log("reducer: authReducer REGISTER_USER");
			return state;
		case 'VERIFY_USER':
			console.log("reducer: authReducer VERIFY_USER");
			return state;
		default:
			return state;

	}
}


export  {authReducer};
