import pool from "./dbconfig";

class MovieController {
    public async getMovie(request: any, response: any) {
        // Variable for holding the database connection
        let client = null;
        //Define queries
        const queryGetMovieNoUser = "SELECT * FROM title_basics WHERE tconst = $1";
        const queryGetMovieUser =
            "WITH likes AS (" +
            " SELECT * FROM title_likes" +
            " WHERE username = $1)" +
            " SELECT title_basics.*" +
            ", CASE WHEN likes.username IS NOT NULL THEN true ELSE false END AS liked" +
            " FROM title_basics" +
            " LEFT JOIN likes ON title_basics.tconst = likes.tconst" +
            " WHERE title_basics.tconst = $2";
        try {
            client = await pool.connect();

            if (request.params.movieId && request.query.username) {
                // With userId and movieId
                const { rows } = await client.query(queryGetMovieUser, [
                    request.query.username,
                    request.params.movieId,
                ]);
                response.status(200).send(rows);
            } else if (request.params.movieId) {
                // With movieId
                const { rows } = await client.query(queryGetMovieNoUser, [
                    request.params.movieId,
                ]);
                response.status(200).send(rows);
            }
        } catch (error) {
            console.error(error);
            response.status(400).send(error);
        } finally {
            if (client != null) {
                client.release();
            }
        }
    }

    public async searchMovies(request: any, response: any) {
        // Number of results per page
        const responseLimit = 20;
        // Variable for holding the database connection
        let client = null;
        // Allowed columns for sorting
        const allowedColumns = [
            "tconst",
            "title_type",
            "primary_title",
            "original_title",
            "is_adult",
            "start_year",
            "end_year",
            "runtime_minutes",
            "genres",
        ];

        //Build query
        let parameters = [];
        let parameterCount = 0;
        let query;
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
        if (
            request.query.orderBy &&
            allowedColumns.includes(request.query.orderBy)
        ) {
            query += " ORDER BY " + request.query.orderBy;
            if (request.query.orderDir == "ASC") {
                query += " ASC";
            } else if (request.query.orderDir == "DESC") {
                query += " DESC";
            }
        }
        parameterCount++;
        query += " LIMIT $" + parameterCount;
        parameters.push(responseLimit);
        if (Number(request.query.page)) {
            const offset = (Number(request.query.page) - 1) * responseLimit;
            parameterCount++;
            query += " OFFSET $" + parameterCount;
            parameters.push(offset);
        }
        try {
            client = await pool.connect();
            console.log(query);
            console.log(parameters);
            const { rows } = await client.query(query, parameters);
            console.log(rows);
            response.status(200).send(rows);
        } catch (error) {
            console.error(error);
            response.status(400).send(error);
        } finally {
            if (client != null) {
                client.release();
            }
        }
    }
}

export default MovieController;
