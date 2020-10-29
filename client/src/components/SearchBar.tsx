import React, {Component, FormEvent} from 'react';

interface Props {
    searchButtonClicked(inputString: string): void;
}

interface State {
    inputString: string;

}

class SearchBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            inputString: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({inputString: event.currentTarget.value},);
    }

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("handleSubmit in searchBar called")
        this.props.searchButtonClicked(this.state.inputString);
    }

    render() {
        return (
            <form className={"search-bar"} onSubmit={this.handleSubmit}>
                <input className={"search-input"} name={"search"} autoFocus placeholder={"Søk i database"} value={this.state.inputString} onChange={this.handleInputChange} tabIndex={0} required/>
                <button className={"search-button"} type={"submit"} value={"submit"} tabIndex={0}>Søk</button>
            </form>

        )
    }



}

export default SearchBar;