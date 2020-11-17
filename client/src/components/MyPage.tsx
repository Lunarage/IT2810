import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../reducers/Reducer";
import LikedMoviesTable from "./LikedMoviesTable";

const MyPage = () => {
    const username = useSelector((state: AppState) => state.userName);

    const render = () => {
        if (username) {
            return (
                <div className={"my-page"}>
                    <h2 className={"my-page-title"}>{"My page"}</h2>
                    <h3>{username + "s saved searches:"}</h3>
                    <LikedMoviesTable />
                </div>
            );
        } else {
            return <p>How did you even get here??</p>;
        }
    };
    return render();
};

export default MyPage;
