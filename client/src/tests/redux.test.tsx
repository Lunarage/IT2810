import { rootReducer } from "../reducers/Reducer";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);

//Test for initial state, has a TypeScript error, but the test still works as expected
//Eventhough there is a TypeScript error, the reducer has a default and returns state as expected
test("Initial state", () => {
  let state;
  state = rootReducer(
      undefined,
      { }
  );
  expect(state).toEqual({
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
  });
});

test("toggle loggedIn", () => {
    let state;
    state = rootReducer(
        {
            loggedIn: false,
            userName: "Molly",
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
        },
        { type: "TOGGLE_LOGGED_IN", payload: true }
    );
    expect(state).toEqual({
        loggedIn: true,
        userName: "Molly",
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
    });
});

test("logout", () => {
    let state;
    state = rootReducer(
        {
            loggedIn: true,
            userName: "Molly",
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
        },
        { type: "LOGOUT", payload: false}
    );
    expect(state).toEqual({
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
    });
});

test("set_userName", () => {
    let state;
    state = rootReducer(
        {
            loggedIn: true,
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
        },
        { type: "SET_USERNAME", payload: "Molly" }
    );
    expect(state).toEqual({
        loggedIn: true,
        userName: "Molly",
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
    });
});

