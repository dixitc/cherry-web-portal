const initState = {
    memories: [],
    isFetching : false,
	lastUpdated : '',
	currentMemory : {
	   title:'',
	   owner:{
		   name:'',
		   photo:''
	   },
	   momentsCount:null,
	   members:[],
	   isFullyLoaded : false
   }
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
		case 'CREATE_MEMORY_SUCCESS':

			console.log('reducer: memoriesReducer CREATE_MEMORY_SUCCESS');
			console.log(action);
			console.log(state.memories);
			return Object.assign({}, state, {
		           memories: [
		             ...state.memories,
		            action.data.data
		           ]
			   })
			   //return state;
		case 'CREATE_MEMORY_FAIL':
			return state;
		case 'SET_WEBLINK':

		console.log('reducer: memoriesReducer SET_WEBLINK');
			console.log(action);
			const freshMemories =  state.memories.map((memory) => {
                console.log(memory.id);
                let payload = action.data
                console.log(payload);
                console.log((memory.id).toString() == payload.memoryId);
				if(memory.id == payload.memoryId){
                    console.log('wololo');
                    console.log(memory);
                    //console.log(memory.weblink);
					//memory.weblink.enabled = payload.enabled

                    return Object.assign({}, memory, {
                        webLink: {enabled : payload.enabled , shortCode : payload.shortCode}
                    })

				}
				return memory;
			})
			return Object.assign({} , state ,{
				memories : freshMemories
			});
		case 'SET_ISLOADED':
			const refinedMemories =  state.memories.map((memory) => {
				if(memory.id == action.data.memoryId){
					memory.isFullyLoaded = action.data.isLoaded;
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
		case 'SET_IS_LOADED_PUBLIC_MEMORY':
			console.log('CHECKING STATE IS LOADED PUBLIC MEMORY');
			return Object.assign({} , state , {currentMemory : {...state.currentMemory,isFullyLoaded : action.data}});
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
		case 'FETCH_PUBLIC_MEMORY':
			return Object.assign({},state,{currentMemory:{...state.currentMemory , isFetching:true}})
		case 'REJECT_CURRENT_MEMORY':
			return Object.assign({},state,{currentMemory:{...state.currentMemory , isPresent:false , isFetching : false}})
		case 'RECEIVE_CURRENT_MEMORY':
			if(action.data.memory){

				let updateCurrentMemory = Object.assign({} , action.data.memory );
				console.log(updateCurrentMemory);
				return Object.assign({} , state , {
					currentMemory : {
						...state.currentMemory,
						...updateCurrentMemory,
						isFullyLoaded : false,
						isPresent:true,
						isFetching : false
					}
				})
			}else {
				return state;
			}
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
