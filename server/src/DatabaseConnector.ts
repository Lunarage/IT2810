/**
 * @file Holds the database configuration and methods.
 */

import { Pool, PoolClient, QueryResult, QueryConfig } from "pg";

// Name of the role in the database
const user = "amazing";
// Address of host
const host = "localhost";
// Name of the database
const database = "imdb";
// The port PostgreSQL runs on
const port = 5432;
// Just some random password
const password = "8Y6oi68x";
// Max clients before the pool is 'full'
// Because the server has limited specs,
// this number is fairly low
const maxClients = 3;

// Create a pool of connections to the database
// If the pool is 'full' the clients will wait in a First-In-First-Out queue
// until a client becomes available
const pool = new Pool({
    host: host,
    user: user,
    database: database,
    port: port,
    password: password,
    max: maxClients,
});

/**
 * Does a query on the database and casts the result as a type.
 *
 * @async
 * @template T - The type of the expected result
 * @param {QueryConfig} query - The query and parameters
 * @return {Promise<T[]>} Promise of a result
 */
export const dbQuery = async <T>(query: QueryConfig): Promise<T[]> => {
    return new Promise<T[]>((resolve, reject) => {
        pool.query(query)
            .then((result) => {
                resolve(result.rows as T[]);
            })
            .catch((error) =>
                // setImmediate = Asynchronous, but ASAP
                setImmediate(() => {
                    reject(error);
                })
            );
    });
};

export default pool;
