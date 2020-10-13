import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Banner from "./components/Banner";
import SearchPage from "./components/SearchPage";
import LoginPage from "./components/LoginPage";
import MyPage from "./components/MyPage";
import Menu from "./components/Menu";
import StartPage from "./components/StartPage";


function App() {
    return (
        <div className="app">
            <Banner/>
            <Menu/>
            <div className={"content"}>
                <StartPage/>
                <SearchPage/>
                <LoginPage/>
                <MyPage/>
            </div>
        </div>
    );
}

export default App;
