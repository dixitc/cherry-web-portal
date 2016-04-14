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

		case 'RECEIVE_MOMENTS':
		//console.log("reducer: momentsReducer RECEIVE_MOMENTS");
			return Object.assign({},state , {
				moments : action.data.moments,
				isFetching : false
			});
			//return state;

		case 'REFINE_MOMENTS':
		console.log("reducer: momentsReducer REFINE_MOMENTS");
		console.log(action);
		console.log(state);
		const refinedMoments = action.data.moments.moments.map(function(moment){
			let truth = false;
			//eventually move this into momentReducer
			if(moment.like.hasLiked){

				moment.likedUserList.map((user)=> {
					if (user == action.data.userId){
						console.log(user);
						console.log(truth);
						console.log(action.data.userId);
						truth = true;
					}
					return user;
				})
			}
			moment.hasLiked = truth;
			console.log(moment.hasLiked);
			return moment;
		})
		return Object.assign({},state,{
		moments : refinedMoments
	})

		return state;
		//case 'FETCH_MOMENTS':
		console.log("reducer: momentsReducer FETCH_MOMENTS");
		console.log(state);
			return Object.assign({}, state, {
				isFetching : true,
				moments : []
			})
			//return state;
		case 'LIKE_MOMENT_SUCCESS':
		console.log("reducer: momentsReducer LIKE_MOMENT_SUCCESS");
		console.log(action);
			//eventually have to move this operation into separate momentReducer
			//console.log(state);
			//return state;
			const updatedMoments =  state.moments.map((moment) => {
				console.log(moment.id);
				console.log(action.data.momentId);
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
