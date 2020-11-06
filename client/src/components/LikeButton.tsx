import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { RootStateOrAny, useSelector } from "react-redux";
import HttpClient from "../modules/HttpClient";

type LikeButtonProps = {
    liked: boolean;
    handleClick: (movieID: string, username: string, liked: boolean) => void;
    movieID: string;
    disabled: boolean;
};

type State = {
    likedStatus: boolean;
}

const LikeButton = (props: LikeButtonProps) => {
    const [state, setState] = useState<State>({
        likedStatus: props.liked,
    });

    // Henter username fra redux
    const username = useSelector((state: RootStateOrAny) => state.loggedIn).username;

    // localHandleClick calls handleClick with arguments when button is clicked.
    const localHandleClick = () => {
        // Kaller handleClick i ResultTableAccordion
        props.handleClick(props.movieID, username, state.likedStatus);

        // Set opp kopling mot databasen
        const baseURL = "http://it2810-22.idi.ntnu.no:3000";
        const client = new HttpClient(baseURL);

        // Spør databasen
        const result = client.getMovie(props.movieID, username);

        console.log(result);
        // Sett state hos SearchResult
        result.then((response) => {
            setState({ likedStatus: response.liked });
        });
    };


    const returnButton = () => {
        if (state.likedStatus) {
            return (
                <Button id={"like-button"} disabled={props.disabled} onClick={localHandleClick} icon>
                    <div className={"heart-icon-container"}>
                        <Icon id={"heart-icon"} name="heart" />
                    </div>
                </Button>
            );
        } else {
            return (
                <Button id={"like-button"} onClick={localHandleClick} icon>
                    <div className={"heart-icon-container"}>
                        <Icon id={"heart-icon"} name="heart outline" />
                    </div>
                </Button>
            );
        }
    };

    return (
        returnButton()
    );
};


export default LikeButton;
