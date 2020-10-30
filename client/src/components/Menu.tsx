import React from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { logOut } from "../reducers/userSlice";

//Dette komponentet returnerer menyknappene øverst på siden, under banneret. den får inn props med logikken til knappene fra App
//Den tar også inn informasjon fra store og viser ulike knapper basert på dette
export const Menu = (props: Props) => {
  //Henter informasjon fra store om en bruker er logget inn og logut action fra userSlice
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootStateOrAny) => state.loggedIn)
    .value;

  const onLogoutButtonClicked = () => {
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
    <div className={"menu"}>
      <a tabIndex={0} className="home-button" onClick={props.onHomePageClick}>
        [Home]
      </a>
      <a
        tabIndex={0}
        className="search-button"
        onClick={props.onSearchPageClick}
      >
        [Search]
      </a>
      {button}
      {isLoggedIn === true && (
        <a
          tabIndex={0}
          className="my-page-button"
          onClick={props.onMyPageClick}
        >
          [My page]
        </a>
      )}
    </div>
  );
};

export default Menu;

interface Props {
  onHomePageClick(): void;
  onSearchPageClick(): void;
  onMyPageClick(): void;
  onLoginPageClick(): void;
}

interface State {}
