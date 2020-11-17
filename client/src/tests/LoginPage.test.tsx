import { fireEvent, render, RenderResult, wait } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore, {
    MockStoreCreator,
    MockStoreEnhanced,
} from "redux-mock-store";
import LoginPage from "../components/LoginPage";
import HttpClient from "../modules/HttpClient";
import { toggle_loggedIn } from "../reducers/Actions";
import { store } from "../reducers/Reducer";
import { act } from "react-dom/test-utils";

jest.mock("../modules/HttpClient");

const fakeHttpClient = HttpClient as jest.Mocked<typeof HttpClient>;
fakeHttpClient.loginOrCreateUser.mockReturnValue(
    Promise.resolve({ username: "testUser123" })
);

test("LoginPage renders", () => {
    const { container } = render(
        <Provider store={store}>
            <LoginPage />
        </Provider>
    );
    expect(container).toMatchSnapshot();
});

const mockStore: MockStoreCreator = configureStore([]);

describe("My Connected React-Redux Component", () => {
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
    /*
    it("should render with given state from Redux store", () => {
        expect(component.toJSON()).toMatchSnapshot();
    });
*/
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
        });
    });
});
/*
  test('handle login click'), () => {

}
  it('handle home click', () => {
    const { getByRole } = documentBody
    const history = createMemoryHistory()

    fireEvent.click(getByRole('homeButton'));

    expect(history.location.pathname).toBe('/')
  })*/
