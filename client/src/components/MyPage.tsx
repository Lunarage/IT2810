import React from "react";
import LikedMoviesTable from "./LikedMoviesTable";
import { useSelector, RootStateOrAny } from "react-redux";
import { AppState } from "../reducers/Reducer";

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
