import expect from 'expect';
//import reducers here
import { authReducer } from '../src/reducers/auth';
import { memoriesReducer } from '../src/reducers/memoriesReducer';
import { momentsReducer } from '../src/reducers/momentsReducer';

//todo : then this into a dynamic test generator
//check if the reducers returns are as expected when passed in different actions
describe("ALL REDUCERS TEST SUITE", function() {
    it("authReducer REGISTER_REQUEST", function() {
        let initAuth = {
            profile: {},
            isFetching: false,
            isRegistered: false,
            isAuthenticated: false,
            didInvalidate: false,
            lastUpdated: null
        }
        let action = {
            type: "REGISTER_REQUEST"
		}
        let updatedStateSlice = authReducer(initAuth, action);
        expect(updatedStateSlice).toBeAn('object');
        expect(updatedStateSlice).toEqual({
            profile: {},
            isFetching: true,
            isRegistered: false,
            didInvalidate: false,
            lastUpdated: null,
            isAuthenticated: false
        });
    })
    it('authReducer VERIFY_REQUEST', function() {
        let auth = {
            profile: {},
            isFetching: false,
            lastUpdated: null,
            isRegistered: true,
            isAuthenticated: false,
            didInvalidate: false
        }
        let action = {
            type: "VERIFY_REQUEST"

        }
        let updatedStateSlice = authReducer(auth, action);
        expect(updatedStateSlice).toBeAn('object');
        expect(updatedStateSlice).toEqual({
            profile: {},
            isFetching: true,
            isRegistered: true,
            lastUpdated: null,
            isAuthenticated: false,
            didInvalidate: false
        });
    })
    it("authReducer VERIFY_REQUEST", function() {
        let auth = {
            profile: {},
            isFetching: false,
            lastUpdated: null,
            isRegistered: true,
            isAuthenticated: false,
            didInvalidate: false
        }
        let action = {
            type: "VERIFY_REQUEST"

        }
        let updatedStateSlice = authReducer(auth, action);
        expect(updatedStateSlice).toBeAn('object');
        expect(updatedStateSlice).toEqual({
            profile: {},
            isFetching: true,
            isRegistered: true,
            lastUpdated: null,
            isAuthenticated: false,
            didInvalidate: false
        });
    })
	it("memoriesReducer FETCH_MEMORIES", function() {
		let initState = {
		    memories: [],
		    isFetching : false,
			lastUpdated : ''
		}


		let action = {
			type: "FETCH_MEMORIES"

		}
		let updatedStateSlice = memoriesReducer(initState, action);
		expect(updatedStateSlice).toBeAn('object');
		expect(updatedStateSlice).toEqual({
			memories: [],
			isFetching : true,
			lastUpdated : ''
		});
	})
	it("memoriesReducer RECEIVE_MEMORIES", function() {
		let initState = {
			memories: [],
			isFetching : true,
			lastUpdated : ''
		}


		let action = {
			type: "RECEIVE_MEMORIES",
			memories : {
				memories : [{},{},{}]
			}

		}
		let updatedStateSlice = memoriesReducer(initState, action);
		expect(updatedStateSlice).toBeAn('object');
		expect(updatedStateSlice).toEqual({
			memories: [{isFullyLoaded : false},{isFullyLoaded : false},{isFullyLoaded : false}],
			isFetching : false,
			lastUpdated : ''

		});
	})
	it("memoriesReducer PURGE_MEMORIES", function() {
		let initState = {
			memories: [1,2,3,4],
			isFetching : true,
			lastUpdated : ''
		}


		let action = {
			type: "PURGE_MEMORIES"
		}

		let updatedStateSlice = memoriesReducer(initState, action);
		expect(updatedStateSlice).toBeAn('object');
		expect(updatedStateSlice).toEqual({
			memories: [],
			isFetching : false,
			lastUpdated : ''
		});
	})
	it("momentsReducer PURGE_MOMENTS", function() {
		let initState = {
			moments: [1,2,3,4],
			isFetching : false

		}


		let action = {
			type: "PURGE_MOMENTS"
		}

		let updatedStateSlice = momentsReducer(initState, action);
		expect(updatedStateSlice).toBeAn('object');
		expect(updatedStateSlice).toEqual({
			moments: [],
			isFetching : false

		});
	})
	it("momentsReducer FETCH_MOMENTS", function() {
		let initState = {
			moments: [1,2,3,4],
			isFetching : false

		}


		let action = {
			type: "FETCH_MOMENTS"
		}

		let updatedStateSlice = momentsReducer(initState, action);
		expect(updatedStateSlice).toBeAn('object');
		expect(updatedStateSlice).toEqual({
			moments: [1,2,3,4],
			isFetching : true
		});
	})
	it("momentsReducer LIKE_MOMENT_SUCCESS", function() {
		let initState = {
			moments: [{id:'asdf',hasLiked:false},{id:'xyzzy',hasLiked:false},{id:'aassdf',hasLiked:false}],
			isFetching : false

		}

		const data = {
			momentId : 'xyzzy'
		}
		let action = {
			type: "LIKE_MOMENT_SUCCESS",
			data: data
		}

		let updatedStateSlice = momentsReducer(initState, action);
		expect(updatedStateSlice).toBeAn('object');
		expect(updatedStateSlice).toEqual({
			moments: [{id:'asdf',hasLiked:false},{id:'xyzzy',hasLiked:true},{id:'aassdf',hasLiked:false}],
			isFetching : false
		});
	})
	it("momentsReducer REFINE_MOMENTS", function() {
		let initState = {
			moments: [],
			isFetching : true

		}
		const moments = {
			moments : [{like:{hasLiked:true},likedUserList:[]},{like:{hasLiked:true},likedUserList:[]},{like:{hasLiked:true},likedUserList:[123]}]
		}
		var asyncData = {moments:moments , userId :123}
		let action = {
			type: "REFINE_MOMENTS",
			data : asyncData
		}

		let updatedStateSlice = momentsReducer(initState, action);
		expect(updatedStateSlice).toBeAn('object');
		expect(updatedStateSlice).toEqual({
			moments: [{like:{hasLiked:true},hasLiked:false,likedUserList:[]},{like:{hasLiked:true},hasLiked:false,likedUserList:[]},{like:{hasLiked:true},hasLiked:true,likedUserList:[123]}],
			isFetching : false
		});
	})

})
