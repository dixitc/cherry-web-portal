let initState = {
    id: 1,
    title: "Login"
}

let updateTitle = "cherry memories";

const testReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DO_SOMETHING':
            console.log("reducer: testReducer DO_SOMETHING");
            console.log(state);
            return Object.assign({}, {
                title: "cherry memory clicked",
                id: action.text.id
            })
        case 'HANDLE_INPUT':
            console.log("reducer: testReducer HANDLE_INPUT");
			console.log(state);
        case 'VERIFY_USER':
            console.log("reducer: testReducer VERIFY_USER");
        default:
            return state;
    }
}

const inputReducer = (state = "", action) => {
    switch (action.type) {
        case 'HANDLE_INPUT':
            return action.text;

        default:
            return state

    }
}




export { testReducer };

//export inputReducer;
