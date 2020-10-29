import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { logIn } from "./reducers/userSlice";
import { LocalStorageWrapper, SessionStorageWrapper } from "./modules/Storage";
import logo from "./logo.svg";
import "./css/App.css";
import Banner from "./components/Banner";
import SearchPage from "./components/SearchPage";
import LoginPage from "./components/LoginPage";
import MyPage from "./components/MyPage";
import Menu from "./components/Menu";
import StartPage from "./components/StartPage";

const App = () => {
  const [state, setState] = useState<State>({
    homePage: true,
    searchPage: false,
    myPage: false,
    loginPage: false,
  });

  const dispatch = useDispatch();
  const { loggedIn, username } = useSelector(
    (state: RootStateOrAny) => state.loggedIn
  );
  const localStorage = new LocalStorageWrapper();

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
    setState({
      homePage: false,
      searchPage: false,
      myPage: true,
      loginPage: false,
    });
  };

  const handleSearchPageClick = () => {
    setState({
      homePage: false,
      searchPage: true,
      myPage: false,
      loginPage: false,
    });
  };

  const handleHomePageClick = () => {
    setState({
      homePage: true,
      searchPage: false,
      myPage: false,
      loginPage: false,
    });
  };

  const handleLoginPageClick = () => {
    setState({
      homePage: false,
      searchPage: false,
      myPage: false,
      loginPage: true,
    });
  };

  const handleLogoClick = () => {
    setState({
      homePage: true,
      searchPage: false,
      myPage: false,
      loginPage: false,
    });
  };

  //The renderPage() function checks the state of App and based on that what should be rendered
  const renderPage = () => {
    if (
      state.homePage === false &&
      state.searchPage === false &&
      state.myPage === true &&
      state.loginPage === false
    ) {
      return <MyPage />;
    }
    if (
      state.homePage === true &&
      state.searchPage === false &&
      state.myPage === false &&
      state.loginPage === false
    ) {
      return <StartPage />;
    }
    if (
      state.homePage === false &&
      state.searchPage === true &&
      state.myPage === false &&
      state.loginPage === false
    ) {
      return <SearchPage />;
    }
    if (
      state.homePage === false &&
      state.searchPage === false &&
      state.myPage === false &&
      state.loginPage === true
    ) {
      return <LoginPage />;
    }
  };
  return (
    <div className="app">
      <Banner onLogoClick={handleLogoClick} />
      <Menu
        onMyPageClick={handleMyPageClick}
        onHomePageClick={handleHomePageClick}
        onSearchPageClick={handleSearchPageClick}
        onLoginPageClick={handleLoginPageClick}
      />
      <div className={"content"}>{renderPage()}</div>
    </div>
  );
};

export default App;

interface Props {}

interface State {
  homePage: boolean;
  searchPage: boolean;
  myPage: boolean;
  loginPage: boolean;
}
