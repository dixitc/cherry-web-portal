import moment from './moment';

const initState = {
    moments: [],
	memoryId:'',
    isFetching : false,
	lastUpdated : ''
}

//Separate out singleMomentReducer

const momentsReducer = (state = initState, action) => {
    switch (action.type) {

		case 'REFINE_MOMENTS':
			//console.log('reducer: momentsReducer REFINE_MOMENTS');

			const refinedMoments = action.data.moments.moments.map(function(moment){
				let truth = false;
				//eventually move this into momentReducer
				if(moment.like.hasLiked){

					moment.likedUserList.map((user)=> {
						if (user == action.data.userId){
							truth = true;
						}
						return user;
					})
				}
				moment.hasLiked = truth;
				return moment;
			})

			const prevMoments = state.moments;

			return Object.assign({},state,{
				isFetching : false,
				moments : [...prevMoments, ...refinedMoments]
			})

			//return state;
		case 'FETCH_MOMENTS':
			//console.log('reducer: momentsReducer FETCH_MOMENTS');
			return Object.assign({}, state, {
				isFetching : true

			});
		case 'LIKE_MOMENT_SUCCESS':
			//console.log('reducer: momentsReducer LIKE_MOMENT_SUCCESS');

			const updatedMoments =  state.moments.map((moment) => {
				if(moment.id == action.data.momentId){
					moment.hasLiked = !moment.hasLiked;
				}
				return moment;
			})
			return Object.assign({} , state ,{
				moments : updatedMoments
			});
		case 'FETCH_MOMENTS_SUCCESS':
			return state;
			/*return Object.assign(...state,{
			memories : action.data.memories,
			isFetching : false,
			lastUpdated : Date.now()
		})*/
		case 'FETCH_MOMENTS_FAIL':
			return state;
			/*return Object(...state , {
			isFetching : false
		})*/
		case 'PURGE_MOMENTS':
			return Object.assign({},state,{
				moments : [],
				isFetching : false
			})
			//return state;
        default:
            return state;
    }
}



export { momentsReducer };

//export inputReducer;
