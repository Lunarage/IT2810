import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { Movie } from "../types/DatabaseTypes";
import LikeButton from "./LikeButton";
import HttpClient from "../modules/HttpClient";
import { useSelector } from "react-redux";
import { AppState } from "../reducers/Reducer";


interface State {
    movies: Movie[];
}

const LikedMoviesTable = () => {
    // Setting initial state of movies
    const [state, setState] = useState<State>({
        movies: [],
    });

    // Getting username from redux
    const username = useSelector((state: AppState) => state.userName);

    // Getting the movies liked by the user from the database.
    // useEffect runs additional code after react has updated the DOM
    useEffect(() => {
        if (username) {
            // Asking database
            const result = HttpClient.getLikedMovies(username);

            // Waiting for result, then updating state.movies
            result.then((response) => setState({ movies: response }));
        }
    }, [username]);


    // Mapping movietitles and like-statuses to the table.
    const movieRows = () => {
        if (state.movies.length === 0) {
            return (
                <Table.Row key={"no_movies_row"}>
                    <Table.Cell key={"no_movies_cell"} colSpan={2}>
                        No liked movies
                    </Table.Cell>
                </Table.Row>
            );
        } else {
            return state.movies.map((n) => {
                return (
                    <Table.Row key={`${n.tconst}_row`}>
                        <Table.Cell key={`${n.tconst}_movie`}>
                            {n.primary_title}
                        </Table.Cell>
                        <Table.Cell key={`${n.tconst}_liked`}>
                            <LikeButton
                                movieID={n.tconst}
                            />
                        </Table.Cell>
                    </Table.Row>
                );
            });
        }
    };

    // Returning a table with rows from movieRows displaying the liked movies
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Movie</Table.HeaderCell>
                    <Table.HeaderCell>Liked</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {movieRows() /* getting movie rows */}
            </Table.Body>
        </Table>
    );


};

export default LikedMoviesTable;
