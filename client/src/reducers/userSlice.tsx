import { createSlice } from "@reduxjs/toolkit";

// redux komponent som lager en "slice" av store hvor vi kan definere en reducer og actions som handler om en bruker logget inn eller ikke
const loginSlice = createSlice({
  name: "login/logout",
  initialState: { value: false },

  reducers: {
    logIn: (state) => {
      state.value = true;
    },
    logOut: (state) => {
      state.value = false;
    },
  },
});

export const { logIn, logOut } = loginSlice.actions;

export default loginSlice.reducer;

/* These sites are used as src for this code: 
https://codesandbox.io/s/github/reduxjs/redux-essentials-counter-example/tree/master/?from-embed=&file=/src/features/counter/counterSlice.js:49-83
https://redux.js.org/tutorials/essentials/part-2-app-structure */