import { toggle_loggedIn, logout, set_username } from "./Actions"
import { createStore, Store } from "redux";

type Actions =
  | ReturnType<typeof toggle_loggedIn>
  | ReturnType<typeof logout>
  | ReturnType<typeof set_username>;

export type AppState = {
    loggedIn: boolean;
    userName?: string | null;
};

const initialAppState: AppState = {
    loggedIn: false,
    userName: null,
};

export const rootReducer = (state: AppState = initialAppState,  action: Actions) => {
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
        default:
            return state
    }
};

function configureStore(): Store<AppState> {
    return createStore(
      rootReducer,
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    );
  }

export const store = configureStore()

console.log(store.getState)


/* These sites are used as src for this code: 
https://codesandbox.io/s/github/reduxjs/redux-essentials-counter-example/tree/master/?from-embed=&file=/src/features/counter/counterSlice.js:49-83
https://redux.js.org/tutorials/essentials/part-2-app-structure */
