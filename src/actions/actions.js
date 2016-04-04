import fetch from 'isomorphic-fetch';
//actions types
const DO_SOMETHING = 'DO_SOMETHING';
const FETCH_MEMORIES = 'FETCH_MEMORIES';
const RECEIVE_MEMORIES = 'RECEIVE_MEMORIES';
/*
{
type : 'FETCH_MEMORIES',
id : memoryId
}

*/



//action creators

const doSomething = (text) => {

    return {
        type: 'DO_SOMETHING',
        text: text
    }

}


// have to use redux-thunk to setup async actionCreators

const fetchMemories = (memoryId) => {
	return {
		type: 'FETCH_MEMORIES',
		id : memoryId
	}
}

const receiveMemories = (json) => {
	return {
		type: 'RECEIVE_MEMORIES',
		memories : json
	}
}

//export action creator and call like dispatch(actionCreator(a,b))
export default doSomething;
