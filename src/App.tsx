import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Banner from "./components/Banner";
import SearchPage from "./components/SearchPage";
import LoginPage from "./components/LoginPage";
import MyPage from "./components/MyPage";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Banner/>
            </header>
            <body>
                <SearchPage/>
                <LoginPage/>
                <MyPage/>
            </body>
        </div>
    );
}

export default App;
