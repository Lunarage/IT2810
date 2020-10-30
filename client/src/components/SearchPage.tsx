import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import SearchNavigation from "./SearchNavigation";
import { RootStateOrAny, useSelector } from "react-redux";

interface State {
  searchInput: string | null;
  orderDir: string | null;
  titleType: string | null;
  page: number;
}

/* SearchPage har tilstanden (state) searchInput som mottar en streng fra SearchBar når input sendes inn der ("search").
 * SearchInput sendes som prop til SearchResult, og brukes der til å hente søkeresultat.
 * searchButtonClicked sendes til SearchBar, og kalles når det trykkes "search" der.
 * Rendrer SearchBar (inputfelt + button) og SearchResult (overskrift + ResultTableAccordion)
 * */
const SearchPage = () => {
  const [state, setState] = useState<State>({
    searchInput: null, // om det ikke er søkt etter noe skal input være null
    orderDir: null,
    titleType: null,
    page: 1,
  });

  const username = useSelector((state: RootStateOrAny) => state.loggedIn)
    .username;

  return (
    <div className={"search-page"}>
      <SearchBar searchButtonClicked={searchButtonClicked} />
      <SearchNavigation page={state.page} pageChange={pageChange} />
      <SearchResult
        searchInput={state.searchInput}
        titleType={state.titleType}
        orderDir={state.orderDir}
        page={state.page}
        username={username}
        key={
          ((((((state.searchInput as string) + state.titleType) as string) +
            state.orderDir) as string) + state.page) as string
        }
      />{" "}
      {/* Dersom key blir endret vil det opprettes en ny instans av SearchResult. SearchResult kjører search(searchInput)-funksjonen i konstruktøren sin. Slik sikrer vi at det kun søkes om skjemaet er sendt inn (og endret)*/}
    </div>
  );

  // Funksjon som kalles i SearchBar. Der sender den tekststrengen i inputfeltet, sorteringsrekkefølge og titleType "opp hit". State blir oppdatert tilsvarende.
  function searchButtonClicked(
    input: string,
    titleType: string,
    orderDir: string
  ) {
    setState({
      searchInput: input,
      orderDir: orderDir,
      titleType: titleType,
      page: 1,
    });
  }

  function pageChange(page: number) {
    setState({
      searchInput: state.searchInput,
      orderDir: state.orderDir,
      titleType: state.titleType,
      page: page,
    });
  }
};

export default SearchPage;
