import expect from 'expect';
import {
    doSomething,
    registerRequest,
    registerFail,
    registerSuccess,
    verifyUser,
    verifyFail,
    verifySuccess
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

});
