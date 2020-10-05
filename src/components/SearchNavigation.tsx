import React, {Component} from 'react';



class SearchNavigation extends Component<{}, {}> {
    render() {
        return (
            <div className={"search-navigation"}>
                <a tabIndex={0}>1</a> <a tabIndex={0}>2</a> <a tabIndex={0}>3</a> <a tabIndex={0}>4</a> <a tabIndex={0}>5</a> <a tabIndex={0}>Neste</a>
            </div>

        )
    }


}

export default SearchNavigation;