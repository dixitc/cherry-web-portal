import expect from 'expect';
//import reducers here
import { authReducer } from '../src/reducers/auth';
import { memoriesReducer } from '../src/reducers/memoriesReducer';
import { momentsReducer } from '../src/reducers/momentsReducer';

//todo : then this into a dynamic test generator
//check if the reducers returns are as expected when passed in different actions
describe("authReducer test suite", function() {
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
				memories : [1,2,3]
			}

		}
		let updatedStateSlice = memoriesReducer(initState, action);
		expect(updatedStateSlice).toBeAn('object');
		expect(updatedStateSlice).toEqual({
			memories: [1,2,3],
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

})
