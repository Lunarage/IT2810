import React, {Component} from 'react';

class SearchResult extends Component<{}, {}> {
    render() {
        return (
            <div className={"search-result"}>
                <h2>Søkeresultat:</h2>
                <div className={"result-list"}>
                    <ul>Første treff</ul>
                    <ul>Andre treff</ul>
                    <ul>Tredje treff</ul>
                </div>
            </div>

        )
    }


}

export default SearchResult;