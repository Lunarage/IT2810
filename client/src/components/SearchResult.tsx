import React, {Component} from 'react';
import ResultTableAccordion from "./ResultTableAccordion";

class SearchResult extends Component<{}, {}> {
    render() {
        return (
            <div className={"search-result"}>
                <h2>Søkeresultat:</h2>
                <ResultTableAccordion/>
            </div>

        )
    }


}

export default SearchResult;

