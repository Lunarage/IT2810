import React, {Component} from 'react';
import TableExampleSelecttableRow from "./ResultTable";

class SearchResult extends Component<{}, {}> {
    render() {
        return (
            <div className={"search-result"}>
                <h2>Søkeresultat:</h2>
                <TableExampleSelecttableRow></TableExampleSelecttableRow>
            </div>

        )
    }


}

export default SearchResult;

