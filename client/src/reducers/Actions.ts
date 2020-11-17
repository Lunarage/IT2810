import { StoreSearchState } from "./Reducer";

//Actions for redux
//Toggle logged inn takes a true/false argument and sends it to state
export const toggle_loggedIn = (boolVal: boolean) => {
    return {
        type: "TOGGLE_LOGGED_IN",
        payload: boolVal,
    } as const;
};
//set_username takes a string argument and sends it to state
export const set_username = (text: string) => {
    return {
        type: "SET_USERNAME",
        payload: text,
    } as const;
};
//logout sets state to false
export const logout = () => {
    return {
        type: "LOGOUT",
        payload: false,
    } as const;
};
//set search state
export const setStoreSearchState = (searchState: StoreSearchState) => {
    return {
        type: "SET_SEARCH_STATE",
        payload: searchState,
    } as const;
};
