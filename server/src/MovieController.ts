/**
 * @file Builds and does queries on the database related to movies.
 */
import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { dbQuery } from "./DatabaseConnector";
import { Movie } from "./DatabaseTypes";

/**
 * Builds a search query based on the given request.
 *
 * @param {Request} request - Object that represents the HTTP request
 * @return {QueryConfig} A complete query with parameters
 */
const buildSearchQuery = (request: Request): QueryConfig => {
    // Parameters for the query is a list
    let parameters = [];
    // The parameters positions in the query are numbered
    // e.g
    //   SELECT * FROM foo WHERE bar = $1
    // to keep track of the parameter position
    // we introduce a running total
    let parameterCount = 0;

    // Base queries
    let query: string;
    if (request.query.username) {
        query =
            "WITH likes AS (" +
            " SELECT * FROM title_likes" +
            " WHERE username = $1)" +
            " SELECT title_basics.*" +
            ", CASE WHEN likes.username IS NOT NULL THEN true ELSE false END AS liked" +
            " FROM title_basics" +
            " LEFT JOIN likes ON title_basics.tconst = likes.tconst";
        parameterCount++;
        parameters.push(request.query.username);
    } else {
        query = "SELECT title_basics.*, false AS liked FROM title_basics";
    }

    // Filters
    // Only apply if filter any are specified
    if (
        request.query.title ||
        request.query.titleType ||
        request.query.minYear ||
        request.query.maxYear ||
        request.query.genre ||
        request.query.titleType ||
        request.query.orderBy ||
        request.query.orderDir
    ) {
        query += " WHERE";
        let delimiter = "";
        if (request.query.title) {
            parameterCount++;
            query += " (primary_title ILIKE $" + parameterCount;
            parameters.push("%" + request.query.title + "%");
            parameterCount++;
            query += " OR original_title ILIKE $" + parameterCount + ")";
            parameters.push("%" + request.query.title + "%");
            delimiter = " AND";
        }
        if (request.query.titleType) {
            parameterCount++;
            query += delimiter + " title_type = $" + parameterCount;
            parameters.push(request.query.titleType);
            delimiter = " AND";
        }
        if (request.query.minYear) {
            query += delimiter;
            parameterCount++;
            query += " start_year >= $" + parameterCount;
            parameters.push(request.query.minYear);
            delimiter = " AND";
        }
        if (request.query.maxYear) {
            query += delimiter;
            parameterCount++;
            query += " start_year <= $" + parameterCount;
            parameters.push(request.query.maxYear);
            delimiter = " AND";
        }
        if (request.query.genre) {
            query += delimiter;
            parameterCount++;
            query += " genres ILIKE $" + parameterCount;
            parameters.push("%" + request.query.genre + "%");
            delimiter = " AND";
        }
        if (request.query.titleType) {
            query += delimiter;
            parameterCount++;
            query += " title_type = $" + parameterCount;
            parameters.push(request.query.titleType);
            delimiter = " AND";
        }
    }

    // Sorting
    // Allowed columns for sorting
    const allowedColumns = ["title_type", "primary_title", "start_year"];
    if (
        // Check if ordering is requested and on an allowed column
        request.query.orderBy &&
        allowedColumns.includes(request.query.orderBy.toString())
    ) {
        query += " ORDER BY " + request.query.orderBy;
        // Apply order direction if requested
        // Order direction cannot be defined as a parameter
        // To defeat SQL injections,
        // orderDir is checked and explicitly applied
        if (request.query.orderDir == "ASC") {
            query += " ASC";
        } else if (request.query.orderDir == "DESC") {
            query += " DESC";
        }
    }

    // Limit
    // Number of results per page
    const responseLimit = 20;

    parameterCount++;
    query += " LIMIT $" + parameterCount;
    parameters.push(responseLimit);

    // Page
    if (Number(request.query.page)) {
        // A page is an offset equal to a multiple of the limit
        const offset = (Number(request.query.page) - 1) * responseLimit;
        parameterCount++;
        query += " OFFSET $" + parameterCount;
        parameters.push(offset);
    }

    // Return the query and parameters
    return { text: query, values: parameters } as QueryConfig;
};

class MovieController {
    /**
     * Get a specific movie.
     *
     * @param {Request} request - Object that represents the HTTP request
     * @param {Response} response - Object that represents the HTTP response
     */
    public getMovie(request: Request, response: Response): void {
        console.log(request.baseUrl + request.path);
        let query: QueryConfig;
        if (request.params.movieId && request.query.username) {
            query = {
                text:
                    "WITH likes AS (" +
                    " SELECT * FROM title_likes" +
                    " WHERE username = $1)" +
                    " SELECT title_basics.*" +
                    ", CASE WHEN likes.username IS NOT NULL THEN true ELSE false END AS liked" +
                    " FROM title_basics" +
                    " LEFT JOIN likes ON title_basics.tconst = likes.tconst" +
                    " WHERE title_basics.tconst = $2",
                values: [request.query.username, request.params.movieId],
            };
        } else if (request.params.movieId) {
            query = {
                text:
                    "SELECT title_basics.*, false as liked " +
                    "FROM title_basics " +
                    "WHERE tconst = $1",
                values: [request.params.movieId],
            };
        }
        console.log(query);
        dbQuery<Movie>(query)
            .then((result) => {
                console.log(result);
                response.status(200).send(result);
            })
            .catch((error) => {
                console.error(error);
                response.status(400).send(error);
            });
    }

    /**
     * Searches for movies.
     *
     * @param {Request} request - Object that represents the HTTP request
     * @param {Response} response - Object that represents the HTTP response
     */
    public searchMovies(request: Request, response: Response): void {
        let requestQuery = "";
        for (const [key, value] of Object.entries(request.query)) {
            requestQuery += "?" + key + "=" + value;
        }
        console.log(request.baseUrl + request.path + requestQuery);
        const query: QueryConfig = buildSearchQuery(request);
        console.log(query);
        dbQuery<Movie>(query)
            .then((result) => {
                console.log(result);
                response.status(200).send(result);
            })
            .catch((error) => {
                console.error(error);
                response.status(400).send(error);
            });
    }
}

export default MovieController;
