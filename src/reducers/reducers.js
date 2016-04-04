

let initState =  {
		id:1,
		title:"click this memory"
	}

let updateTitle = "cherry memories";

const testReducer = (state=initState , action) => {
	switch (action.type) {
		case 'DO_SOMETHING':
			console.log("action : do_something is running");
			console.log(state);
			return Object.assign({},{title:"cherry memory clicked",id : action.text.id})
		case 'HANDLE_INPUT':
			console.log("action : handle_input is running");
			console.log(state);
		default:
			return state;

	}
}

const inputReducer = (state="" , action) => {
	switch (action.type) {
		case 'HANDLE_INPUT':
			return action.text;

		default:
			return state

	}
}




export { testReducer };
export { inputReducer };
//export inputReducer;
