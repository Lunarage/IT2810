import React from "react";
import logo from "./logo.svg";
import "./css/App.css";
import Banner from "./components/Banner";
import SearchPage from "./components/SearchPage";
import LoginPage from "./components/LoginPage";
import MyPage from "./components/MyPage";
import Menu from "./components/Menu";
import StartPage from "./components/StartPage";

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      homePage: true,
      searchPage: false,
      myPage: false,
      loginPage: false,
    };
    this.handleHomePageClick = this.handleHomePageClick.bind(this);
    this.handleMyPageClick = this.handleMyPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
    this.handleLoginPageClick = this.handleLoginPageClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }
  /*These functions toggle on click the state of the App, so the page shown changes when the 
  buttons in the menu are pressed, they are passed ass props to the menu button*/

  handleMyPageClick() {
    this.setState({
      homePage: false,
      searchPage: false,
      myPage: true,
      loginPage: false,
    });
  }

  handleSearchPageClick() {
    this.setState({
      homePage: false,
      searchPage: true,
      myPage: false,
      loginPage: false,
    });
  }

  handleHomePageClick() {
    this.setState({
      homePage: true,
      searchPage: false,
      myPage: false,
      loginPage: false,
    });
  }

  handleLoginPageClick() {
    this.setState({
      homePage: false,
      searchPage: false,
      myPage: false,
      loginPage: true,
    });
  }
  
  handleLogoClick() {
    this.setState({
      homePage: true,
      searchPage: false,
      myPage: false,
      loginPage: false,
    });
  }

  render() {
    //The renderPage() function checks the state of App and based on that what should be rendered
    const renderPage = () => {
      if (
        this.state.homePage === false &&
        this.state.searchPage === false &&
        this.state.myPage === true &&
        this.state.loginPage === false
      ) {
        return <MyPage />;
      }
      if (
        this.state.homePage === true &&
        this.state.searchPage === false &&
        this.state.myPage === false &&
        this.state.loginPage === false
      ) {
        return <StartPage />;
      }
      if (
        this.state.homePage === false &&
        this.state.searchPage === true &&
        this.state.myPage === false &&
        this.state.loginPage === false
      ) {
        return <SearchPage />;
      }
      if (
        this.state.homePage === false &&
        this.state.searchPage === false &&
        this.state.myPage === false &&
        this.state.loginPage === true
      ) {
        return <LoginPage />;
      }
    };
    return (
      <div className="app">
        <Banner onLogoClick={this.handleLogoClick} />
        <Menu
          onMyPageClick={this.handleMyPageClick}
          onHomePageClick={this.handleHomePageClick}
          onSearchPageClick={this.handleSearchPageClick}
          onLoginPageClick={this.handleLoginPageClick}
        />
        <div className={"content"}>{renderPage()}</div>
      </div>
    );
  }
}

export default App;

interface Props {}

interface State {
  homePage: boolean;
  searchPage: boolean;
  myPage: boolean;
  loginPage: boolean;
}
