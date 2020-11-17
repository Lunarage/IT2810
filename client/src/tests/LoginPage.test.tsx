import { render, fireEvent } from "@testing-library/react";
import LoginPage from "../components/LoginPage";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../reducers/Reducer";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { toggle_loggedIn } from "../reducers/Actions";

test("LoginPage renders", () => {
    const { container } = render(
        <Provider store={store}>
            <LoginPage />
        </Provider>
    );
    expect(container).toMatchSnapshot();
});

const mockStore = configureStore([]);

describe("My Connected React-Redux Component", () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({
            LoggedIn: false,
            userName: null,
        });

        store.dispatch = jest.fn();

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
    it("should dispatch an action on handle submit", () => {
        renderer.act(() => {
            const button = component.root.findByType("button");
            fireEvent.click(button)
        });

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(toggle_loggedIn(true));
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
