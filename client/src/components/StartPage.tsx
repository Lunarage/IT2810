import React, { Component } from "react";

class StartPage extends Component<{}, {}> {
    render() {
        return <div className={"start-page"}>
            <h2 className="welcome">Welcome!</h2>

            <p className="welcome-p">This website gives you the oppurtunity to search in over 7.2 million movies,
                TV-series and other film media</p>

            <h3 className="how-to-use">How to use?</h3>

            <p className="how-to-use-p">In the search section of webpage you can type in any word or title of a movie
                and will get all the matches from the database.
                you can also like your favorite movies if you are logged in. When you are logged in, myPage will appear
                on the site and here you
                can see all your liked movies and shows.</p>

            <p className="how-to-use-p">To log in you can either write user1 in the username field and see an example of
                a user with data, or you can write any other name in the user
                field and make your own data. Password is not required.</p>

        </div>;
    }
}

export default StartPage;
