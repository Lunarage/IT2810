import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { logIn } from "./reducers/userSlice";
import { LocalStorageWrapper, SessionStorageWrapper } from "./modules/Storage";
import "./css/App.css";
import Banner from "./components/Banner";
import SearchPage from "./components/SearchPage";
import LoginPage from "./components/LoginPage";
import MyPage from "./components/MyPage";
import Menu from "./components/Menu";
import StartPage from "./components/StartPage";

const App = () => {
    // Set initial state
    const [state, setState] = useState<State>({
        currentPage: "home",
    });

    // Setup Redux store and actions
    const dispatch = useDispatch();
    const userStore = useSelector((state: RootStateOrAny) => state.loggedIn);
    const loggedIn = userStore.value;
    const username = userStore.username;

    // Set up use of local storage
    const localStorage = new LocalStorageWrapper();

    // Log in with same user as last time
    useEffect(() => {
        if (!loggedIn || username == null) {
            if (localStorage.get("username")) {
                dispatch(logIn(localStorage.get("username")));
            }
        }
    });

    /*These functions toggle on click the state of the App, so the page shown changes when the
    buttons in the menu are pressed, they are passed ass props to the menu button*/
    const handleMyPageClick = () => {
        setState({ currentPage: "my" });
    };

    const handleSearchPageClick = () => {
        setState({ currentPage: "search" });
    };

    const handleHomePageClick = () => {
        setState({ currentPage: "home" });
    };

    const handleLoginPageClick = () => {
        setState({ currentPage: "login" });
    };

    const handleLogoClick = () => {
        setState({ currentPage: "home" });
    };

    const handleLogoutClick = () => {
        setState({ currentPage: "home" });
    };

    //The renderPage() function checks the state of App and based on that what should be rendered
    const renderPage = () => {
        switch (state.currentPage) {
            case "home":
                return <StartPage />;
            case "search":
                return <SearchPage />;
            case "my":
                return <MyPage />;
            case "login":
                return <LoginPage />;
        }
    };
    return (
        <div className="app">
            <Banner onLogoClick={handleLogoClick} />
            <Menu
                currentPage={state.currentPage}
                onMyPageClick={handleMyPageClick}
                onHomePageClick={handleHomePageClick}
                onSearchPageClick={handleSearchPageClick}
                onLoginPageClick={handleLoginPageClick}
                onLogoutClick={handleLogoutClick}
            />
            <div className={"content"}>{renderPage()}</div>
        </div>
    );
};

export default App;

interface Props {}

interface State {
    currentPage: "home" | "search" | "my" | "login";
}
