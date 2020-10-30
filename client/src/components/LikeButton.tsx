import React from "react";
import {Button, Icon} from "semantic-ui-react";
import {RootStateOrAny, useSelector} from "react-redux";

type LikeButtonProps = {
    liked: boolean;
    handleClick: (movieID: string, username: string, liked: boolean) => void;
    movieID: string;
    disabled: boolean;
};


const LikeButton = (props: LikeButtonProps) => {
    const username = useSelector((state: RootStateOrAny) => state.loggedIn)
        .username;

    // localHandleClick calls handleClick with arguments when button is clicked.
    const localHandleClick = () => {
        props.handleClick(props.movieID, username, props.liked);
    }

    if (props.liked) {
        return (
            <Button disabled={props.disabled} onClick={localHandleClick} icon>
                <Icon name="heart"/>
            </Button>
        );
    } else {
        return (
            <Button onClick={localHandleClick} icon>
                <Icon name="heart outline"/>
            </Button>
        );
    }

};


export default LikeButton;
