/**
 * @file Specifies the app and includes methods for starting and stopping the server.
 */

import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import { Server } from "http";
import { Pool, PoolClient } from "pg";
import pool from "./DatabaseConnector";
import likeRouter from "./LikeRouter";
import movieRouter from "./MovieRouter";
import userRouter from "./UserRouter";

// Debug setting
export let DEBUG = false;

// This is our app
export const app: Express = express();

// Configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "1mb" }));
// Cross-origin resource sharing
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

// Configure routes
// What method to use for what path
app.use("/movie/", movieRouter);
app.use("/user/", userRouter);
app.use("/user/:userId/likedMovies/", likeRouter);
// Send welcome message when root path is requested
app.use("/", (request, response) => {
    response.status(200).send("Welcome!");
});

/**
 * Attempts to start the server, listening on a given port.
 *
 * @async
 * @param {number} port - The port the server listens to
 * @return {Promise<Server>} Promise of a server
 */
export const startServer = async (
    port: number,
    verbose?: boolean
): Promise<Server> => {
    // Let server log to console
    if (verbose) {
        DEBUG = true;
    }
    // Check connection to database
    await pool
        .connect() // type: Promise<PoolClient>
        .then((client: PoolClient) => {
            console.log("Connected to database");
            client.release();
        })
        .catch((err) => {
            console.log("Could not connect to the database");
            console.log(err.message);
        });
    // Start server by creating a promise
    return new Promise<Server>((resolve, reject) => {
        // The server is spawned by the app
        // when the method listen(port) is called
        // (the server listens for requests on the given port)
        // The promise resolves with an instance of a Server
        // or rejects with an error
        const server = app
            .listen(port, () => {
                resolve(server);
            })
            .on("error", (error: Object) => reject(error));
    });
};

/**
 * Attempts to stop the server and database pool.
 *
 * @async
 * @param {Server} server - The server object to stop
 * @param {Pool} pool - The database pool to stop
 */
export const stopServer = async (server: Server, pool: Pool) => {
    // Wait for the database pool to end
    await pool.end().catch((error) => console.error(error.message));
    // Wait for the server to close
    await server.close();
};
