import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HttpClient from "../modules/HttpClient";
import { setStoreSearchState } from "../reducers/Actions";
import { AppState } from "../reducers/Reducer";
import { Movie } from "../types/DatabaseTypes";
import SearchBar from "./SearchBar";
import SearchNavigation from "./SearchNavigation";
import SearchResult from "./SearchResult";

/*
 * searchInput søkestreng for tittel til film
 * orderDir om resultatet skal sorteres stigende eller synkende
 * titleType hvilken type filmen har (Movie, TV Episode etc.)
 */
interface InputState {
    searchInput: string;
    orderDir: "ASC" | "DESC";
    titleType: string;
}

/*
 * activePage - Hvilen side man er på
 * totalPages - Hvor mange sider det er totalt
 *   (Utvides dynamisk)
 *
 */
interface PageState {
    activePage: number;
    totalPages: number;
    disabled: boolean;
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
    // Set up redux dispatch
    const dispatch = useDispatch();

    // Get initial search state from redux
    const searchStateStore = useSelector(
        (state: AppState) => state.searchState
    );

    // Get username from Redux
    const username = useSelector((state: AppState) => state.userName);

    // Initialize states
    const [inputState, setInputState] = useState<InputState>({
        searchInput: searchStateStore.inputSearch,
        orderDir: searchStateStore.inputOrderDir,
        titleType: searchStateStore.inputTitleType,
    });

    const [pageState, setPageState] = useState<PageState>({
        activePage: searchStateStore.pageActivePage,
        totalPages: searchStateStore.pageTotalPages,
        disabled: searchStateStore.pageDisabled,
    });

    const [searchState, setSearchState] = useState<SearchState>({
        searchStatus: searchStateStore.searchStatus,
        errorMessage: searchStateStore.searchErrorMessage,
        movies: searchStateStore.searchMovies,
    });

    // Funksjon som kalles i SearchBar. Der sender den tekststrengen i inputfeltet, sorteringsrekkefølge og titleType "opp hit". State blir oppdatert tilsvarende, og et et søk blir utført.
    const searchButtonClicked = (
        input: string,
        titleType: string,
        orderDir: "ASC" | "DESC"
    ) => {
        setInputState({
            searchInput: input,
            orderDir: orderDir,
            titleType: titleType,
        });
        // Set sidetilstanden tilbake til start
        setPageState({
            activePage: 1,
            totalPages: 2,
            disabled: false,
        });
        search(input, titleType, orderDir, 1);
    };

    // This function is called by the component SearchNavigation on interaction whith the pagination bar.
    const pageChange = (page: number) => {
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
        orderDir: "ASC" | "DESC",
        page: number
    ) => {
        // Set state to waiting
        setSearchState({
            searchStatus: "waiting",
            movies: searchState.movies,
            errorMessage: null,
        });
        let searchParameters;
        if (username) {
            console.log("username exists")
            searchParameters = {
                title: searchInput,
                titleType: titleType,
                orderBy: "start_year",
                orderDir: orderDir,
                username: username,
                page: page,
            };
        } else {
            console.log("no username exists")

            searchParameters = {
                title: searchInput,
                titleType: titleType,
                orderBy: "start_year",
                orderDir: orderDir,
                page: page,
            };
        }

        // Spør databasen
        const result = HttpClient.searchMovies(searchParameters);

        // Sett state hos SearchResult
        result
            .then((response) => {
                setSearchState({
                    movies: response,
                    searchStatus: "success",
                    errorMessage: null,
                });
                // Oppdater sidetilstanden
                // Hvis det bare en en side i søkeresultatet,
                // diable pagination navigaion
                const disablePage = response.length < 20 && page === 1;
                // Hvis søkeresultatet er har færre enn 20 rader,
                // tillat en side til i pagination navigation
                const totalPages = response.length >= 20 ? page + 1 : page;
                // Oppdater sidetilstand
                setPageState({
                    activePage: page,
                    totalPages: totalPages,
                    disabled: disablePage,
                });
                // Oppdater søketilstanden i redux
                dispatch(
                    setStoreSearchState({
                        inputSearch: searchInput,
                        inputOrderDir: orderDir,
                        inputTitleType: titleType,
                        pageActivePage: page,
                        pageTotalPages: totalPages,
                        pageDisabled: disablePage,
                        searchStatus: "success",
                        searchErrorMessage: null,
                        searchMovies: response,
                    })
                );
            })
            .catch((error) => {
                setSearchState({
                    searchStatus: "failure",
                    errorMessage: error.message,
                    movies: [],
                });
            });
    };

    let navigation;
    if (searchState.movies.length > 0) {
        navigation = (
            <SearchNavigation
                activePage={pageState.activePage}
                totalPages={pageState.totalPages}
                disabled={pageState.disabled}
                pageChange={pageChange}
            />
        );
    } else {
        navigation = "";
    }

    return (
        <div className={"search-page"}>
            <SearchBar searchButtonClicked={searchButtonClicked} />
            <SearchResult
                searchStatus={searchState.searchStatus}
                errorMessage={searchState.errorMessage}
                movies={searchState.movies}
                searchInput={inputState.searchInput}
            />
            {navigation}
        </div>
    );
};

export default SearchPage;
