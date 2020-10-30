import React, {Component} from "react";
import {Table} from "semantic-ui-react";
import {Movie} from "../types/DatabaseTypes";
import LikeButton from "./LikeButton";
import HttpClient from "../modules/HttpClient";

interface Props {
    username: string
}

interface State {
    movies: Movie[];
}

class LikedMoviesTable extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            movies: [],
        }

        // Binder this til funksjoner
        this.getMovies = this.getMovies.bind(this);
        this.movieRows = this.movieRows.bind(this);

        // Henter filmene ved opprettelsen av objektet
        this.getMovies(this.props.username);

    }


    // Mapper filmtitler og like-statuser til tabell. Knappene er deaktivert.
    movieRows() {
        if (this.state.movies.length === 0) {
            return (
                <Table.Row>
                    <Table.Cell colspan={2}>No liked movies</Table.Cell>
                </Table.Row>
            )
        } else {
            return this.state.movies.map(n => {
                return (<Table.Row>
                        <Table.Cell key={`n.tconst}_movie`}>{n.primary_title}</Table.Cell>
                        <Table.Cell key={`n.tconst}_liked`}>
                            <LikeButton liked={this.booleanUndefined(n.liked)} disabled={true}/>
                        </Table.Cell>
                    </Table.Row>
                )
            })
        }
    }


    // Rendrer tabell med rader fra movieRows som viser likte filmer
    render() {
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Movie</Table.HeaderCell>
                        <Table.HeaderCell>Liked</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.movieRows()} {/* henter filmradene */}
                </Table.Body>

            </Table>

        )
    }


    // Handles undefined booleans (Movie.liked). True if movie is liked by user, else false.
    booleanUndefined = (value: boolean | undefined) => {
        if (typeof value === "boolean") {
            return value;
        } else {
            return false;
        }
    }


    // Henter filmene brukeren har likt fra databasen.
    getMovies(username: string) {
        // Kommunikasjon med database
        // Set opp kopling mot databasen
        const baseURL = "http://it2810-22.idi.ntnu.no:3000";
        const client = new HttpClient(baseURL);

        // Spør databasen
        const result = client.getLikedMovies(username);

        // Venter på resultat, og oppdaterer this.state.
        //result.then((response) => this.state = {movies: response,})

        result.then((response) => this.setState({movies: response}));
    }


}


export default LikedMoviesTable;
