import { toggle_loggedIn, logout, set_username } from "./Actions";
import { createStore, Store } from "redux";

type Actions =
    | ReturnType<typeof toggle_loggedIn>
    | ReturnType<typeof logout>
    | ReturnType<typeof set_username>;

//Creates the types AppState
export type AppState = {
    loggedIn: boolean;
    userName?: string | null;
};
//Sets initial root state for the app
const initialAppState: AppState = {
    loggedIn: false,
    userName: null,
};
//Root reducer for the App, handels the states loggedIn/Loggedout and userName
export const rootReducer = (
    state: AppState = initialAppState,
    action: Actions
) => {
    switch (action.type) {
        case "TOGGLE_LOGGED_IN":
            return {
                ...state,
                loggedIn: action.payload,
            };

        case "SET_USERNAME":
            return {
                ...state,
                userName: action.payload,
            };

        case "LOGOUT":
            return {
                ...state,
                loggedIn: action.payload,
                userName: null,
            };
        default:
            return state;
    }
};
//Creating store
function configureStore(): Store<AppState> {
    return createStore(
        rootReducer,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
}

//Oppretter en store
export const store = configureStore();
