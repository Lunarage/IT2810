import {
    toggle_loggedIn,
    logout,
    set_username,
    setStoreSearchState,
} from "./Actions";
import { createStore, Store } from "redux";
import { Movie } from "../types/DatabaseTypes";

type Actions =
    | ReturnType<typeof toggle_loggedIn>
    | ReturnType<typeof logout>
    | ReturnType<typeof set_username>
    | ReturnType<typeof setStoreSearchState>;

// The type for holding search information and result
export type StoreSearchState = {
    inputSearch: string;
    inputOrderDir: "ASC" | "DESC";
    inputTitleType: string;
    pageActivePage: number;
    pageTotalPages: number;
    pageDisabled: boolean;
    searchStatus: "none" | "waiting" | "success" | "failure";
    searchErrorMessage: string | null;
    searchMovies: Movie[];
};

//Creates the types AppState
export type AppState = {
    loggedIn: boolean;
    userName?: string | null;
    searchState: StoreSearchState;
};

//Sets initial root state for the app
const initialAppState: AppState = {
    loggedIn: false,
    userName: null,
    searchState: {
        inputSearch: "",
        inputOrderDir: "ASC",
        inputTitleType: "",
        pageActivePage: 1,
        pageTotalPages: 2,
        pageDisabled: false,
        searchStatus: "none",
        searchErrorMessage: null,
        searchMovies: [],
    },
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
        case "SET_SEARCH_STATE":
            return {
                ...state,
                searchState: action.payload,
            };
        default:
            return state;
    }
};
//Configure store
function configureStore(): Store<AppState> {
    return createStore(
        rootReducer,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
}

//Create and exports store
export const store = configureStore();
