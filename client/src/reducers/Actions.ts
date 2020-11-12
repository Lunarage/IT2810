import HttpClient from "../modules/HttpClient";
import { SessionStorageWrapper, LocalStorageWrapper } from "../modules/Storage";

export const toggle_loggedIn = (boolVal: boolean) => {
    return {
        type: "TOGGLE_LOGGED_IN",
        payload: boolVal
    } as const
};

export const set_username = ( text: string) => {
    return {
        type: "SET_USERNAME",
        payload: text
    } as const
};

export const logout = (boolVal: boolean) => {
    return {
        type: "LOGOUT",
        payload: boolVal
    } as const 
};
