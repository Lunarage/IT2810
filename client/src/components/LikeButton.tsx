import React from "react";
import { Button, Icon } from "semantic-ui-react";

type LikeButtonProps = {
  liked: boolean;
  handleClick?: () => void;
};

const LikeButton = (props: LikeButtonProps) => {
  if (props.liked) {
    return (
      <Button onClick={props.handleClick} icon>
        <Icon name="heart" />
      </Button>
    );
  } else {
    return (
      <Button onClick={props.handleClick} icon>
        <Icon name="heart outline" />
      </Button>
    );
  }
};

export default LikeButton;
