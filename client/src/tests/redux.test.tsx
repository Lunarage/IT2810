import { rootReducer } from "../reducers/Reducer";
import { cleanup } from "@testing-library/react";
 
afterEach(cleanup);

//Test for initial state, has a TypeScript error, but the test still works as expected
test('Initial state', () => {
    let state;
    state = rootReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({loggedIn:false,userName:null});
  });


test('logout', () => {
    let state;
    state = rootReducer({loggedIn:true,userName:'Molly'}, {type:'LOGOUT',payload:false});
    expect(state).toEqual({loggedIn:false,userName:null});
});

test('set_userName', () => {
    let state;
    state = rootReducer({loggedIn:true,userName:null}, {type:'SET_USERNAME',payload:'Molly'});
    expect(state).toEqual({loggedIn:true,userName:'Molly'});
  });

test('toggle_loggedIn', () => {
    let state;
    state = rootReducer({loggedIn:false,userName:'Molly'}, {type:'TOGGLE_LOGGED_IN',payload:true});
    expect(state).toEqual({loggedIn:true,userName:'Molly'});
  });

