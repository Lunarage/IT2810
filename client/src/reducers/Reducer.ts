import { toggle_loggedIn, logout, set_username } from "./Actions"
import { createStore } from "@reduxjs/toolkit";

type Actions =
  | ReturnType<typeof toggle_loggedIn>
  | ReturnType<typeof logout>
  | ReturnType<typeof set_username>;

export type AppState = {
    loggedIn: boolean;
    userName?: string | null
};

const initialAppState: AppState = {
    loggedIn: false,
    userName: null,
}

const rootReducer = (state: AppState = initialAppState,  action: Actions) => {
    switch (action.type) {
        case 'TOGGLE_LOGGED_IN':
            return {
                ...state,
                loggedIn: action.payload,
            };
        
        case 'SET_USERNAME':
            return {
                ...state,
                userName: action.payload
            };
        
        case 'LOGOUT':
            return {
                ...state,
                loggedIn: action.payload,
                userName: null
            };
    }
};

const store = createStore(rootReducer)

export default store
    
/*
    {
        login: (state, action) => {
            const baseURL = "http://it2810-22.idi.ntnu.no:3000";
            const client = new HttpClient(baseURL);
            const localStorage = new LocalStorageWrapper();
            localStorage.set("username", action.payload);
            client.createUser(action.payload);
            state.value = true;
            state.username = action.payload;
        },
        logout: (state) => {
            const localStorage = new LocalStorageWrapper();
            localStorage.remove("username");
            state.value = false;
            state.username = null;
        },
    },
});
*/


/* These sites are used as src for this code: 
https://codesandbox.io/s/github/reduxjs/redux-essentials-counter-example/tree/master/?from-embed=&file=/src/features/counter/counterSlice.js:49-83
https://redux.js.org/tutorials/essentials/part-2-app-structure */
