import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";
import HttpClient from "../modules/HttpClient";
import { Like } from "../types/DatabaseTypes";
import { AppState } from "../reducers/Reducer";

type LikeButtonProps = {
    movieID: string;
};

type State = {
    likedStatus: boolean;
};

type StateDisabled = {
    disabled: boolean;
}

const LikeButton = (props: LikeButtonProps) => {
    // Setting initial state "likedStatus" to false.
    // likedStatus is later updated from database.
    const [state, setState] = useState<State>({
        likedStatus: false,
    });

    // Setting initial state "disabled" to true.
    // disabled is set to true when likedStatus is updated from database..
    const [stateDisabled, setStateDisabled] = useState<StateDisabled>({
            disabled: true,
        },
    );

    // Getting username from redux. Username is of type "string"|null|undefined,
    // this will be handled in handleClick.
    const username = useSelector((state: AppState) => state.userName);

    // Updating state when promise is returned
    const getLikedStatus = () => {
        if (username) {
            HttpClient.getMovie(props.movieID, username).then((response) => {
                setState({ likedStatus: response.liked });
                setStateDisabled({ disabled: false });
            });
        }
    };

    // useEffect runs additional code after react has updated the DOM
    // The empty list-argument ("deps", dependencies) makes sure
    // the function ("effect") is run only once.
    useEffect(() => {

        // If button is disabled (initial state)
        if (stateDisabled) {
            // Call getLikedStatus sets correct likedStatus, and sets disabled to false.
            getLikedStatus();
        }
    }, []);

    // handleClick likes/unlikes a movie (movieID) in the database, and updates state.likedStatus
    const handleClick = () => {
        // updateLikedStatus takes response of type Like
        // and updates state.LikedState with the boolean Like.liked-value.
        const updateLikedStatus = (response: Like) => {
            setState({ likedStatus: response.liked });
        };

        // likedStatus should only be updated if a user is logged in
        // -> when username is a string.
        if (username) {

            // Communicating with database. If movie is liked: dislike, else like.
            // Waiting for Promise to get resolved, then calling updateLikedStatus.
            if (state.likedStatus) {
                HttpClient.unlikeMovie(props.movieID, username).then((response) => {
                    updateLikedStatus(response);
                });
            } else {
                HttpClient.likeMovie(props.movieID, username).then((response) => {
                    updateLikedStatus(response);
                });
            }
        } else {
            // No user is logged in, the LikeButton should not even be reachable,
            // but handleClick is called.
            console.log("How did you manage to reach LikeButton without being logged in???");
        }
    };

    // chooseHeartIcon returns "heart" if state.likedStatus is true,
    // and "heart outline" if the movie is not liked.
    const chooseHeartIcon = () => {
        if (state.likedStatus) {
            return "heart";
        } else {
            return "heart outline";
        }
    };

    // Returning Liked-button.
    // the Icon selected with chooseHeartIcon(), based on state.likedStatus
    const returnButton = () => {
        //getLikedStatus();
        return (
            <button
                id={"like-button"}
                disabled={stateDisabled.disabled}
                onClick={handleClick}
            >
                <div className={"heart-icon-container"}>
                    <Icon id={"heart-icon"} name={chooseHeartIcon()} />
                </div>
            </button>
        );
    };

    return returnButton();
};

export default LikeButton;
