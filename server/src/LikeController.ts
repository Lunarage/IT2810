/**
 * @file Builds and does queries on the database related to likes.
 */
import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { dbQuery } from "./DatabaseConnector";
import { Like } from "./DatabaseTypes";

class LikeController {
    /**
     * Retrieves a list of all movies liked by a requested user.
     *
     * @param {Request} request - Object that represents the HTTP request
     * @param {Response} response - Object that represents the HTTP response
     */
    public getAll(request: Request, response: Response): void {
        console.log(request.baseUrl + request.path);
        const query: QueryConfig = {
            text:
                "SELECT title_basics.*, true AS liked " +
                "FROM title_likes " +
                "JOIN title_basics ON title_likes.tconst = title_basics.tconst " +
                "WHERE title_likes.username = $1",
            values: [request.params.userId],
        };
        console.log(query);
        dbQuery<Like>(query)
            .then((result) => {
                console.log(result);
                // 200 OK
                response.status(200).send(result);
            })
            .catch((error) => {
                console.error(error);
                // 400 Bad Request
                response.status(400).send(error);
            });
    }

    /**
     * Retrieves liked status of a movie for a user.
     *
     * @param {Request} request - Object that represents the HTTP request
     * @param {Response} response - Object that represents the HTTP response
     */
    public get(request: Request, response: Response): void {
        console.log(request.baseUrl + request.path);
        const query: QueryConfig = {
            text:
                "SELECT CASE WHEN EXISTS " +
                "  (SELECT true FROM title_likes WHERE username = $1 AND tconst = $2) " +
                "THEN true else false END as liked",
            values: [request.params.userId, request.params.movieId],
        };
        console.log(query);
        dbQuery<Like>(query)
            .then((result) => {
                console.log(result);
                // 200 OK
                response.status(200).send(result);
            })
            .catch((error) => {
                console.error(error);
                // 400 Bad Request
                response.status(400).send(error);
            });
    }

    /**
     * Like a movie for a user.
     *
     * @param {Request} request - Object that represents the HTTP request
     * @param {Response} response - Object that represents the HTTP response
     */
    public like(request: Request, response: Response): void {
        console.log(request.baseUrl + request.path);
        const query: QueryConfig = {
            text:
                "INSERT INTO title_likes " +
                "VALUES ($1, $2) " +
                "ON CONFLICT ON CONSTRAINT title_likes_pk " +
                "  DO NOTHING RETURNING true AS liked",
            values: [request.params.userId, request.params.movieId],
        };
        console.log(query);
        dbQuery<Like>(query)
            .then((result) => {
                console.log(result);
                // 200 OK
                response.status(200).send(result);
            })
            .catch((error) => {
                console.error(error);
                // 400 Bad Request
                response.status(400).send(error);
            });
    }

    /**
     * Unlike a movie for a user.
     *
     * @param {Request} request - Object that represents the HTTP request
     * @param {Response} response - Object that represents the HTTP response
     */
    public unlike(request: Request, response: Response): void {
        console.log(request.baseUrl + request.path);
        const query: QueryConfig = {
            text:
                "DELETE FROM title_likes WHERE username = $1 AND tconst = $2 RETURNING false AS liked",
            values: [request.params.userId, request.params.movieId],
        };
        console.log(query);
        dbQuery<Like>(query)
            .then((result) => {
                console.log(result);
                // 200 OK
                response.status(200).send(result);
            })
            .catch((error) => {
                console.error(error);
                // 400 Bad Request
                response.status(400).send(error);
            });
    }
}

export default LikeController;
