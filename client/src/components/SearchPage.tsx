import React, { Component } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import SearchNavigation from "./SearchNavigation";
import HttpClient from "../modules/HttpClient";
import { Movie } from "../types/DatabaseTypes";

interface Props {}

interface State {
  searchInput: string | null;
  orderDir: string | null;
  titleType: string | null;
}

/* SearchPage en tilsatnd (state) som mottar argumenter fra SearchBar når input sendes inn der ("search").
 * Tilstanden sendes som prop til SearchResult, og brukes der til å hente søkeresultat.
 * searchButtonClicked sendes til SearchBar, og kalles når det trykkes "search" der.
 * Rendrer SearchBar (inputfelter + button) og SearchResult (overskrift + ResultTableAccordion)
 * */
class SearchPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchInput: null, // om det ikke er søkt etter noe skal input være null
      orderDir: null,
      titleType: null,
    };
    this.searchButtonClicked = this.searchButtonClicked.bind(this);
  }

  render() {
    return (
      <div className={"search-page"}>
        <SearchBar searchButtonClicked={this.searchButtonClicked} />
        <SearchResult
          searchInput={this.state.searchInput}
          titleType={this.state.titleType}
          orderDir={this.state.orderDir}
          key={
            ((((this.state.searchInput as string) +
              this.state.titleType) as string) + this.state.orderDir) as string
          }
        />{" "}
        {/* Dersom key blir endret vil det opprettes en ny instans av SearchResult. SearchResult kjører search(searchInput)-funksjonen i konstruktøren sin. Slik sikrer vi at det kun søkes om skjemaet er sendt inn (og endret)*/}
        <SearchNavigation />
      </div>
    );
  }

  // Funksjon som kalles i SearchBar. Der sender den argumenter fra inputs "opp hit" og setter state deretter
  searchButtonClicked(input: string, titleType: string, orderDir: string) {
    this.setState({ searchInput: input });
    this.setState({ orderDir: orderDir });
    this.setState({ titleType: titleType });
  }
}

export default SearchPage;
