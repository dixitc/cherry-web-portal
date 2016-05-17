import moment from './moment';

const initState = {
    moments: [],
    memoryId: '',
    isFetching: false,
    lastUpdated: '',
    uploaderStatus: {

        isUploading: false,
        toUploadCount: null,
        finishedUploadCount: null,
        uploadText: 'test text'
    }
}

//Separate out singleMomentReducer

const momentsReducer = (state = initState, action) => {
    switch (action.type) {
		case 'UPLOADING_MOMENTS':
			//console.log('reducer: momentsReducer FETCH_MOMENTS');
			return Object.assign({}, state, {uploaderStatus : {...state.uploaderStatus,isUploading : true,toUploadCount:action.data.toUploadCount,finishedUploadCount:0}});
			return state;
		case 'IMAGE_FINISHED_UPLOADING':
			//return state;
			return Object.assign({}, state, {uploaderStatus : {...state.uploaderStatus,finishedUploadCount:state.uploaderStatus.finishedUploadCount+1}});
		case 'MOMENTS_FINISHED_UPLOADING':
			//return state;
			return Object.assign({}, state, {uploaderStatus : {...state.uploaderStatus,isUploading : false,toUploadCount:null,finishedUploadCount:null,uploadText:null}});

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
		case 'FETCH_PUBLIC_MOMENTS':
			return Object.assign({},state,{isFetching:true})
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
				moments : []
			})
			//return state;
        default:
            return state;
    }
}



export { momentsReducer };

//export inputReducer;
