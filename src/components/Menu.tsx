import React, {Component} from "react";

class Menu extends Component<{}, {}> {
    render() {
        return (
            <div className={"menu"}>
                <a tabIndex={0}>[Søk]</a> <a tabIndex={0}>[Min side]</a>
            </div>
        )
    }

}


export default Menu