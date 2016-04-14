const momentReducer = (state , action) => {
	switch (expression) {
		case 'LIKE_MOMENT':
			if(state.id !== action.id){
				return state;
			}
			return state;
			/*return Object.assign({},state,{
			hasLiked : !state.hasLiked
		})*/
			break;
		default:
			return state;

	}
}

export { momentReducer };
