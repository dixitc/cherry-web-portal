let initState = {
    memories: [],
    isFetching : false,
	lastUpdated : ''
}

let updateTitle = "cherry memories";

const memoriesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DO_SOMETHING':
            console.log(state);
            return Object.assign({}, {
                title: "cherry memory clicked",
                id: action.text.id
            })
		case 'RECEIVE_MEMORIES':
		//console.log("reducer: memoriesReducer RECEIVE_MEMORIES");
		
			return Object.assign(...state,{
				memories : action.memories.memories
			})
			//return state;
		case 'FETCH_MEMORIES':
			return state;
			/*return Object.assign(...state,{
			isFetching : true
		})*/
		case 'FETCH_MEMORIES_SUCCESS':
			return state;
			/*return Object.assign(...state,{
			memories : action.data.memories,
			isFetching : false,
			lastUpdated : Date.now()
		})*/
		case 'FETCH_MEMORIES_FAIL':
			return state;
			/*return Object(...state , {
			isFetching : false
		})*/
		case 'PURGE_MEMORIES':
			return Object.assign(...state,{
				memories : [],
				isFetching : false
			})
			//return state;
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




export { memoriesReducer };

//export inputReducer;
