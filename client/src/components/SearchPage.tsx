import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import SearchNavigation from "./SearchNavigation";
import { RootStateOrAny, useSelector } from "react-redux";
import { Movie } from "../types/DatabaseTypes";
import HttpClient from "../modules/HttpClient";

/*
 * searchInput søkestreng for tittel til film
 * orderDir om resultatet skal sorteres stigende eller synkende
 * titleType hvilken type filmen har (Movie, TV Episode etc.)
 * page er hivlken side av søket man ønsker
 */
interface InputState {
    searchInput: string;
    orderDir: string;
    titleType: string;
    page: number;
}

/*
 * searchStatus beskriver tilstanden til søket
 * errorMessage inneholder feilmelding fra HttpClient
 * movies inneholder resultatene av søk
 * searchInput er strengen som ble søkt på
 */
interface SearchState {
    searchStatus: "none" | "waiting" | "success" | "failure";
    errorMessage: null | string;
    movies: Movie[];
}

/*
 * SearchPage har tilstandene (states):
 *  inputState som inneholder søkekriteriene som mottas fra SearchBar når input sendes inn der ("search").
 *  searchState som inneholder tilstanden til søket og et eventuelt resultat.
 * searchButtonClicked sendes til SearchBar, og kalles når det trykkes "search" der.
 * pageChange sendes til SearchNavigation, og kalles når man interagerer med den.
 * Rendrer:
 *  SearchBar (inputfelt + button),
 *  SearchResult (overskrift + ResultTableAccordion),
 *  SearchNavigation (sidevalg)
 */
const SearchPage = () => {
    // Initialize states
    const [inputState, setInputState] = useState<InputState>({
        searchInput: "",
        orderDir: "",
        titleType: "",
        page: 1,
    });

    const [searchState, setSearchState] = useState<SearchState>({
        searchStatus: "none",
        errorMessage: null,
        movies: [],
    });

    // Get username from Redux
    const username = useSelector((state: RootStateOrAny) => state.loggedIn)
        .username;

    // Funksjon som kalles i SearchBar. Der sender den tekststrengen i inputfeltet, sorteringsrekkefølge og titleType "opp hit". State blir oppdatert tilsvarende, og et et søk blir utført.
    const searchButtonClicked = (
        input: string,
        titleType: string,
        orderDir: string
    ) => {
        setInputState({
            searchInput: input,
            orderDir: orderDir,
            titleType: titleType,
            page: 1,
        });
        search(input, titleType, orderDir, 1);
    };

    // This function is called by the component SearchNavigation on interaction whith the pagination bar.
    const pageChange = (page: number) => {
        setInputState({
            searchInput: inputState.searchInput,
            orderDir: inputState.orderDir,
            titleType: inputState.titleType,
            page: page,
        });
        search(
            inputState.searchInput,
            inputState.titleType,
            inputState.orderDir,
            page
        );
    };

    /*
     * Search() tek inn argument for kva det skal søkast etter.
     * Spør databasen.
     * Basert på resultat vert state searchState sett.
     * Kalles av searchButtonClicked og pageChange.
     */
    const search = (
        searchInput: string,
        titleType: string,
        orderDir: string,
        page: number
    ) => {
        // Set state to waiting
        setSearchState({
            searchStatus: "waiting",
            movies: [],
            errorMessage: null,
        });

        // Spør databasen
        const result = HttpClient.searchMovies({
            title: searchInput,
            titleType: titleType,
            orderBy: "start_year",
            orderDir: orderDir,
            username: username,
            page: page,
        });

        // Sett state hos SearchResult
        result
            .then((response) => {
                setSearchState({
                    movies: response,
                    searchStatus: "success",
                    errorMessage: null,
                });
            })
            .catch((error) => {
                setSearchState({
                    searchStatus: "failure",
                    errorMessage: error.message,
                    movies: [],
                });
            });
    };

    return (
        <div className={"search-page"}>
            <SearchBar searchButtonClicked={searchButtonClicked} />
            <SearchResult
                searchStatus={searchState.searchStatus}
                errorMessage={searchState.errorMessage}
                movies={searchState.movies}
                searchInput={inputState.searchInput}
            />
            <SearchNavigation page={inputState.page} pageChange={pageChange} />
            {/* Dersom key blir endret vil det opprettes en ny instans av SearchResult. SearchResult kjører search(searchInput)-funksjonen i konstruktøren sin. Slik sikrer vi at det kun søkes om skjemaet er sendt inn (og endret)*/}
        </div>
    );
};

export default SearchPage;
