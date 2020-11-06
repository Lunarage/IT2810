import React from "react";
import LikedMoviesTable from "./LikedMoviesTable";
import { useSelector, RootStateOrAny } from "react-redux";


const Mypage = () => {

    const username = useSelector((state: RootStateOrAny) => state.loggedIn)
        .username;

    return (
        <div className={"my-page"}>
            <h2 className={"my-page-title"}>{"Min side"}</h2>
            <h3>Lagrede søk</h3>
            <LikedMoviesTable username={username} />
        </div>
    );
};

export default Mypage;


