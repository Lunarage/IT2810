import { createSlice } from "@reduxjs/toolkit";
import HttpClient from "../modules/HttpClient";
import { SessionStorageWrapper, LocalStorageWrapper } from "../modules/Storage";

// redux komponent som lager en "slice" av store hvor vi kan definere en reducer og actions som handler om en bruker logget inn eller ikke
const loginSlice = createSlice({
    name: "login/logout",
    initialState: { value: false, username: null },

    reducers: {
        logIn: (state, action) => {
            const baseURL = "http://it2810-22.idi.ntnu.no:3000";
            const client = new HttpClient(baseURL);
            const localStorage = new LocalStorageWrapper();
            localStorage.set("username", action.payload);
            client.createUser(action.payload);
            state.value = true;
            state.username = action.payload;
        },
        logOut: (state) => {
            const localStorage = new LocalStorageWrapper();
            localStorage.remove("username");
            state.value = false;
            state.username = null;
        },
    },
});

export const { logIn, logOut } = loginSlice.actions;

export default loginSlice.reducer;

/* These sites are used as src for this code: 
https://codesandbox.io/s/github/reduxjs/redux-essentials-counter-example/tree/master/?from-embed=&file=/src/features/counter/counterSlice.js:49-83
https://redux.js.org/tutorials/essentials/part-2-app-structure */
