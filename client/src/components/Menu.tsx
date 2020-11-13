import React from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { logOut } from "../reducers/userSlice";
import { LocalStorage } from "../modules/Storage";

//Dette komponentet returnerer menyknappene øverst på siden, under banneret. den får inn props med logikken til knappene fra App
//Den tar også inn informasjon fra store og viser ulike knapper basert på dette
export const Menu = (props: MenuProps) => {
    //Henter informasjon fra store om en bruker er logget inn og logut action fra userSlice
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.loggedIn)
        .value;

    const onLogoutButtonClicked = () => {
        // Remove username from local storage
        LocalStorage.remove("username");
        dispatch(logOut());
    };
    //if statement for om man skal vise en login eller loggut knapp basert på state
    let button;
    if (isLoggedIn) {
        button = (
            <button className="login-button" onClick={onLogoutButtonClicked}>
                Log out
            </button>
        );
    } else {
        button = (
            <button className="login-button" onClick={props.onLoginPageClick}>
                Log in
            </button>
        );
    }

    return (
        <div className={"site-menu"}>
            <PageButton
                text="Home"
                selected={props.page.homePage}
                onClick={props.onHomePageClick}
                buttonClass="home-button"
            />
            <PageButton
                text="Search"
                selected={props.page.searchPage}
                onClick={props.onSearchPageClick}
                buttonClass="search-button"
            />
            {isLoggedIn && (
                <PageButton
                    text="My Page"
                    selected={props.page.myPage}
                    onClick={props.onMyPageClick}
                    buttonClass="my-page-button"
                />
            )}
            {button}
        </div>
    );
};

const PageButton = (props: ButtonProps) => {
    if (props.selected) {
        return <p>{props.text}</p>;
    } else {
        return (
            <a
                tabIndex={0}
                className={props.buttonClass}
                onClick={props.onClick}
            >
                {props.text}
            </a>
        );
    }
};

export default Menu;

interface MenuProps {
    onHomePageClick(): void;
    onSearchPageClick(): void;
    onMyPageClick(): void;
    onLoginPageClick(): void;
    page: {
        homePage: boolean;
        searchPage: boolean;
        myPage: boolean;
        loginPage: boolean;
    };
}

interface ButtonProps {
    text: string;
    selected: boolean;
    onClick: () => void;
    buttonClass: string;
}

interface State {}
