import { Pool } from "pg";

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
const maxClients = 3;

// Create a pool of connections
// If the pool is 'full' the clients will wait in a First-In-First-Out queue
// until a client becomes available
export default new Pool({
    host: host,
    user: user,
    database: database,
    port: port,
    password: password,
    max: maxClients,
});
