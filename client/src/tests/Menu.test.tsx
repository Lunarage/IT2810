import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore, { MockStoreCreator } from "redux-mock-store";
import Menu from "../components/Menu";
import { logout } from "../reducers/Actions";

// Mock handle functions
const handleMyPageClick = jest.fn();
const handleSearchPageClick = jest.fn();
const handleHomePageClick = jest.fn();
const handleLoginPageClick = jest.fn();
const handleLogoutClick = jest.fn();

// Create a mock of the redux store
const mockStore: MockStoreCreator = configureStore([]);

describe("Menu snapshots", () => {
    it("Menu renders correctly when not logged in", () => {
        // Initialize mockStore with a state
        const store = mockStore({
            loggedIn: false,
            userName: null,
        });

        // Render the page, and store it in a variable
        const component = render(
            <Provider store={store}>
                <Menu
                    onHomePageClick={handleHomePageClick}
                    onSearchPageClick={handleSearchPageClick}
                    onMyPageClick={handleMyPageClick}
                    onLoginPageClick={handleLoginPageClick}
                    onLogoutClick={handleLogoutClick}
                    currentPage="home"
                />
            </Provider>
        );
        expect(component).toMatchSnapshot();
    });
    it("Menu renders correctly when logged in", () => {
        // Initialize mockStore with a state
        const store = mockStore({
            loggedIn: true,
            userName: "FooBar",
        });

        // Render the page, and store it in a variable
        const component = render(
            <Provider store={store}>
                <Menu
                    onHomePageClick={handleHomePageClick}
                    onSearchPageClick={handleSearchPageClick}
                    onMyPageClick={handleMyPageClick}
                    onLoginPageClick={handleLoginPageClick}
                    onLogoutClick={handleLogoutClick}
                    currentPage="home"
                />
            </Provider>
        );
        expect(component).toMatchSnapshot();
    });
});

describe("Menu handles events", () => {
    it("Calls functions on navigaion links when not logged in", () => {
        // Initialize mockStore with a state
        const store = mockStore({
            loggedIn: false,
            userName: null,
        });

        // Render the component
        const component = render(
            <Provider store={store}>
                <Menu
                    onHomePageClick={handleHomePageClick}
                    onSearchPageClick={handleSearchPageClick}
                    onMyPageClick={handleMyPageClick}
                    onLoginPageClick={handleLoginPageClick}
                    onLogoutClick={handleLogoutClick}
                    currentPage="login"
                />
            </Provider>
        );

        // Click Home
        fireEvent.click(
            component.getByText("Home"),
            new MouseEvent("click", { bubbles: true })
        );
        // Check if handleHomePageClick is called
        expect(handleHomePageClick).toHaveBeenCalled();
        // Click Search
        fireEvent.click(
            component.getByText("Search"),
            new MouseEvent("click", { bubbles: true })
        );
        // Check if handleSearchPageClick is called
        expect(handleSearchPageClick).toHaveBeenCalled();
        // Click Log In
        fireEvent.click(
            component.getByText("Log in"),
            new MouseEvent("click", { bubbles: true })
        );
        // Check if handleLoginPageClick is called
        expect(handleLoginPageClick).toBeCalled();
    });
    it("Calls functions on navigaion links when logged in", () => {
        // Initialize mockStore with a state
        const store = mockStore({
            loggedIn: true,
            userName: "FooBar",
        });

        // Mock the dispatch function
        store.dispatch = jest.fn();

        // Render the component
        const component = render(
            <Provider store={store}>
                <Menu
                    onHomePageClick={handleHomePageClick}
                    onSearchPageClick={handleSearchPageClick}
                    onMyPageClick={handleMyPageClick}
                    onLoginPageClick={handleLoginPageClick}
                    onLogoutClick={handleLogoutClick}
                    currentPage="login"
                />
            </Provider>
        );

        // Click Home
        fireEvent.click(
            component.getByText("Home"),
            new MouseEvent("click", { bubbles: true })
        );
        // Check if handleHomePageClick is called
        expect(handleHomePageClick).toHaveBeenCalled();
        // Click Search
        fireEvent.click(
            component.getByText("Search"),
            new MouseEvent("click", { bubbles: true })
        );
        // Check if handleSearchPageClick is called
        expect(handleSearchPageClick).toHaveBeenCalled();
        // Click My Page
        fireEvent.click(
            component.getByText("My Page"),
            new MouseEvent("click", { bubbles: true })
        );
        // Check if handleMyPageClick is called
        expect(handleMyPageClick).toHaveBeenCalled();
        // Click Log out
        fireEvent.click(
            component.getByText("Log out"),
            new MouseEvent("click", { bubbles: true })
        );
        // Check if logout has been dispatched
        expect(store.dispatch).toHaveBeenCalledWith(logout());
        // Check if handleLogoutClick has been called
        expect(handleLogoutClick).toBeCalled();
    });
});
