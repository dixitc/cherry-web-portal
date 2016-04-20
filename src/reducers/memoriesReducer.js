const initState = {
    memories: [],
    isFetching : false,
	lastUpdated : '',
	currentMemory : ''
}



const memoriesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DO_SOMETHING':
            console.log(state);
            return Object.assign({}, {
                title: 'cherry memory clicked',
                id: action.text.id
            })
		case 'RECEIVE_MEMORIES':
		//console.log("reducer: memoriesReducer RECEIVE_MEMORIES");
		const updatedMemories =  action.memories.memories.map((memory) => {

				memory.isFullyLoaded = false

			return memory;
		})
			return Object.assign({},state,{
				memories : updatedMemories,
                isFetching:false
			})
			//return state;
			case 'SET_ISLOADED':
			console.log('MOMENTS - MOMENTS - MOMENTS - MOMENTS');
			console.log(state.memories);
				const refinedMemories =  state.memories.map((memory) => {
					if(memory.id == action.memoryId){
						memory.isFullyLoaded = true;
					}
					return memory;
				})
				return Object.assign({} , state ,{
					memories : refinedMemories
				});
		case 'FETCH_MEMORIES':
        //console.log("reducer: memoriesReducer FETCH_MEMORIES");

			return Object.assign({},state,{
			isFetching : true
		})
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
			return Object.assign({},state,{
				memories : [],
				isFetching : false
			})
			//return state;
        default:
            return state;
    }
}



export { memoriesReducer };

//export inputReducer;
