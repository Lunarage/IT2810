/**
 * @file Builds and does queries on the database related to users.
 */
import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { dbQuery } from "./DatabaseConnector";
import { User } from "./DatabaseTypes";

class UserController {
    /**
     * Retrieves a user.
     *
     * @param {Request} request - Object that represents the HTTP request
     * @param {Response} response - Object that represents the HTTP response
     */
    public get(request: Request, response: Response): void {
        console.log(request.baseUrl + request.path);
        const query: QueryConfig = {
            text: "SELECT * FROM users WHERE username = $1",
            values: [request.params.userId],
        };
        console.log(query);
        dbQuery<User>(query)
            .then((result) => {
                console.log(result);
                if (result.length > 0) {
                    // 200 OK
                    response.status(200).send(result);
                } else {
                    // 404 Not Found
                    response.status(404).send(result);
                }
            })
            .catch((error) => {
                console.error(error);
                // 400 Bad request
                response.status(400).send(error);
            });
    }

    /**
     * Creates a user.
     *
     * @param {Request} request - Object that represents the HTTP request
     * @param {Response} response - Object that represents the HTTP response
     */
    public create(request: Request, response: Response): void {
        console.log(request.baseUrl + request.path);
        const query: QueryConfig = {
            text:
                "INSERT INTO users VALUES ($1) " +
                "ON CONFLICT ON CONSTRAINT users_pk " +
                "  DO NOTHING RETURNING username",
            values: [request.params.userId],
        };
        console.log(query);
        dbQuery<User>(query)
            .then((result) => {
                console.log(result);
                // 200 OK
                response.status(200).send(result);
            })
            .catch((error) => {
                console.error(error);
                // 400 Bad request
                response.status(400).send(error);
            });
    }

    /**
     * Deletes a user.
     *
     * @param {Request} request - Object that represents the HTTP request
     * @param {Response} response - Object that represents the HTTP response
     */
    public delete(request: Request, response: Response): void {
        console.log(request.baseUrl + request.path);
        const query: QueryConfig = {
            text: "DELETE FROM users WHERE username = $1 RETURNING username",
            values: [request.params.userId],
        };
        console.log(query);
        dbQuery<User>(query)
            .then((result) => {
                console.log(result);
                if (result.length > 0) {
                    // 200 OK
                    response.status(201).send(result);
                } else {
                    // 404 Not Found
                    response.status(404).send(result);
                }
            })
            .catch((error) => {
                console.error(error);
                // 400 Bad request
                response.status(400).send(error);
            });
    }
}

export default UserController;
