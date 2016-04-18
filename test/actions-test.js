import expect from 'expect';
import {
	doSomething,
	registerUser,
	registerRequest,
	registerFail,
	registerSuccess,
	verifyUser,
	verifyFail,
	verifySuccess,
	setErrorMessage,
	fetchMemories,
	likeMoment,
	likeMomentSuccess,
	receiveMemories,
	logOutUser,
	purgeMemories,
	fetchMoments,
	receiveMoments,
	refineMoments,
	purgeMoments,
	purgeUser
} from '../src/actions/actions';

//check if all action creators return the right action type and data


//async actions like registerUser will need asynchronous mocha function  (https://mochajs.org/#asynchronous-code)

describe('actions test suite', function() {

    it('actions registerRequest()', function() {
        expect(registerRequest("asdf")).toEqual({
            type: "REGISTER_REQUEST",
            data: "asdf"
        });
    })
	it('actions registerFail()', function() {
		expect(registerFail("asdf")).toEqual({
			type: "REGISTER_FAIL",
			errMsg: "asdf"
		});
	})
	it('actions logOutUser()', function() {
		expect(logOutUser()).toEqual({
			type: "LOGOUT_USER"

		});
	})
	it('actions fetchMemories()', function() {
		expect(fetchMemories("asdf")).toEqual({
			type: "FETCH_MEMORIES",
			token: "asdf"
		});
	})
	it('actions receiveMemories()', function() {
		expect(receiveMemories("asdf")).toEqual({
			type: "RECEIVE_MEMORIES",
			memories: "asdf"
		});
	})
	it('actions purgeMemories()', function() {
		expect(purgeMemories()).toEqual({
			type: "PURGE_MEMORIES"
		});
	})
	it('actions fetchMoments()', function() {
		expect(fetchMoments('asdf')).toEqual({
			type: "FETCH_MOMENTS",
			data : 'asdf'
		});
	})
	it('actions receiveMoments()', function() {
			expect(receiveMoments([])).toEqual({
				type: 'RECEIVE_MOMENTS',
				data : []
			});
		})
	it('actions purgeMemories()', function() {
				expect(purgeMemories()).toEqual({
					type: "PURGE_MEMORIES"
				});
			})

});
