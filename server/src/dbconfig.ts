import { Pool } from "pg";

export default new Pool({
    max: 20,
    connectionString: "postgres://amazing:8Y6oi68x@localhost:5432/imdb",
    idleTimeoutMillis: 30000,
});
