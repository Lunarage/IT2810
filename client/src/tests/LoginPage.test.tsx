import { fireEvent, render, RenderResult, wait } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore, {
    MockStoreCreator,
    MockStoreEnhanced,
} from "redux-mock-store";
import LoginPage from "../components/LoginPage";
import HttpClient from "../modules/HttpClient";
import { toggle_loggedIn, set_username } from "../reducers/Actions";
import { store } from "../reducers/Reducer";
import { act } from "react-dom/test-utils";

// Mock HttpClient module
jest.mock("../modules/HttpClient");
// Create a fake HttpClient
const fakeHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;
// Mock the relevant method in HttpClient to always resolve with test data
fakeHttpClient.loginOrCreateUser.mockReturnValue(
    Promise.resolve({ username: "testUser123" })
);

// Simple test to check that login page renders correctly,
// checked against a snapshot
test("LoginPage renders", () => {
    const { container } = render(
        <Provider store={store}>
            <LoginPage />
        </Provider>
    );
    expect(container).toMatchSnapshot();
});

// Create a mock of the redux store
const mockStore: MockStoreCreator = configureStore([]);

describe("LoginPage handles", () => {
    // Variables to hold mocked redux store and the render of the component
    let store: MockStoreEnhanced;
    let component: RenderResult;

    beforeEach(() => {
        // Initialize mockStore with initial state
        store = mockStore({
            LoggedIn: false,
            userName: null,
        });

        // Mock the dispatch function
        store.dispatch = jest.fn();

        // Render the page, and store it in a variable
        component = render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        );
    });

    it("should dispatch an action on handle submit", async () => {
        // Find the input field
        const input = component.getByPlaceholderText(
            "OlaNordmann"
        ) as HTMLInputElement;
        // Type in test username
        fireEvent.change(input, { target: { value: "testUser123" } });
        // Find the submit button and click it
        fireEvent.click(
            component.getByRole("button"),
            new MouseEvent("click", { bubbles: true })
        );
        // Because the implementation uses asynchronous
        // we have to wait for the operation to finish.
        // In this case it is the calls to HttpClient.
        // They return Promises, which are asynchronous.
        await wait(() => {
            // The implementation of handleSubmit calls dispatch 2 times.
            expect(store.dispatch).toHaveBeenCalledTimes(2);
            expect(store.dispatch).toHaveBeenCalledWith(toggle_loggedIn(true));
            expect(store.dispatch).toHaveBeenCalledWith(
                set_username("testUser123")
            );
        });
    });
});
