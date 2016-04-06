import expect from 'expect';
//import reducers here
import {
    authReducer
} from '../src/reducers/auth'

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

})
