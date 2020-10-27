import React, {Component} from 'react';
import TableExampleSelecttableRow from "./ResultTable";
import TableAccordionExample from "./ResultTable";
import AccordionExampleStandardShorthand from "./ResultAccordion";
import ResultTable from "./ResultTableAccordion2";
import ResultAccordionTable from "./ResultTableAccordion";

class SearchResult extends Component<{}, {}> {
    render() {
        return (
            <div className={"search-result"}>
                <h2>Søkeresultat:</h2>
                <TableExampleSelecttableRow></TableExampleSelecttableRow>
                <ResultAccordionTable/>
                <ResultTable/>
            </div>

        )
    }


}

export default SearchResult;

