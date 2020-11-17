import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../reducers/Reducer";
import LikedMoviesTable from "./LikedMoviesTable";

const Mypage = () => {
    const username = useSelector((state: AppState) => state.userName);

    const render = () => {
        if (username) {
            return (
                <div className={"my-page"}>
                    <h2 className={"my-page-title"}>{"Min side"}</h2>
                    <h3>Lagrede søk</h3>
                    <LikedMoviesTable username={username} />
                </div>
            );
        } else {
            return <p>Hvordan kom du deg hit?</p>;
        }
    };
    return render();
};

export default Mypage;
