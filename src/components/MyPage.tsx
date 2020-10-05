import React, {Component} from 'react';



class MyPage extends Component<{}, {}> {
    render() {
        return (
            <div className={"my-page"}>
                <h2 className={"my-page-title"}>{"Min side"}</h2>
                <h3>Lagrede søk</h3>
                <div className={"saved-searches"}>
                    <ul>Lagret søk nr 1</ul>
                    <ul>Lagret søk nr 2</ul>
                    <ul>Lagret søk nr 3</ul>
                    <ul>Lagret søk nr 4</ul>
                </div>
            </div>
        )
    }


}

export default MyPage;